import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

export async function POST(req: Request) {
    const body = await req.json();
    const { to, subject } = body;

    const transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD,
        },
    });

    try {
        // const testResult = await transport.verify();
        // console.log(testResult);

        const info = await transport.sendMail({
            from: `"Xplode LLC 🩷" <${SMTP_EMAIL}>`,
            to,
            subject,
            html: "<b>Your shop has been submitted, please wait untill our admin approves or denies your request</b>",
        });

        return NextResponse.json({
            message: "Mail was sent",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: "There was an error",
            error: error,
            success: false,
        });
        console.log(error);
    }
}
