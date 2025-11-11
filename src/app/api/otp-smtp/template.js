const generateEnglishTemplate = (otp, first_name) => {
  return `
       <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Don’t Miss Your Chance to Switch to GTC!</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#ffffff;font-family:'Poppins',sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Poppins', sans-serif; padding: 20px;">
      <tr>
        <td align="center">

          <table width="650" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0; border-radius:8px;padding:30px; padding-top: 20px; background-color: #182063;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/social/logo-new-golden.png" alt="GTC Logo" style="width: 160px;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:20px;font-weight:600;color:#bf9b30;padding-bottom:10px;">
                Confirm your Entry: <br>OTP for the GTC Lucky Draw
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:14px;color:#ffff;padding-bottom:20px;">
                Enter this 6-digit code to verify your email and receive your unique Lucky Number.
              </td>
            </tr>
            <tr><td style="border-top: 2px solid #e0e0e0; padding: 15px 0;"></td></tr>
            <tr>
              <td style="font-size:14px;color:#ffff;padding-bottom:10px;">
                Dear ${first_name || "Client"},
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#ffff;padding-bottom:10px;">
                Thanks for registering for the <span style="color:#bf9b30; font-weight: 600">GTC Lucky Draw</span>. To complete your entry, please verify your email by entering the OTP below on the form.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#ffff;padding-bottom:10px;">
                Here’s the OTP that you’ll need to enter into the form.
              </td>

                  <tr>
              <td style="font-size:30px;font-weight:600;color:#bf9b30;padding:20px 0px;">
                ${otp}
              </td>
            </tr>

            </tr>
 <tr>
              <td style="font-size:14px;color:#ffff;padding-bottom:10px;">

            Once verified, we’ll send your unique Lucky Number to this email. Keep it safe winners will be announced on 7 December 2025.

            </td>
            </tr>
        
            <tr>
              <td style="font-size:14px;color:#ffff;padding-bottom:20px;">
                If you need any help, our Customer Care team is available via Live Chat on our website or by email at support@gtcfx.com.
              </td>
            </tr>
      
            <tr>
              <td style="font-size:14px;color:#ffff;padding-bottom:30px;">
                Have a great day,<br>Your GTC Family
              </td>
            </tr>
            <tr><td style="border-top: 2px solid #e0e0e0; padding: 15px 0;"></td></tr>
            <tr>
              <td style="padding-top: 0px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <img src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/social/logo-new-golden.png" alt="GTC Logo" style="width: 160px;" />
                    </td>
                    <td align="right" style="font-size: 13px; color: #fff; line-height: 25px;">
                      📞 Phone: +971 800 667788<br/>
                      ✉️ Email: <a href="mailto:support@gtcfx.com" style="color: #fff; text-decoration: none;">support@gtcfx.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Add Legal + Social sections here if needed -->
             <!-- Legal Footer -->
<tr>
  <td style="font-size: 11px; color: #ccc; padding: 20px 0px; line-height: 1.5;">

    This website is owned and operated by GTC Global Ltd, a limited company incorporated in Mauritius (company number: C188049) and licensed by the Financial Services Commission, Mauritius (No. GB22200292) to trade as an SEC-2.1B Investment Dealer. Registered Address: Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity, 72201 Ebene, Republic of Mauritius. The financial services and products promoted on this website are offered by GTC Global Ltd and GTC Global Trade Capital Co. Limited, a company authorised by the Vanuatu Financial Services Commission of the Republic of Vanuatu, Company License Number: 40354.
   
  </td>
</tr>

<!-- Social Media Footer -->
<tr>
  <td style="padding-top: 30px; text-align: center;">
    <table align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 0 5px;">
          <a href="https://www.facebook.com/GTCFXGlobalTradeCapital" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://x.com/GTC_fx" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png" alt="X" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://www.youtube.com/channel/UCnKWakjm1b9Bm63xgwNFXHA" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://linkedin.com/company/gtcfx-official" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://www.instagram.com/gtcfxofficial/" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://api.whatsapp.com/send/?phone=448000488461&text&type=phone_number&app_absent=0" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://t.me/gtc_vip_signal" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" width="20" height="20" style="display:block;">
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="GTCFX - Global Trade Capital on TikTok" target="_blank">
            <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" width="20" height="20" style="display:block;">
          </a>
        </td>
      </tr>
    </table>
  </td>
</tr>

<tr>
  <td align="center" style="font-size: 12px; color: #ccc; padding-top: 15px;">
    &copy; Copyright 2025 GTCFX – All Rights Reserved
  </td>
</tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export { generateEnglishTemplate, generateArabicTemplate };
