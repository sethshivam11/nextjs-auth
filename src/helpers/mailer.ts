import User from "@/models/user.model";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"

interface sendEmailInterface {
    email: string,
    emailType: string,
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: sendEmailInterface) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "94432183010bc9",
                pass: "df8cfbd956e053"
            }
        });

        const mailOptions = {
            from: "nextauth@next.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href=${process.env.DOMAIN}verifyemail?token=${hashedToken}>here</a> to 
            ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in the browser.
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error)
    }
}