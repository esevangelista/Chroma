import { getHtml, getText } from '../base';

export function generateOptions(to, token, clientUrl) {
  const confirmEmailUrl = `${clientUrl}/confirm-email/${token}`;
  const emailLocalpart = to.split('@')[0];
  const content = `
    <p style="color: #4a4a4a;"><strong style="font-size: 16px;">Hi ${emailLocalpart},</strong></p>
    <p style="color: #4a4a4a;">We are very excited to have you as a part of the AQWIRE community!</p>
    <p style="color: #4a4a4a;">But first, please complete the account registration steps. Click on the link to confirm your email:</p>
    <p><a href="${confirmEmailUrl}">${confirmEmailUrl}</a></p>
    <p style="color: #4a4a4a;">Are you done with this step? Click <a href="${clientUrl}">here</a> to log in.</p>
`;
  const textContent = `Hi ${emailLocalpart},

We are very excited to have you as a part of the CHROMA community!
But first, please complete the account registration steps. Click on the link to confirm your email:

${confirmEmailUrl}

Are you done with this step? Click ${clientUrl} to log in.
`;
  return {
    to,
    subject: 'Welcome to the CHROMA! Please confirm your email.',
    html: getHtml(content),
    text: getText(textContent),
  };
}

