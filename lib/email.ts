import 'server-only'

import {env} from "@/lib/env";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export const sendEmail = async (title: string, text: string) => {
  const transport = nodemailer.createTransport({
    // service: 'gmail',
    host: env.SERVER_HOST,
    port: 465,
    secure: true,
    auth: {
      user: env.SERVER_EMAIL,
      pass: env.SERVER_EMAIL_PASSWORD,
    },
  })

  const mailOptions: Mail.Options = {
    from: "info@mirobuvi.com.ua",
    to: env.MY_EMAIL,
    subject: title,
    text: text,
  }

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      })
    })
  try {
    await sendMailPromise();
    return {message: 'Email sent'}
  } catch (err) {
    return {error: err}
  }
}

