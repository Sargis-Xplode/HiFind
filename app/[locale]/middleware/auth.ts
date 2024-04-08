import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/auth";

// Middleware to check if admin is logged in
export default function checkAuth(token: string) {
    if (!token) {
        return {
            message: "Unauthorized",
            success: false,
            user: {},
        };
    }

    try {
        console.log(jwt.decode(token));

        jwt.verify(token, SECRET_KEY);

        return {
            message: "Successfully Authorized",
            success: true,
            user: {},
        };
    } catch (error) {
        return {
            message: "Invalid token",
            success: false,
            user: {},
        };
    }
}
