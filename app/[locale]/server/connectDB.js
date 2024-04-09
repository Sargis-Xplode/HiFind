import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI;
const DATABASE_URL_LOCAL = process.env.MONGODB_URI_LOCAL;

if (!DATABASE_URL || !DATABASE_URL_LOCAL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        try {
            cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
                return mongoose;
            });
        } catch (error) {
            console.log(error);
        }
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
