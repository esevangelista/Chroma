import config from '../../../config';
import { getHtml, getText } from '../template/base';

export function generateOptions(to, resetToken) {
  const passwordResetUrl = `${config.urls.client}/password-reset/${resetToken}`;
  const emailLocalpart = to.split('@')[0];
  const content = `
    <p style="color: #4a4a4a;"><strong style="font-size: 16px;">Hello ${emailLocalpart},</strong></p>
    <p style="color: #4a4a4a;">We received a request to change your login details. Please click on the link to change your password:</p>
    <p><a href="${passwordResetUrl}">${passwordResetUrl}</a></p>
    <p style="color: #4a4a4a;">If you didn't do this, please contact us at <a href="mailto:postmaster.chroma@gmail.com">postmaster.chroma@gmail.com.</a></p>
`;
  const textContent = `Hello ${emailLocalpart},

We received a request to change your login details. Please click on the link to change your password:

${passwordResetUrl}

If you didn't do this, please contact us at postmaster.chroma@gmail.com.
`;
  return {
    to,
    subject: 'Password help has arrived!',
    html: getHtml(content),
    text: getText(textContent),
  };
}

