import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import helmet from 'helmet';
import { auth } from 'express-oauth2-jwt-bearer';

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import router from './router';

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
  throw new Error(
    "Missing required environment variables. Check docs for more info."
  );
}

const PORT: number = parseInt(process.env.PORT, 10);
const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
const issuer = process.env.AUTH0_ISSUER_BASE_URL;

const app: express.Application = express();

// app.use(express.json());
// app.set("json spaces", 2);

// app.use(
//   helmet({
//     hsts: {
//       maxAge: 31536000,
//     },
//     contentSecurityPolicy: {
//       useDefaults: false,
//       directives: {
//         "default-src": ["'none'"],
//         "frame-ancestors": ["'none'"],
//       },
//     },
//     frameguard: {
//       action: "deny",
//     },
//   })
// );
// router.use(auth(issuer))

app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  })
);

// app.use(cors())
app.use(router);

app.use(errorHandler);
app.use(notFoundHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});