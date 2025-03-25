import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProfilePage.css';


const AddProfilePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) {
      alert('이름과 학과를 모두 입력하세요!');
      return;
    }

    setLoading(true);

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/`, {
      // 백엔드 모델/시리얼라이저에 맞춰 key:value 설정
      id: name + department,     // 예) id를 "김기연전자전기공학부" 형태로
      name: name,
      sections: [
        {
          title: '정보',
          type: 'key-value',
          content: [`학과: ${department}`],
        },
      ],
      footnotes: {}
    })
      .then(res => {
        alert('프로필이 생성되었습니다!');
        setLoading(false);
        // 예: 새로 만든 프로필 페이지로 이동
        navigate(`/profile/${res.data.id}`);
      })
      .catch(err => {
        alert('생성 실패: ' + err);
        setLoading(false);
      });
  };

  return (
    <div className="add-profile-container">
      <h1>프로필 추가</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름: </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label>학과: </label>
          <input
            type="text"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '처리 중...' : '추가'}
        </button>
      </form>
    </div>
  );
};

export default AddProfilePage;