const { createDecipheriv } = require('crypto');
const { config } = require('dotenv');
config();

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = Buffer.from(process.env.API_KEY_SECRET, 'hex'); // 32-byte hex string

exports.decryptApiKey = (stored) => {
	const [ivHex, encryptedHex] = stored.split(':');
	const iv = Buffer.from(ivHex, 'hex');
	const encrypted = Buffer.from(encryptedHex, 'hex');
	const decipher = createDecipheriv(ALGORITHM, SECRET_KEY, iv);
	const decrypted = Buffer.concat([
		decipher.update(encrypted),
		decipher.final(),
	]);
	return decrypted.toString();
};
