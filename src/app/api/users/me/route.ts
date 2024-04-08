import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/user.model"
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest){
    const userId = await getDataFromToken(request)
    const user = await User.findById(userId).select("-password")

    if(!user){
        return NextResponse.json({error: "Invalid token"}, {status: 400})
    }

    return NextResponse.json({
        message: "User found",
        data: user
    })
}