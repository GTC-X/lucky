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

          <table width="650" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0; border-radius:8px;padding:30px; padding-top: 20px">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/logo-email.jpg" alt="GTC Logo" style="width: 160px;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:20px;font-weight:600;color:#253289;padding-bottom:10px;">
                Get 5,000 USC to Trade. <br>
No Deposit Needed!
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:14px;color:#4D4D70;padding-bottom:20px;">
                Confirm your email by entering the OTP that’s in this email.
              </td>
            </tr>
            <tr><td style="border-top: 2px solid #e0e0e0; padding: 15px 0;"></td></tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                Dear ${first_name || "Client"},
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                Activate your GTC Cent trading account, and start trading with a 5,000 USC bonus today.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                Here’s the OTP that you’ll need to enter into the form.
              </td>
            </tr>
            <tr>
              <td style="font-size:24px;font-weight:600;color:#253289;padding:20px 0px;">
                ${otp}
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:20px;">
                If you need any help or assistance, simply reach out to our amazing Customer Care team via our Live Chat feature that’s on our website, 
                <a href="https://gtcfx.com">https://gtcfx.com</a>.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                Switch to GTC and experience tighter spreads, instant withdrawals, fair scalping rules, and better bonuses. Trade smarter with a broker that gets you.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:30px;">
                Have a great day,<br>Your GTC Family
              </td>
            </tr>
            <tr><td style="border-top: 2px solid #e0e0e0; padding: 15px 0;"></td></tr>
            <tr>
              <td style="padding-top: 0px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <img src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/logo-email.jpg" alt="GTC Logo" style="width: 160px;" />
                    </td>
                    <td align="right" style="font-size: 13px; color: #192055; line-height: 25px;">
                      📞 Phone: +971 800 667788<br/>
                      ✉️ Email: <a href="mailto:support@gtcfx.com" style="color: #192055; text-decoration: none;">support@gtcfx.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Add Legal + Social sections here if needed -->
             <!-- Legal Footer -->
<tr>
  <td style="font-size: 11px; color: #666; padding: 20px 0px; line-height: 1.5;">
  <strong>Your login account and password must be kept confidential at all times. Passwords should never be shared or exposed to others. You should never let anyone else access your GTC trading account, or do anything else that might jeopardize the security of your account.</strong><br/><br/>
    <strong>You’re responsible for the confidentiality and use of all IDs, passwords, and other security data, methods, and devices in connection with the GTC client zone and the GTC trading platform(s).</strong> 
    <br/><br/>
    This website is owned and operated by GTC Global Ltd, a limited company incorporated in Mauritius (company number: C188049) and licensed by the Financial Services Commission, Mauritius (No. GB22200292) to trade as an SEC-2.1B Investment Dealer. Registered Address: Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity, 72201 Ebene, Republic of Mauritius. The financial services and products promoted on this website are offered by GTC Global Ltd and GTC Global Trade Capital Co. Limited, a company authorised by the Vanuatu Financial Services Commission of the Republic of Vanuatu, Company License Number: 40354.
    <br/><br/>
    <stong style="font-weight: 600p; color: #000;">GTC Global Ltd and GTC Global Trade Capital Co. Limited</stong> belong to the GTC Financial Group, which consists of a group of entities across the globe.
    <br/><br/>
    Investing in derivative products carries significant risks and may not be suitable for all investors. Leveraging in these instruments can increase the level of risk and potential loss exposure. Before making any decision to engage in foreign exchange trading or CFDs, it is essential to carefully assess your investment objectives, level of experience, and risk tolerance. You should only invest funds that you can afford to lose. We strongly encourage you to educate yourself thoroughly about the associated risks and, if you have any questions, seek advice from an independent financial or tax advisor.
    <br/><br/>
    <stong style="font-weight: 600p; color: #000;">GTC Global Ltd and GTC Global Trade Capital Co. Limited</stong> do not provide services to individuals residing in specific jurisdictions and/or jurisdictions where distribution of such services would be contrary to local law or regulation.
    <br/><br/>
    <strong style="font-weight: 600p; color: #000;">Other Group Entities:</strong><br/>
    The financial products and services offered on this website are <u>NOT</u> provided by the following group entities, and no recourse against the following entities is available. If you are interested in the products and services offered by each of the following entities, please visit their respective websites.
    <br/><br/>
    <strong style="font-weight: 600p; color: #000;">GTC Group LLC-FZ</strong> is a holding company incorporated in Dubai, United Arab Emirates with Business License Number: 2311147.01. Its registered office is at Business Center 1, M Floor, Meydan Hotel, Nad Al Sheba, Dubai, United Arab Emirates.
    <br/><br/>
    <strong style="font-weight: 600p; color: #000;">GTC Multi Trading DMCC</strong> is a limited company licensed and incorporated under the laws of the Dubai Multi Commodities Centre (No. DMCC-312687) and licensed by the Securities and Commodities Authority, United Arab Emirates (No. 202200000007) to practice the activity of Commodity Brokerage - Trading and Clearing. Registered Address: Unit No: 1501, 1 Lake Plaza, Plot No: JLT-PH2-T2A, Jumeirah Lakes Towers, Dubai, United Arab Emirates.
    <br/><br/>
    Each of the entities within the GTC Financial Group is managed separately. The financial products and services offered on this website are ONLY provided by GTC Global Ltd and GTC Global Trade Capital Co. Limited.
    <br/><br/>
    All trademarks are the property of their respective owners. All rights reserved. GTC Global Ltd is part of the GTC Financial Group, which consists of a group of entities across the globe.
    <br/><br/>
    <strong>Risk Warning:</strong> Trading leveraged products such as forex and derivatives may not be suitable for all investors as they carry a high degree of risk to your capital. Please ensure that you fully understand the risks involved and seek independent advice if necessary.
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
  <td align="center" style="font-size: 12px; color: #666666; padding-top: 15px; padding-bottom: 30px;">
    &copy; Copyright 2025 GTCFX – All Rights Reserved
  </td>
</tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
        `;
};

const generateArabicTemplate = (otp, first_name) => {
  return `<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>لا تفوت فرصتك مع GTC!</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600&display=swap');
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#ffffff;font-family:'Noto Kufi Arabic',sans-serif;direction:rtl;text-align:right;">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Noto Kufi Arabic', sans-serif; padding: 20px;">
      <tr>
        <td align="center">

          <table width="650" cellpadding="0" cellspacing="0" style="border:1px solid #e0e0e0; border-radius:8px;padding:30px; padding-top: 20px">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <img src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/logo-email.jpg" alt="شعار GTC" style="width: 160px;" />
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:20px;font-weight:600;color:#253289;padding-bottom:10px;">
                احصل على 5,000 USC للتداول. <br>
                بدون إيداع!
              </td>
            </tr>
            <tr>
              <td align="center" style="font-size:14px;color:#4D4D70;padding-bottom:20px;">
                قم بتأكيد بريدك الإلكتروني عبر إدخال رمز التحقق (OTP) المرسل إليك في هذا البريد.
              </td>
            </tr>
            <tr><td style="border-top: 2px solid #e0e0e0; padding: 15px 0;"></td></tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                عزيزي ${first_name || "العميل"},
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                فعّل حساب تداول السنت من GTC وابدأ التداول مع بونص 5,000 USC اليوم.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                هذا هو رمز التحقق (OTP) الذي تحتاج إلى إدخاله في النموذج.
              </td>
            </tr>
            <tr>
              <td style="font-size:24px;font-weight:600;color:#253289;padding:20px 0px;">
                ${otp}
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:20px;">
                إذا كنت بحاجة إلى أي مساعدة، تواصل مع فريق خدمة العملاء عبر ميزة الدردشة الحية على موقعنا:
                <a href="https://gtcfx.com">https://gtcfx.com</a>.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:10px;">
                انضم إلى GTC وتمتع بفروقات سعرية أقل، سحوبات فورية، قواعد عادلة للتداول السريع (Scalping)، وبونصات أفضل. تداول بذكاء مع وسيط يفهمك.
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#4D4D70;padding-bottom:30px;">
                مع أطيب التحيات،<br>عائلتك في GTC
              </td>
            </tr>
            <tr><td style="border-top: 2px solid #e0e0e0; padding: 15px 0;"></td></tr>
            <tr>
              <td style="padding-top: 0px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="right">
                      <img src="https://gtcfx-bucket.s3.ap-southeast-1.amazonaws.com/logo-email.jpg" alt="شعار GTC" style="width: 160px;" />
                    </td>
                    <td align="left" style="font-size: 13px; color: #192055; line-height: 25px;">
                      📞 الهاتف: +971 800 667788<br/>
                      ✉️ البريد: <a href="mailto:support@gtcfx.com" style="color: #192055; text-decoration: none;">support@gtcfx.com</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- القسم القانوني -->
            <tr>
              <td style="font-size: 11px; color: #666; padding: 20px 0px; line-height: 1.5;">
                <strong>يجب الحفاظ على سرية بيانات تسجيل الدخول وكلمة المرور في جميع الأوقات. لا تشارك كلمات المرور أو تسمح لآخرين بالوصول إلى حساب التداول الخاص بك.</strong><br/><br/>
                <strong>أنت المسؤول عن سرية واستخدام جميع بيانات الدخول وكلمات المرور ووسائل الأمان الأخرى الخاصة بمنطقة عملاء GTC ومنصات التداول.</strong> 
                <br/><br/>
                هذا الموقع مملوك ومدار من قبل <strong>GTC Global Ltd</strong>، وهي شركة مسجلة في موريشيوس (رقم الشركة: C188049) ومرخصة من هيئة الخدمات المالية بموريشيوس (No. GB22200292). العنوان المسجل: Cyberati Lounge, Ground Floor, The Catalyst, Silicon Avenue, 40 Cybercity, 72201 Ebene, Republic of Mauritius.  
                <br/><br/>
                <strong>GTC Global Ltd و GTC Global Trade Capital Co. Limited</strong> تنتميان إلى مجموعة GTC المالية التي تضم شركات حول العالم.  
                <br/><br/>
                <strong>تحذير المخاطر:</strong> التداول بالمنتجات ذات الرافعة المالية مثل الفوركس والمشتقات يحمل مخاطر عالية وقد لا يكون مناسبًا لجميع المستثمرين. تأكد من فهمك الكامل للمخاطر واطلب استشارة مستقلة عند الحاجة.  
              </td>
            </tr>

            <!-- أيقونات السوشيال -->
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
                      <a href="https://www.tiktok.com/@gtcfx" target="_blank">
                        <img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" width="20" height="20" style="display:block;">
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size: 12px; color: #666666; padding-top: 15px; padding-bottom: 30px;">
                &copy; حقوق الطبع والنشر 2025 GTCFX – جميع الحقوق محفوظة
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
