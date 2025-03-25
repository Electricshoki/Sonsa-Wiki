import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditProfilePage.css';

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/${id}/`)
      .then(res => {
        const data = res.data;
        data.sections = data.sections || [];
        data.footnotes = data.footnotes || {};
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('불러오기 실패:', err);
        setLoading(false);
      });
  }, [id]);

  const handleSectionChange = (idx, field, value) => {
    const updated = [...profile.sections];
    updated[idx][field] = value;
    setProfile({ ...profile, sections: updated });
  };

  const handleContentChange = (idx, value) => {
    const updated = [...profile.sections];
    updated[idx].content = value.split('\n');
    setProfile({ ...profile, sections: updated });
  };

  const handleAddSection = () => {
    const updated = [
      ...profile.sections,
      { title: '', type: 'list', content: [] }
    ];
    setProfile({ ...profile, sections: updated });
  };

  const handleRemoveSection = (idx) => {
    const updated = [...profile.sections];
    updated.splice(idx, 1);
    setProfile({ ...profile, sections: updated });
  };

  const handleSave = () => {
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/${id}/`, profile)
      .then(() => {
        alert('저장 완료!');
        navigate(`/profile/${id}`);
      })
      .catch(err => {
        console.error('저장 실패:', err);
        alert('저장 중 오류 발생');
      });
  };

  if (loading) return <div>로딩 중...</div>;
  if (!profile) return <div>존재하지 않는 인물입니다.</div>;

  const sections = profile.sections || [];

  return (
    <div className="edit-profile-page">
      <h1>{profile.name} - 섹션 수정</h1>
      {sections.map((section, idx) => (
        <div key={idx} className="section-box">
          <input
            type="text"
            value={section.title}
            onChange={e => handleSectionChange(idx, 'title', e.target.value)}
            placeholder="섹션 제목 (예: 정보, 특징)"
          />

          <textarea
            value={Array.isArray(section.content) ? section.content.join('\n') : ''}
            onChange={e => handleContentChange(idx, e.target.value)}
            placeholder="항목을 줄마다 입력하세요"
          />

          <button className="delete-button" onClick={() => handleRemoveSection(idx)}>🗑 삭제</button>
        </div>
      ))}

      <button onClick={handleAddSection}>➕ 섹션 추가</button>
      <button onClick={handleSave}>💾 저장</button>
    </div>
  );
};

export default EditProfilePage;
