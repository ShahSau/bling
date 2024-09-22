import crypto from 'crypto'; // crypto is a built-in module in Node.js

export const generate2FToken = (secret: string, timeStep: number = 30): string=> {
    const key = Buffer.from(secret);
    const epoch = Math.floor(Date.now() / 1000);
    let time = Math.floor(epoch / timeStep);
  
    const timeBuffer = Buffer.alloc(8);
    for (let i = 7; i >= 0; i--) {
      timeBuffer[i] = time & 0xff;
      time >>= 8;
    }
  
    const hmac = crypto.createHmac('sha1', key).update(timeBuffer).digest();
    const offset = hmac[hmac.length - 1] & 0xf;
  
    const code =
      ((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff);
  
    return (code % 1000000).toString().padStart(6, '0');
  }