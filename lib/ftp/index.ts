import {Client} from "basic-ftp"
import {Readable} from "stream";
import mime from 'mime';

export const getFTPClient = async (host: string, user: string, password: string): Promise<Client> => {
  const client = new Client()
  client.ftp.verbose = true
  await client.access({
    host,
    user,
    password
  })
  return client
}
export const uploadFile = async (client: Client, pathDir: string, file: File, fileName: string) => {
  try {
    await client.ensureDir(pathDir)
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);
    await client.uploadFrom(stream, `${fileName}.${mime.getExtension(file.type)}`)
  } catch (err) {
    console.error(err)
  }
}

