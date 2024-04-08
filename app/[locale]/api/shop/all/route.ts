import { NextResponse } from "next/server";
import Shop from "../../../(models)/Shop";
import connectDB from "../../../server/connectDB";

export async function GET() {
    await connectDB();
    try {
        const shops = await Shop.find();
        return NextResponse.json({
            message: "All shops returned",
            success: true,
            shops,
        });
    } catch (error) {
        return NextResponse.json({
            message: error,
            success: false,
        });
    }
}
