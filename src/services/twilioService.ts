import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);
export const sendSMS = (to: string, body: string) => {
client.messages
    .create({
      from: '+16504469123',
      to,
      body: body,
    })
    .then((message: { sid: string; }) => console.log("Message sent: ", message.sid));
  }


