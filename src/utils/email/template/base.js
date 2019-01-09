const header = `
<html>
  <head>
  </head>
  <body style="width: 100%; margin: 0; padding: 20px 30px 30px; background: #f5f4f2; float: left; color: #4a4a4a;">
    <table cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#f5f4f2" style="width: 100%; max-width: 810px; background: #f5f4f2;">
      <tr>
        <td align="center" style="padding: 20px;">
          <img src="cid:logo_cid" style="width: auto; height: auto;" alt="CHROMA" />
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="color: #4a4a4a; background: #ffffff; padding: 20px 30px; border: 1px solid #C2E5EB; border-top: 3px solid #CA0000; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom: none;">`;
const footer = `
      </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="background: #ffffff; padding: 0 30px; border: 1px solid #C2E5EB; border-top: none; border-bottom: none;">
          <p style="color: #4a4a4a; font-size: 12px; line-height: 16px; padding-bottom: 10px; margin-top: 0;">
            Best,<br>
            The CHROMA Team
          </p>
        </td>
      </tr>
      <tr>
        <td bgcolor="#B4B9BF" style="background: #B4B9BF; background: #CA0000;">
          <br/>
          <br/>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export function getHtml(content) {
  return `${header}${content}${footer}`;
}

export function getText(content) {
  return `${content}

Best,
The CHROMA Team
`;
}
