import React, { useState } from 'react';
import { UserProfile } from '../types/index';
import { ValidationUtils } from '../utils/validation';
import './ProfileForm.css';

interface ProfileFormProps {
  initialProfile: UserProfile | null;
  onSave: (profile: UserProfile) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(
    initialProfile || {
      id: Date.now().toString(),
      name: '',
      birthDate: '',
      residentNumber: '',
      address: '',
      issuedDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      gender: 'M',
      photoUrl: '',
      issueNumber: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'residentNumber') {
      // 주민번호 하이픈 자동 추가
      let formatted = value.replace(/[^0-9-]/g, '');
      if (formatted.length === 6 && !formatted.includes('-')) {
        formatted += '-';
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!ValidationUtils.validateName(formData.name)) {
      newErrors.name = '유효한 이름을 입력하세요 (2-30자, 한글)';
    }

    if (!ValidationUtils.validateBirthDate(formData.birthDate)) {
      newErrors.birthDate = '유효한 생년월일을 입력하세요 (YYYYMMDD)';
    }

    if (!ValidationUtils.validateResidentNumber(formData.residentNumber)) {
      newErrors.residentNumber = '유효한 주민번호를 입력하세요';
    }

    if (!ValidationUtils.validateAddress(formData.address)) {
      newErrors.address = '유효한 주소를 입력하세요 (5-100자)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedProfile = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      onSave(updatedProfile);
      alert('개인정보가 저장되었습니다.');
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h2>개인정보 입력</h2>

      {/* 사진 섹션 */}
      <div className="form-section">
        <h3>증명사진</h3>
        <div className="photo-upload-section">
          <div className="photo-preview">
            {formData.photoUrl ? (
              <img src={formData.photoUrl} alt="증명사진 미리보기" className="preview-image" />
            ) : (
              <div className="no-preview">사진 없음</div>
            )}
          </div>
          <div className="photo-buttons">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-upload">
              사진 업로드
            </button>
            {formData.photoUrl && (
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, photoUrl: '' }))}
                className="btn-remove"
              >
                사진 제거
              </button>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="form-section">
        <h3>기본정보</h3>

        <div className="form-group">
          <label htmlFor="name">이름 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="홍길동"
            maxLength={30}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="birthDate">생년월일 (YYYYMMDD) *</label>
          <input
            type="text"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            placeholder="20000101"
            maxLength={8}
          />
          {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">성별 *</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="M">남성</option>
            <option value="F">여성</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="residentNumber">주민번호 (XXXXXX-XXXXXXX) *</label>
          <input
            type="text"
            id="residentNumber"
            name="residentNumber"
            value={formData.residentNumber}
            onChange={handleInputChange}
            placeholder="000000-0000000"
            maxLength={14}
          />
          {errors.residentNumber && <span className="error-message">{errors.residentNumber}</span>}
        </div>
      </div>

      {/* 주소 정보 */}
      <div className="form-section">
        <h3>주소</h3>

        <div className="form-group">
          <label htmlFor="address">주소 *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="서울시 강남구 테헤란로 123"
            maxLength={100}
            rows={2}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
          <span className="char-count">{formData.address.length}/100</span>
        </div>
      </div>

      {/* 발급 정보 */}
      <div className="form-section">
        <h3>발급정보</h3>

        <div className="form-group">
          <label htmlFor="issueNumber">발급번호</label>
          <input
            type="text"
            id="issueNumber"
            name="issueNumber"
            value={formData.issueNumber}
            onChange={handleInputChange}
            placeholder="12345678"
            maxLength={20}
          />
        </div>

        <div className="form-group">
          <label htmlFor="issuedDate">발급일</label>
          <input
            type="date"
            id="issuedDate"
            name="issuedDate"
            value={formData.issuedDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expiryDate">만료일</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          저장하기
        </button>
      </div>
    </form>
  );
};
