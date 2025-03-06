// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("varnothsava"); // Replace with your DB name

    const result = await db.collection("users").insertOne({
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      college: body.college,
      firebaseUid: body.firebaseUid,
      createdAt: body.createdAt,
    });

    return NextResponse.json(
      { message: "User created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}