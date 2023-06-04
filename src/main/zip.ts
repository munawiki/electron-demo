import AdmZip from 'adm-zip'

export const extractZip = async (filePath: string): Promise<string[]> => {
  const zip = new AdmZip(filePath)
  const zipEntries = zip.getEntries()
  const files: string[] = []
  zipEntries.forEach((zipEntry) => {
    files.push(zipEntry.entryName)
  })
  zip.extractAllTo('./tmp', true)
  return files
}
