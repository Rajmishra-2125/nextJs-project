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
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 700;">
          ${emailType === "VERIFY" ? "Confirm Your Identity" : "Password Reset Request"}
        </h1>
      </div>
      
      <p style="font-size: 16px; color: #555;">
        Hello, ${
          emailType === "VERIFY"
            ? "Welcome! Please confirm your email address to get started."
            : "We received a request to reset your password. If you didn't make this request, you can safely ignore this email."
        }
      </p>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${link}" 
           style="background-color: #0070f3; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; transition: background-color 0.3s ease;">
          ${emailType === "VERIFY" ? "Verify Email Address" : "Reset Password"}
        </a>
      </div>

      <p style="font-size: 14px; color: #888; text-align: center; margin-top: 40px;">
        If the button above doesn't work, copy and paste this link into your browser:
        <br />
        <span style="color: #0070f3; word-break: break-all;">${link}/...token...</span>
      </p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
      
      <p style="font-size: 12px; color: #aaa; text-align: center;">
        &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </div>
  `,
    }); 

  
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};