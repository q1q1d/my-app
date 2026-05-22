import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { UserProfile } from '../types/index';
import { generateQRData, downloadQRCode } from '../utils/qrcode';
import './QRCodeShare.css';

interface QRCodeShareProps {
  profile: UserProfile | null;
}

export const QRCodeShare: React.FC<QRCodeShareProps> = ({ profile }) => {
  const qrRef = React.useRef<HTMLDivElement>(null);

  if (!profile) {
    return (
      <div className="qrcode-share empty">
        <p>QR 코드를 생성하려면 먼저 개인정보를 입력해주세요.</p>
      </div>
    );
  }

  const qrData = generateQRData(profile);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      downloadQRCode(canvas, `${profile.name}_민증QR.png`);
    }
  };

  return (
    <div className="qrcode-share">
      <h2>QR 코드 공유</h2>

      <div className="qrcode-warning">
        <p>⚠️ 주의</p>
        <p>이 QR 코드는 본인인증 목적으로만 사용하세요.</p>
        <p>타인과 공유하지 마세요.</p>
      </div>

      <div className="qrcode-container" ref={qrRef}>
        <QRCode value={qrData} size={200} level="H" includeMargin={true} />
      </div>

      <div className="qrcode-info">
        <p>
          <strong>성명:</strong> {profile.name}
        </p>
        <p>
          <strong>주민번호:</strong> {profile.residentNumber.substring(0, 6)}∙∙∙∙∙∙
        </p>
        <p>
          <strong>생성 시간:</strong> {new Date().toLocaleString()}
        </p>
      </div>

      <div className="qrcode-buttons">
        <button onClick={handleDownload} className="btn-download">
          QR 코드 다운로드
        </button>
      </div>
    </div>
  );
};