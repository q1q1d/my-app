export const ValidationUtils = {
  // 주민번호 검증
  validateResidentNumber: (residentNumber: string): boolean => {
    const cleaned = residentNumber.replace(/-/g, '');
    if (cleaned.length !== 13) return false;
    
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    let sum = 0;
    
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleaned[i]) * weights[i];
    }
    
    const checkDigit = (11 - (sum % 11)) % 10;
    return checkDigit === parseInt(cleaned[12]);
  },

  // 생년월일 검증
  validateBirthDate: (birthDate: string): boolean => {
    const pattern = /^\d{8}$/;
    if (!pattern.test(birthDate)) return false;
    
    const year = parseInt(birthDate.substring(0, 4));
    const month = parseInt(birthDate.substring(4, 6));
    const day = parseInt(birthDate.substring(6, 8));
    
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    const today = new Date();
    const birthDateObj = new Date(year, month - 1, day);
    
    return birthDateObj <= today;
  },

  // 이름 검증
  validateName: (name: string): boolean => {
    const pattern = /^[가-힣\s]{2,30}$/;
    return pattern.test(name.trim());
  },

  // 주소 검증
  validateAddress: (address: string): boolean => {
    return address.trim().length >= 5 && address.trim().length <= 100;
  },

  // 주민번호 마스킹
  maskResidentNumber: (residentNumber: string): string => {
    const [first, second] = residentNumber.split('-');
    if (!first || !second) return residentNumber;
    return `${first}-${second.substring(0, 1)}${'*'.repeat(6)}`;
  },

  // 날짜 포맷팅 (YYYY-MM-DD)
  formatDate: (dateString: string): string => {
    if (dateString.length === 8) {
      return `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
    }
    return dateString;
  },
};