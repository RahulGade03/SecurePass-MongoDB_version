import crypto from 'crypto';

// Encrypt function
export const encrypt = (text) => {
  const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  const IV_LENGTH = 16;
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // Store IV along with the encrypted data
  return iv.toString('hex') + ':' + encrypted;
}

// Decrypt function
export const decrypt = (text) => {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = textParts[1];
  const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}