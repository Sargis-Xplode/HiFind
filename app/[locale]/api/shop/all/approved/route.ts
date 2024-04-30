import { NextResponse } from "next/server";
import Shop from "../../../../(models)/Shop";
import connectDB from "../../../../server/connectDB";

export async function GET() {
    await connectDB();
    try {
        const shops = (await Shop.find({ approved: true })).reverse();

        return NextResponse.json({
            message: "All approved shops returned",
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
