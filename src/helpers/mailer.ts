// import bcryptjs from 'bcryptjs';
// import users from '../models/usermodels';
// import nodemailer from 'nodemailer';
// export const sendEmail = async({email, emailType , userId} : any) => {
//     try {
//       const hashedToken = await bcryptjs.hash(userId.toString(), 10);
//       if (emailType === "VERIFY") {
//         await users.findByIdAndUpdate(userId, {
//           verifyToken: hashedToken,
//           verifyTokenExpires: Date.now() + 3600000,
//         });
//       } else if (emailType === "RESET") {
//         await users.findByIdAndUpdate(userId, {
//           forgotPasswordToken: hashedToken,
//           forgotPasswordTokenExpires: Date.now() + 3600000,
//         });
//       }
//       // Looking to send emails in production? Check out our Email API/SMTP product!
//       var transport = nodemailer.createTransport({
//         host: "sandbox.smtp.mailtrap.io",
//         port: 2525,
//         auth: {
//           user: "755d8434279269",
//           pass: "f450cf02c97cbf",
//         },
//       });
//       const mailoptions = {
//         from: "manikagarwal10062003@gmail.com",
//         to: email,
//         subject: emailType === "VERIFY" ? "Verify Email" : "Reset Password",
//         html:`<p> Click <a href = "${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify" : "reset"}</p>`
//       }
//     } catch (error :any) {
//         throw new Error(error.message);         
//     }
// }
import nodemailer from "nodemailer";
import User from "@/models/usermodels";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "755d8434279269",
        pass: "f450cf02c97cbf",
      },
    });

    const mailOptions = {
      from: "manikagarwal10062003@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};