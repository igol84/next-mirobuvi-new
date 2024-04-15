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
    console.log(fileName)
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);
    await client.uploadFrom(stream, `/${pathDir}/${fileName}.${mime.getExtension(file.type)}`)
  } catch (err) {
    console.error(err)
  }
}

export const isFileExist = async (client: Client, pathDir: string, fileName: string) => {
  const listImg = await client.list(`/${pathDir}`)
  return !!listImg.find(file => file.name === fileName);
}

export const renameFile = async (client: Client, pathDir: string, fileName: string, newFileName: string) => {
  if (fileName !== newFileName)
    try {
      if (await isFileExist(client, pathDir, fileName))
        await client.rename(`/${pathDir}/${fileName}`, `/${pathDir}/${newFileName}`)
    } catch (err) {
      console.error(err)
    }
}

export const deleteFile = async (client: Client, pathDir: string, fileName: string) => {
  try {
    if (await isFileExist(client, pathDir, fileName))
      await client.remove(`/${pathDir}/${fileName}`)
  } catch (err) {
    console.error(err)
  }
}

