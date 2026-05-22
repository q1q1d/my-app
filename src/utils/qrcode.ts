import { UserProfile } from '../types/index';

export const generateQRData = (profile: UserProfile): string => {
  // 민증 QR 코드 데이터 (정부24 형식 모사)
  const qrData = {
    type: 'RESIDENT_ID_MOBILE',
    version: '1.0',
    data: {
      name: profile.name,
      birthDate: profile.birthDate,
      residentNumber: profile.residentNumber,
      gender: profile.gender,
      issueNumber: profile.issueNumber,
      issuedDate: profile.issuedDate,
    },
    timestamp: new Date().getTime(),
  };

  return JSON.stringify(qrData);
};

export const downloadQRCode = (qrCodeElement: HTMLCanvasElement, fileName: string = 'resident-id-qr.png'): void => {
  const link = document.createElement('a');
  link.href = qrCodeElement.toDataURL('image/png');
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};