import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TopBar.css';

const TopBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profiles/?search=${query}`)
      .then(res => {
        if (res.data.length > 0) {
          const profile = res.data[0];
          navigate(`/profile/${profile.id}`);
        } else {
          alert('검색 결과가 없습니다.');
        }
      })
      .catch(err => {
        console.error('검색 오류:', err);
        alert('검색 중 오류가 발생했습니다.');
      });
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <Link to="/" className="logo">🏫 SonSa Wiki</Link>
      </div>

      <div className="topbar-center">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          className="search-bar"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>🔍</button>
      </div>

      <div className="topbar-right">
        <nav className="topbar-nav">
          <Link to="/profile/new">새로 생성</Link>
          <Link to="/login">로그인</Link>
        </nav>
      </div>
    </header>
  );
};

export default TopBar;
