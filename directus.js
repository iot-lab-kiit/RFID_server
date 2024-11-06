import {
  createDirectus,
  rest,
  authentication,
  staticToken,
} from "@directus/sdk";
import dotenv from "dotenv";
dotenv.config();
export const client = createDirectus(process.env.PUBLIC_DIRECTUS_URL)    //static token
  .with(rest())
  .with(
    authentication({
      mode: "json",
      staticToken: process.env.TOKEN,
    })
  );

export const clientToken = (token) => {   
  return createDirectus(process.env.PUBLIC_DIRECTUS_URL) 
    .with(staticToken(token))
    .with(rest());
};

