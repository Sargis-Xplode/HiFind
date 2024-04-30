import { NextResponse } from "next/server";
import Shop from "../../../(models)/Shop";
import connectDB from "../../../server/connectDB";

export async function POST(req: Request) {
    await connectDB();

    const body = await req.json();
    const {
        buisnessName,
        email,
        instaPageLink,
        descriptionArm,
        descriptionEng,
        instaPfpPreview,
        categoryName,
        subCategories,
        id,
    } = body;

    try {
        const shop = await Shop.findById(id);

        shop.buisnessName = buisnessName;
        shop.email = email;
        shop.instaPageLink = instaPageLink;
        shop.descriptionArm = descriptionArm;
        shop.descriptionEng = descriptionEng;
        shop.instaPfpPreview = instaPfpPreview;
        shop.categoryName = categoryName;
        shop.subCategories = subCategories;

        await shop.save();

        return NextResponse.json({
            message: "Shop updated",
            success: true,
            shop,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Shop was't updated",
            success: false,
        });
    }
}
