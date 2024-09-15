import { NextResponse } from "next/server"
import path from "path"
import { auth } from "@/auth"
import { promises as fs } from "fs"

export const config = {
  api: {
    bodyParser: false,
  },
}

export const POST = auth(async (req) => {
  const session = req.auth
  const mainRoute = process.env.MAIN_ROUTE as string

  try {
    const formData  = await req.formData()
    const image = formData.get('image') as any

    if (!image) {
      return NextResponse.json({ message: "No image uploaded" }, { status: 400 })
    }

    const buffer = await image.arrayBuffer()
    const filename = image.name.replaceAll(" ", "_")
    const company = formData.get('company') as string
    
    try {

      if (!company) {
        return NextResponse.json({ message: "No company name provided" }, { status: 400 })
      }

      const companyFolder = path.join(process.cwd(), mainRoute, company);


      await fs.mkdir(companyFolder, { recursive: true });

      await fs.writeFile(
        path.join(companyFolder, filename),
        Buffer.from(buffer)
      )
      return NextResponse.json({ message: "Upload successful", url: `${mainRoute}/${company}/${filename}` }, { status: 201 })
    } catch (error: any) {
      console.error("Error writing file:", error)
      return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error processing request:", error)
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 })
  }
})