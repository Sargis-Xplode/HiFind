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
        const info = await transport.sendMail({
            from: `"Xplode LLC 🩷" <${SMTP_EMAIL}>`,
            to,
            subject,
            html: `<div style="width: 456px; height: 298px; background-color: white; border-radius: 25px">
                        <div>
                            <img style="width: 150px; height: auto; margin: 0 150px" src="https://hi-find.vercel.app/logo.png" />
                        </div>

                        <h2>Հարգելի ${to},</h2>
                        <p>
                            Ձեզ հրավիրում ենք գրանցվելու մեր համակարգ, որպեսզի էլ ավելի հասանելի և տեսանելի դառնաք թվային աշխարհում:
                        </p>
                    </div>`,
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
    }
}
