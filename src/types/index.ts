// 주민등록증 정보 타입
export interface ResidentID {
  id: string;
  name: string;
  birthDate: string; // YYYYMMDD
  residentNumber: string; // 주민번호 (앞자리-뒷자리)
  address: string;
  issuedDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  gender: 'M' | 'F';
  photoUrl: string;
  issueNumber: string; // 발급번호
}

export interface UserProfile extends ResidentID {
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  authMethod: 'pattern' | 'password' | 'none';
  attempts: number;
}