import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const extractToken = (request: NextRequest) => {
  try {
    const gettoken = request.cookies.get("token")?.value || "";
    const verifytoken = jwt.verify(gettoken, process.env.TOKEN_SECRET!);
    return verifytoken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
