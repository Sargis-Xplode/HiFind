import { NextResponse } from "next/server";
import Shop from "../../../(models)/Shop";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { id } = body;

    try {
        const shop = await Shop.findById(id);
        const message = shop.active ? "Shop deactivated" : "Shop activated";

        shop.active = !shop.active;

        await shop.save();

        return NextResponse.json({
            message,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: "There was an error",
            success: false,
        });
    }
}
