import * as dotenv from "dotenv";
import { auth } from "express-oauth2-jwt-bearer";

dotenv.config();

export const validateAccessToken = auth({
  audience: 'seimica-server',
  issuerBaseURL: 'https://dev-eqm8feeb648b2zkc.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});