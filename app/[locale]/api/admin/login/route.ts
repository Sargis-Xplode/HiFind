import { NextResponse } from "next/server";
import Admin from "../../../(models)/Admin";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../../utils/auth";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    try {
        const user = await Admin.findOne({ email });

        if (!user || password !== user.password) {
            return NextResponse.json({
                message: "You have entered incorrect email or password.",
                success: false,
                user: {},
            });
        }

        const token = sign({ email }, SECRET_KEY, { expiresIn: "1h" });

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
