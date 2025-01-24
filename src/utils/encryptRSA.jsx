import crypto from 'crypto';
import { Buffer } from 'buffer';


// Hibrid Encrypt Data with PUBLIC KEY
function encryptData(data, publicKey) {
    
    const bufferData = Buffer.from(JSON.stringify(data), 'utf8');

    const aesKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encryptedData = cipher.update(bufferData);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    const encryptedKey = crypto.publicEncrypt(publicKey, aesKey);
    
    return {
        encryptedData: encryptedData.toString('base64'),
        encryptedKey: encryptedKey.toString('base64'),
        iv: iv.toString('base64'),
    };
}

// Decrypt Data with PRIVATE KEY
function decryptData(encryptedData, privateKey) {
        
    const bufferData = Buffer.from(encryptedData, 'base64');
    const decryptedData = crypto.privateDecrypt(privateKey, bufferData);
    
    return JSON.parse(decryptedData.toString('utf8'));
}

export {encryptData,decryptData}