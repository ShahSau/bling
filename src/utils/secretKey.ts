export const generateSecret=(): string=> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567abcdefghijklmnopqrstuvwxyz189@#$'; // Base64 characters
    let secret = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      secret += characters[randomIndex];
    }
    return secret;
  }