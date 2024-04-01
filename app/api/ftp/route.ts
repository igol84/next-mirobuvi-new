import {Client} from "basic-ftp"
import {Readable } from "stream"
import mime from 'mime';
import {NextRequest, NextResponse} from "next/server";


const client = new Client()
client.ftp.verbose = true

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const images = formData.getAll("image") as File[] || null;

  await client.access({
    host: "ftp.mirobuvi.com.ua",
    user: "test@mirobuvi.com.ua",
    password: "w@b{~W$uqthM",
    secure: true
  })
  await client.ensureDir("brands")
  const filenames: string[] = []
  for (const image of images) {
    const buffer = Buffer.from(await image.arrayBuffer());
    const stream = Readable.from(buffer);
    if(image) {
      try {
        const filename = `${image.name.replace(/\.[^/.]+$/, "")}.${mime.getExtension(image.type)}`;
        filenames.push(filename)
        await client.uploadFrom(stream, filename)
      } catch (err) {
        console.log(err)
      }
    }
  }

  client.close()
  return NextResponse.json({filenames: filenames});

}

