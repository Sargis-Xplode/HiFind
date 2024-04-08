import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/auth";

// Middleware to check if admin is logged in
export default async function checkAuth(token: string) {
    if (!token) {
        return {
            message: "Not Authorized",
            success: false,
        };
    }

    try {
        const user: any = jwt.decode(token);

        jwt.verify(token, SECRET_KEY);

        return {
            message: "Successfully Authorized",
            success: true,
            user,
        };
    } catch (error) {
        console.log(error);
        return {
            message: "Invalid token",
            success: false,
            user: {},
        };
    }
}
