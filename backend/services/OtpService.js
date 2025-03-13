const otpStorage = new Map(); // Store OTPs in-memory

export const generateOTP = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 10 * 60 * 1000;

  otpStorage.set(email, { otp, expiresAt });
  return otp;
};

export const verifyOTP = (email, enteredOTP) => {
  const record = otpStorage.get(email);
  if (!record || Date.now() > record.expiresAt) {
    otpStorage.delete(email);
    return false;
  }
  
  if (record.otp !== parseInt(enteredOTP)) return false;

  otpStorage.delete(email);
  return true;
};
