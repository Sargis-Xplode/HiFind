import { NextResponse } from "next/server";
import Shop from "../../../(models)/Shop";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { id } = body;

    try {
        const shop = await Shop.findById(id);

        shop.approved = true;
        shop.denied = false;
        shop.newRequest = false;

        await shop.save();

        return NextResponse.json({
            message: "Category Updated",
            success: true,
            shop,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Categories was't updated",
            success: false,
        });
    }
}
