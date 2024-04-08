import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/auth";

// Middleware to check if admin is logged in
export default async function checkAuth(token: string, email: string) {
    if (!token) {
        return {
            message: "Unauthorized",
            success: false,
            user: {},
        };
    }

    try {
        const user: any = jwt.decode(token);

        if (user.email === email) {
            return {
                message: "Successfully Authorized",
                success: true,
                user: {},
            };
        } else {
            return {
                message: "Not Authorized",
                success: true,
                user: {},
            };
        }

        // jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return {
            message: "Invalid token",
            success: false,
            user: {},
        };
    }
}
