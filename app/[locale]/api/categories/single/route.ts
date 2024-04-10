import { NextResponse } from "next/server";
import Categories from "../../../(models)/Categories";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    console.log(body);
    const { category, clicked, variants } = body;

    console.log(category, clicked, variants);

    try {
        const categories = await Categories.create({
            category,
            clicked,
            variants,
        });

        return NextResponse.json({
            message: "Categories submitted",
            success: true,
            categories,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Categories was't submitted",
            success: false,
        });
    }
}
