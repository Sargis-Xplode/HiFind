import { NextResponse } from "next/server";
import Shop from "../../../(models)/Shop";
import connectDB from "../../../server/connectDB";

// To do
// Change to DELETE, take id from params
export async function POST(req: Request) {
    await connectDB();

    // const searchParams = req.nextUrl.searchParams;
    // const id = searchParams.get("id");

    const body = await req.json();
    const { id } = body;

    try {
        await Shop.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Shop deleted",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Shop was't deleted",
            success: false,
        });
    }
}
