import {config} from "dotenv";
import { createDirectus, rest, staticToken } from "@directus/sdk";
config();

export const clientToken = () => {
  return createDirectus(process.env.PUBLIC_DIRECTUS_URL)
    .with(staticToken(process.env.TOKEN))
    .with(rest());
};
