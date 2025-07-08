import mongoose from "mongoose";
import { createClient } from "redis";
const mongodb_db = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT);
    console.log("mongodb database connected");
  } catch (err) {
    console.log("error in connection: " + err);
  }
};

const redis_db = async()=>{
   const client = createClient({
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    client.on("error", (err) => console.log("Redis Client Error", err));

    await client.connect();
    console.log("redis database connected successfully");
 
}

export {mongodb_db, redis_db} ;
