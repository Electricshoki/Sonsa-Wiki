import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileMap, setProfileMap] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/${id}/`)
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('불러오기 실패:', err);
        setLoading(false);
      });

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/`)
      .then(res => {
        const map = {};
        res.data.forEach(p => {
          map[p.id] = p;
        });
        setProfileMap(map);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!profile) return <div>존재하지 않는 인물입니다.</div>;

  const sections = profile.sections || [];
  const footnotes = profile.footnotes || {};
  const localNotes = {};

  const renderWithInlineFootnotes = (text) => {
    if (typeof text !== 'string') return text;

    const regex = /<([^<>\[\]]+)>|\[(\d+)\](.*)?/g;
    const result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        const fullId = match[1];
        const profileEntry = profileMap[fullId];
        result.push(
          <a
            key={`name-${fullId}`}
            href={`/profile/${encodeURIComponent(fullId)}`}
            style={{ color: '#007bff', textDecoration: 'none', fontWeight: 500 }}
          >
            {profileEntry?.name || `<${fullId}>`}
          </a>
        );
      } else if (match[2]) {
        const noteNumber = match[2];
        const noteText = match[3]?.trim();
        if (noteText && !localNotes[noteNumber]) {
          localNotes[noteNumber] = noteText;
        }
        result.push(
          <sup key={`f-${noteNumber}`}>
            <a href={`#local-footnote-${noteNumber}`}>[{noteNumber}]</a>
          </sup>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex));
    }

    return result;
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>{profile.name}</h1>
        <button onClick={() => navigate(`/profile/${id}/edit`)}>✏️ 수정</button>
      </div>

      <div className="toc-box">
        <strong>📌 목차</strong>
        <ul>
          {sections.map((section, idx) => (
            <li key={idx}>
              <a href={`#section-${idx}`} className="toc-number">{idx + 1}.</a> {section.title}
            </li>
          ))}
        </ul>
      </div>

      {sections.map((section, idx) => (
        <section key={idx} id={`section-${idx}`}>
          <h2>{idx + 1}. {section.title}</h2>
          {section.type === 'key-value' && (
            <ul>
              {section.content && Object.entries(section.content).map(([key, val]) => (
                <li key={key}>{renderWithInlineFootnotes(val)}</li>
              ))}
            </ul>
          )}
          {section.type === 'list' && (
            <ul>
              {section.content && section.content.map((item, i) => (
                <li key={i}>{renderWithInlineFootnotes(item)}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {Object.keys(localNotes).length > 0 && (
        <section id="local-footnotes">
          <h3>주석</h3>
          <hr style={{ marginBottom: "0.5rem", borderBottom: "1px solid #ccc" }} />
          <ul>
            {Object.entries(localNotes).map(([num, text]) => (
              <li key={num} id={`local-footnote-${num}`}>[{num}] {text}</li>
            ))}
          </ul>
        </section>
      )}

      {footnotes && Object.keys(footnotes).length > 0 && (
        <section id="footnotes">
          <h3>기본 주석</h3>
          <ul>
            {Object.entries(footnotes).map(([num, text]) => (
              <li key={num} id={`footnote-${num}`}>[{num}] {text}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ProfilePage;
