import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../(models)/Admin";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const secretKey = crypto.randomBytes(32).toString("hex");
const JWT_SECRET = secretKey;

function generateToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
}

export async function POST(req: any, res: NextApiResponse) {
    const body = await req.json();
    const { email, password } = body;

    try {
        const user = await Admin.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: "Invalid Email",
                success: false,
                user: {},
            });
        }

        if (password !== user.password) {
            return NextResponse.json({
                message: "Invalid Password",
                success: false,
                user: { email },
            });
        }

        const token = generateToken(user._id);
        return NextResponse.json(
            {
                message: "Login Successful",
                success: true,
                user: { email },
                token,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
