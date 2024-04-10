import { NextResponse } from "next/server";
import Categories from "../../../../(models)/Categories";
import connectDB from "../../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { category, clicked, variants, id } = body;

    try {
        const categories = await Categories.findById(id);

        categories.category = category;
        categories.clicked = clicked;
        categories.variants = variants;

        await categories.save();

        return NextResponse.json({
            message: "Category Updated",
            success: true,
            categories,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Categories was't updated",
            success: false,
        });
    }
}
