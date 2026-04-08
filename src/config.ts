import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "",
  SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "",
  SUPER_ADMIN_NAME: process.env.SUPER_ADMIN_NAME || "",
};