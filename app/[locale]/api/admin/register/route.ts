import { NextResponse } from "next/server";
import Admin from "../../../(models)/Admin";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();
    
    const body = await req.json();
    const { email, password } = body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin.email) {
            await Admin.create({ email, password });
        } else {
            return NextResponse.json({
                message: "Admin with that email already exists",
                success: false,
                admin: { email },
            });
        }
        return NextResponse.json({
            message: "Regstered Successfuly",
            success: true,
            admin: { email },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: error });
    }
}
