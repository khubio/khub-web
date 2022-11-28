/* eslint-disable max-len */
import emailJs from '@emailjs/browser';

const MAILJS_SERVICE_ID = process.env.REACT_APP_MAILJS_SERVICE_ID;
const MAILJS_PUBLIC_KEY = process.env.REACT_APP_MAILJS_PUBLIC_KEY;
const VERIFY_EMAIL_TEMPLATE_ID = 'khub.verify';
export const sendVerifyEmail = async (user) => {
  const templateParams = {
    to_name: `${user.firstName} ${user.lastName}`,
    to_email: user.email,
    message: 'Verify your email',
  };
  await emailJs.send(MAILJS_SERVICE_ID, VERIFY_EMAIL_TEMPLATE_ID, templateParams, MAILJS_PUBLIC_KEY);
  console.log('Email sent');
};
