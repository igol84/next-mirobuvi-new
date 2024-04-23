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

export const getAllImages = async (client: Client, pathDir: string): Promise<string[]> => {
  try {
    const catalog = await client.list(pathDir)
    return catalog.map(file => file.name).sort()
  } catch (err) {
    console.error(err)
    return []
  }
}


export const uploadFile = async (client: Client, pathDir: string, file: File, fileName: string) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const stream = Readable.from(buffer)
    await client.ensureDir(pathDir)
    await client.uploadFrom(stream, `${fileName}.jpeg`)
    await client.cd('/')
  } catch (err) {
    console.error(err)
  }
}

export const renameFolder = async (client: Client, pathDir: string, name: string, newName: string) => {
  try {
    const catalog = await client.list(pathDir)
    const localNames = catalog.map(file => file.name)
    const fileExist = localNames.includes(name)
    if (fileExist) {
      await client.rename(`${pathDir}/${name}`, `${pathDir}/${newName}`)
    }
  } catch (err) {
    console.error(err)
  }
}

export const uploadFiles = async (client: Client, pathDir: string, filesList: File[]) => {
  try {
    await client.ensureDir(pathDir)
    let i = 1;
    for (const file of filesList) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const stream = Readable.from(buffer)
      await client.uploadFrom(stream, `${i}.jpeg`)
      i++
    }
    await client.cd('/')
  } catch (err) {
    console.error(err)
  }
}

export const addFiles = async (client: Client, pathDir: string, filesList: File[]) => {
  try {
    await client.ensureDir(pathDir)
    const listServerFiles = await client.list()
    const lastIndexName = listServerFiles.map(file => Number(file.name.split('.')[0])).sort().reverse()[0]
    let i = listServerFiles.length ? lastIndexName + 1 : 1

    for (const file of filesList) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const stream = Readable.from(buffer)
      await client.uploadFrom(stream, `${i}.jpeg`)
      i++
    }
    await client.cd('/')
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

export const renameImages = async (client: Client, pathDir: string, names: string[]) => {
  let index = 1
  for (const name of names) {
    const localSuffix = String(index)
    const suffix = name.split(".")[0]
    if (suffix !== localSuffix) {
      await client.rename(`${pathDir}/${suffix}.jpeg`, `${pathDir}/${localSuffix}.j`)
    }
    index++
  }
  index = 1
  for (const name of names) {
    const localSuffix = String(index)
    const suffix = name.split(".")[0]
    if (suffix !== localSuffix) {
      await client.rename(`${pathDir}/${suffix}.j`, `${pathDir}/${suffix}.jpeg`)
    }
    index++
  }

}

