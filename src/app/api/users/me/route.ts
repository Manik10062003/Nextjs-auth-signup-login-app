import { extractToken } from "@/helpers/extractToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/usermodels";
import { connect } from "@/dbconfi/dbconfi";

connect();

export async function GET(request: NextRequest){
    try {
        const userid = extractToken(request);
        const user = await User.findOne({ _id: userid }).select("-password");   
        return NextResponse.json({
            message: "User found",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
        
    }
}