import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const secretKey = crypto.randomBytes(32).toString("hex");
const JWT_SECRET = secretKey;

interface DecodedToken {
    userId: string;
}

declare module "next" {
    interface NextApiRequest {
        adminId?: string;
    }
}

// Middleware to check if admin is logged in
export function requireAdminAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.replace("Bearer ", ""); // Get token from authorization header

        if (!token) {
            return NextResponse.json({
                message: "Unauthorized",
                success: false,
                user: {},
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
            req.adminId = decoded.userId; // Attach adminId to request object for later use
            return handler(req, res);
        } catch (error) {
            return NextResponse.json({
                message: "Invalid token",
                success: false,
                user: {},
            });
        }
    };
}
