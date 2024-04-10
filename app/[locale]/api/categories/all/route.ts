import { NextResponse } from "next/server";
import Categories from "../../../(models)/Categories";
import connectDB from "../../../server/connectDB";

export async function GET() {
    await connectDB();
    try {
        const categories = await Categories.find();
        return NextResponse.json({
            message: "All categories returned",
            success: true,
            categories,
        });
    } catch (error) {
        return NextResponse.json({
            message: "No Categories",
            success: false,
        });
    }
}
