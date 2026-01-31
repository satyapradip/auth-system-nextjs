import { connectToDB } from "@/src/db/db";
import User from "@/src/models/userModel";
import { NextResponse } from "next/server";

connectToDB();

export async function GET() {
  try {
    const users = await User.find({}).select("-password");
    return NextResponse.json({
      message: "Users fetched successfully",
      count: users.length,
      users: users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
