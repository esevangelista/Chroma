import nodemailer from 'nodemailer';
import path from 'path';

require('dotenv').load();

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
});
export function sendEmail(options) {
  const logoPath = path.join(__dirname, '../utils/email/template/logo.png');
  const defaults = {
    from: '"Postmaster Chroma" <postmaster.chroma@gmail.com>',
    replyTo: 'postmaster.chroma@gmail.com',
    to: 'esevangelista1@up.edu.ph',
    subject: 'test subject',
    text: 'test message',
    html: '<b>test html message</b>',
    attachments: [{
      filename: 'logo.png',
      path: logoPath,
      cid: 'logo_cid',
    }],
  };

  const mailOpts = Object.assign({}, defaults, options);
  return new Promise(((resolve, reject) => {
    transporter
      .sendMail(mailOpts)
      .then((info) => {
        // eslint-disable-next-line no-console
        console.log(info);
        return resolve(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        return reject(false); // eslint-disable-line
      });
  }));
}
