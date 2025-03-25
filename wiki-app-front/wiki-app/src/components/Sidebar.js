import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = () => {
  const [edits, setEdits] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/recent-edits/`)
      .then(res => {
        const seen = new Set();
        const unique = [];
        
        for (const item of res.data) {
          if (!seen.has(item.profile_id)) {
            seen.add(item.profile_id);
            unique.push(item);
          }
        }

        setEdits(unique);
      })
      .catch(err => console.error('최근 수정 내역 로딩 실패:', err));
  }, [location]);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const edited = new Date(timestamp);
    const diff = Math.floor((now - edited) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <aside className="sidebar">
      <h3>🕘 최근 수정</h3>
      <ul>
        {edits.map((edit, idx) => (
          <li key={idx}>
            <Link to={`/profile/${edit.profile_id}`}>{edit.name}</Link>
            <span className="editor-id">
              ({edit.editor_id}) · {timeAgo(edit.edited_at)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;