import express from "express";
import cors from "cors";
import "dotenv/config";
import contentGen from "./routes/contentGen.js";
import account from "./routes/account.js";
import {mongodb_db,redis_db} from "./connection_establishment.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/account',account);
app.use('/user',contentGen);


await Promise.all([mongodb_db(),redis_db()]);

app.listen(process.env.EXPRESS_PORT, async() => {
  

  console.log(`Server is listening at PORT: ${process.env.EXPRESS_PORT}`);
});
