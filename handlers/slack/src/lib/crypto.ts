import crypto from "node:crypto";
import { config } from "./config.js";

const IV_LENGTH = 12;

export function encrypt(plaintext: string) {
  const key = crypto
    .createHash("sha256")
    .update(config.encryptionKey)
    .digest("base64")
    .slice(0, 32);
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${encrypted.toString("hex")}:${tag.toString("hex")}`;
}

export function decrypt(plaintext: string) {
  const parts = plaintext.split(":");
  const iv = Buffer.from(parts[0], "hex");
  const encryptedText = Buffer.from(parts[1], "hex");
  const tag = Buffer.from(parts[2], "hex");
  const key = crypto
    .createHash("sha256")
    .update(config.encryptionKey)
    .digest("base64")
    .slice(0, 32);

  const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(key), iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(encryptedText), decipher.final()]).toString();
}
