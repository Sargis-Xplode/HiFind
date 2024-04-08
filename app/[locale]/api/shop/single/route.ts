import { NextResponse } from "next/server";
import Shop from "../../../(models)/Shop";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const { buisnessName, email, instaPageLink, descriptionArm, descriptionEng, instaPfpPreview, subCategories } = body;

    try {
        const shop = await Shop.create({
            buisnessName,
            email,
            instaPageLink,
            descriptionArm,
            descriptionEng,
            instaPfpPreview,
            subCategories,
        });

        console.log(shop);
        return NextResponse.json({
            message: "Shop submitted",
            success: true,
            shop,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Shop was't submitted",
            success: false,
        });
    }
}
