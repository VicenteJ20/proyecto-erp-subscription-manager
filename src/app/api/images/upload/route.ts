import { NextResponse } from "next/server"
import path from "path"
import { writeFile } from "fs/promises"
import { auth } from "@/auth"

export const config = {
  api: {
    bodyParser: false,
  },
}

export const POST = auth(async (req) => {
  const session = req.auth

  try {
    const formData = await req.formData()
    const image = formData.get('image') as any

    if (!image) {
      return NextResponse.json({ message: "No image uploaded" }, { status: 400 })
    }

    const buffer = await image.arrayBuffer()
    const filename = image.name.replaceAll(" ", "_")

    try {
      await writeFile(
        path.join(process.cwd(), 'public/assets/images', filename),
        Buffer.from(buffer)
      )
      return NextResponse.json({ message: "Upload successful" }, { status: 201 })
    } catch (error: any) {
      console.error("Error writing file:", error)
      return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error processing request:", error)
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 })
  }
})