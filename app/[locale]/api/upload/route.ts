import { NextResponse } from "next/server";
import connectDB from "../../server/connectDB";
import multer from "multer";

export async function POST(req: Request) {
    await connectDB();

    const upload = multer({ dest: "uploads/" });

    // upload.single("file")(req, res, (err) => {
    //     if (err instanceof multer.MulterError) {
    //         // Multer error occurred
    //         NextResponse.json({
    //             message: "File upload error",
    //             success: true,
    //         });
    //     } else if (err) {
    //         // Other errors occurred
    //         NextResponse.json({
    //             message: "Something went wrong",
    //             success: true,
    //         });
    //     } else {
    //         const file = req.file;
    //         // Implement logic to save the file to the server or cloud storage
    //     }
    // });
}
