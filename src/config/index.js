import dotenv from "dotenv";
const { parsed } = dotenv.config();

export const { APP_DB, APP_SECRET } = parsed;
export const PORT = process.env.PORT || parsed.PORT;
