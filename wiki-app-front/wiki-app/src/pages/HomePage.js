import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>🎓 SonSa 위키에 오신 것을 환영합니다!</h1>

      <div className="home-section">
        <h2>📘 위키 소개</h2>
        <p>
          이 위키는 학생들의 개성, 정보, 유머를 담은 자유로운 공간입니다.
          누구나 참여하고, 읽고, 편집할 수 있습니다.
        </p>
      </div>

      <div className="home-section">
        <h2>🧾 작성 규칙</h2>
        <ul>
          <li>사실 기반 또는 공감 가능한 표현만 작성</li>
          <li>타인을 비방하거나 혐오 표현 금지</li>
          <li>논란 섹션은 반드시 주석 달기</li>
        </ul>
      </div>

      <div className="home-section">
        <h2>✍️ 작성 방법</h2>
        <p>
          로그인 후 상단 메뉴의 <strong>문서 작성</strong>을 클릭해 새 인물 정보를 등록하세요.<br />
          작성된 문서는 수정 페이지를 통해 자유롭게 편집할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
