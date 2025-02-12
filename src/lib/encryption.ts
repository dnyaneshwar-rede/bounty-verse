import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("Encryption secret key is not defined.");
}

// Use a type assertion to tell TypeScript that SECRET_KEY is a string
export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY as string).toString();
}

export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY as string);
  return bytes.toString(CryptoJS.enc.Utf8);
}