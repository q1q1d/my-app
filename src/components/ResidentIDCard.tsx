import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/index';
import { StorageUtils } from '../utils/storage';
import './ResidentIDCard.css';

interface ResidentIDCardProps {
  profile: UserProfile | null;
  isFlipped: boolean;
  onFlip: () => void;
}

export const ResidentIDCard: React.FC<ResidentIDCardProps> = ({ profile, isFlipped, onFlip }) => {
  if (!profile) {
    return (
      <div className="card-container empty">
        <div className="card-placeholder">
          <p>민증 정보가 없습니다</p>
          <p>설정에서 개인정보를 입력해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-container" onClick={onFlip}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        {/* 앞면 */}
        <div className="card-front">
          <div className="card-header">
            <div className="seal">대한민국</div>
            <h1>주민등록증</h1>
          </div>

          <div className="card-content">
            <div className="photo-section">
              {profile.photoUrl ? (
                <img src={profile.photoUrl} alt="증명사진" className="resident-photo" />
              ) : (
                <div className="no-photo">사진 없음</div>
              )}
            </div>

            <div className="info-section">
              <div className="info-row">
                <span className="label">성명</span>
                <span className="value">{profile.name}</span>
              </div>

              <div className="info-row">
                <span className="label">주민번호</span>
                <span className="value masked">{profile.residentNumber.substring(0, 6)}∙∙∙∙∙∙</span>
              </div>

              <div className="info-row">
                <span className="label">주소</span>
                <span className="value address">{profile.address}</span>
              </div>

              <div className="info-row">
                <span className="label">발급일</span>
                <span className="value">{profile.issuedDate}</span>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <span className="issue-number">발급번호: {profile.issueNumber}</span>
          </div>
        </div>

        {/* 뒷면 */}
        <div className="card-back">
          <div className="back-header">
            <h2>주민등록증 (뒷면)</h2>
          </div>

          <div className="back-content">
            <div className="back-info-row">
              <span className="label">주민번호</span>
              <span className="value">{profile.residentNumber}</span>
            </div>

            <div className="back-info-row">
              <span className="label">성별</span>
              <span className="value">{profile.gender === 'M' ? '남' : '여'}</span>
            </div>

            <div className="back-info-row">
              <span className="label">생년월일</span>
              <span className="value">
                {profile.birthDate.substring(0, 4)}.{profile.birthDate.substring(4, 6)}.
                {profile.birthDate.substring(6, 8)}
              </span>
            </div>

            <div className="back-info-row">
              <span className="label">만료일</span>
              <span className="value">{profile.expiryDate}</span>
            </div>

            <div className="back-info-row">
              <span className="label">발급일</span>
              <span className="value">{profile.issuedDate}</span>
            </div>
          </div>

          <div className="back-footer">
            <p>* 이 화면을 캡처하거나 촬영하여 타인에게 전달하면 안 됩니다.</p>
            <p>* 본인인증을 위해서만 사용하시기 바랍니다.</p>
          </div>
        </div>
      </div>

      <div className="flip-hint">
        <p>카드를 클릭하여 앞뒷면 확인</p>
      </div>
    </div>
  );
};
