import express from "express";
import cors from "cors";
import "dotenv/config";
import contentGen from "./routes/contentGen.js";
import account from "./routes/account.js";
import { mongodb_db, redis_db } from "./connection_establishment.js";
import cookieParser from "cookie-parser";
const app = express();

// app.use(cors());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://yeyaansh.com","https://vergedraft.yeyaansh.com"] // Production origins
    : ["http://localhost:5173"]; // Development origin

// You MUST specify the exact origin. A wildcard (*) is not allowed
// when credentials: true is set.

const corsOptions = {
  // The 'origin' property can accept a function for dynamic validation
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        // "The CORS policy for this site does not allow access from the specified Origin.";
                "Kya bhai CORS policy ke baare mein nahi suna hai kya?";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },

  // This tells the browser that the server is willing to accept cookies
  // from a cross-origin request.

  credentials: true,
};

app.use(cors(corsOptions)); //

app.use(express.json());
app.use(cookieParser());
app.use("/account", account);
app.use("/user", contentGen);

await Promise.all([mongodb_db(), redis_db()]);

app.listen(process.env.EXPRESS_PORT, async () => {
  console.log(`Server is listening at PORT: ${process.env.EXPRESS_PORT}`);
});
