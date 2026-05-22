import React, { useState, useEffect } from 'react';
import { UserProfile } from './types/index';
import { StorageUtils } from './utils/storage';
import { ResidentIDCard } from './components/ResidentIDCard';
import { ProfileForm } from './components/ProfileForm';
import { QRCodeShare } from './components/QRCodeShare';
import './App.css';

type TabType = 'view' | 'edit' | 'share';

function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('view');
  const [isFlipped, setIsFlipped] = useState(false);

  // 초기 로딩
  useEffect(() => {
    const savedProfile = StorageUtils.getProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  // 프로필 저장
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    StorageUtils.saveProfile(updatedProfile);
    setActiveTab('view');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <h1>🇰🇷 디지털 민증</h1>
          <p>정부24 민증 모바일 확인서비스</p>
        </div>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-btn ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          민증 조회
        </button>
        <button
          className={`nav-btn ${activeTab === 'edit' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit')}
        >
          정보 수정
        </button>
        <button
          className={`nav-btn ${activeTab === 'share' ? 'active' : ''}`}
          onClick={() => setActiveTab('share')}
        >
          QR 공유
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'view' && (
          <div className="tab-content">
            <ResidentIDCard profile={profile} isFlipped={isFlipped} onFlip={() => setIsFlipped(!isFlipped)} />
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="tab-content">
            <ProfileForm initialProfile={profile} onSave={handleSaveProfile} />
          </div>
        )}

        {activeTab === 'share' && (
          <div className="tab-content">
            <QRCodeShare profile={profile} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Digital ID System. 본인인증 목적으로만 사용하시기 바랍니다.</p>
      </footer>
    </div>
  );
}

export default App;