import { NextResponse } from "next/server";
import Categories from "../../../../(models)/Categories";
import connectDB from "../../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { id } = body;

    try {
        await Categories.deleteOne({ _id: id });

        return NextResponse.json({
            message: "Category successfully removed",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Category was't removed",
            success: false,
        });
    }
}
