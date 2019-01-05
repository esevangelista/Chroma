import nodemailer from 'nodemailer';

require('dotenv').load();

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASS,
  },
});
export function sendEmail(options) {
  const defaults = {
    from: '"Postmaster Chroma" <postmaster.chroma@gmail.com>',
    replyTo: 'postmaster.chroma@gmail.com',
    to: 'esevangelista1@up.edu.ph',
    subject: 'test subject',
    text: 'test message',
    html: '<b>test html message</b>',
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
