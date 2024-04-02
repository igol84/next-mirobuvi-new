import {Client} from "basic-ftp"
import {Readable} from "stream";

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
    await client.uploadFrom(stream, fileName)
    await client.clearWorkingDir()
  } catch (err) {
    console.log(err)
  }
}

export type Files = { file: File, fileName: string }[]
export const uploadFiles = async (client: Client, pathDir: string, files: Files) => {
  try {
    await client.ensureDir(pathDir)
    for (const {file, fileName} of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = Readable.from(buffer);
      await client.uploadFrom(stream, fileName)
    }
    await client.clearWorkingDir()
  } catch (err) {
    console.log(err)
  }
}