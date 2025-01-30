import crypto from 'crypto';
import { Buffer } from 'buffer';

// Encrypt Data with PUBLIC KEY
function encryptE2EE(message, publicKey) {
    
    const bufferMessage = Buffer.from(message, 'utf8');
    return crypto.publicEncrypt(publicKey, bufferMessage).toString('base64');
}

// Decrypt Data with PRIVATE KEY
function decryptE2EE(encryptedData, privateKey) {
        
    const bufferData = Buffer.from(encryptedData, 'base64');
    return crypto.privateDecrypt(privateKey, bufferData).toString('utf8');
}

export { encryptE2EE, decryptE2EE }