import { Resend } from 'resend';
import User from '@/models/userModels';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {

    const hashedToken = crypto.randomBytes(32).toString('hex');

    console.log(hashedToken);
    
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true },
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "fc1ffef59df4dd",
    //     pass: "d7d50fa5096fd0",
    //   },
    // });

    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    const mailresponse = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${link}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "Reset your password"}</p>`,
    });    

  
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};