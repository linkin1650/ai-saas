import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

// TypeScript interface
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

const cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

// Serverless
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "AI-SAAS",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  global.mongoose = cached;

  return cached.conn;
};
