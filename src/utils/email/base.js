const header = `
<html>
  <head>
  </head>
  <body style="margin: 0; padding: 20px 30px 30px; background: #F6FEFF; float: left; color: #4a4a4a;">
    <table cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FEFF" style="width: 100%; max-width: 810px; background: #F6FEFF;">
      <tr>
        <td align="center" style="padding: 20px;">
          <img src="cid:logo_cid" style="width: 204px; height: auto;" alt="AQWIRE" />
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="color: #4a4a4a; background: #ffffff; padding: 20px 30px; border: 1px solid #C2E5EB; border-top: 3px solid #36D1DC; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom: none;">`;
const footer = `
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" style="background: #ffffff; padding: 0 30px; border: 1px solid #C2E5EB; border-top: none; border-bottom: none;">
          <p style="color: #4a4a4a; font-size: 12px; line-height: 16px; padding-bottom: 10px; margin-top: 0;">
            Best,<br>
            The AQWIRE Team
          </p>
          <p style="padding: 20px; margin-bottom: 15px; background: #faf9ec; background: rgba(255, 231, 180, 0.2261); border-color: #e5e187; border: 1px solid rgba(255, 204, 0, 0.4312); color: #4a4a4a; font-size: 12px; line-height: 16px;">
            Please note that:<br>
            &bull; We'll never send out or announce any ETH address before the main round.<br>
            &bull; All email communications will be coming from <a href="mailto:crowdsale@aqwire.io" style="color: #4a4a4a; text-decoration: none;">crowdsale@aqwire.io</a> only.
          </p>
        </td>
      </tr>
      <tr>
        <td bgcolor="#ffffff" align="center" style="text-align: center; background: #ffffff; padding: 0 30px 25px; border: 1px solid #C2E5EB; border-top: none; border-bottom: none;">
          <p style="font-size: 14px; color: #4a4a4a; margin-top: 15px;">Get the latest updates about the project and the community.</p>
          <a href="https://t.me/AQWIRE" style="background: #51D8E1; border-radius: 25px; font-size: 12px; color: #fafafa; display: inline-block; padding: 10px 20px; text-decoration: none;">Join the AQWIRE Telegram channel</a>
        </td>
      </tr>
      <tr>
        <td bgcolor="#B4B9BF" style="background: #B4B9BF; background: rgba(108, 132, 144, 0.4641);">
          <p style="margin: 0; padding: 20px 30px 5px; font-size: 12px; color: #ffffff; text-transform: uppercase;"><strong>Who are we?</strong></p>
          <p style="margin: 0; padding: 5px 30px; font-size: 10px; color: #ffffff;"><strong>AQWIRE</strong> is a real estate platform specifically designed to handle cross-border transactions. With AQWIRE, property developers and brokers from all around the world can list their units and extend their reach to the global market. This gives property buyers access to a wide variety of units across the world, bypassing multiple levels of intermediaries and ultimately reducing the cost.</p>
          <p style="margin: 0; padding: 5px 30px 20px; font-size: 10px; color: #ffffff;">Know more about AQWIRE at <a href="https://aqwire.io/" style="color: #ffffff; text-decoration: underline;">www.aqwire.io</a> or download our whitepaper <a href="https://aqwire.io/#whitepaper" style="color: #ffffff; text-decoration: underline;">here</a>.
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
