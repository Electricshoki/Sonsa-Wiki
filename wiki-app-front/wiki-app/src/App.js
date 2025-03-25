import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import Sidebar from './components/Sidebar';
import AddProfilePage from './pages/AddProfilePage';

const App = () => {
  return (
    <Router>
      <TopBar />
      <Sidebar/> 
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/profile/:id/edit" element={<EditProfilePage />} />
          <Route path="/profile/new" element={<AddProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
