import AdmZip from 'adm-zip'

export const extractZip = async (filePath: string): Promise<string[]> => {
  const zip = new AdmZip(filePath)
  const zipEntries = zip.getEntries()
  const files: string[] = zipEntries.map((zipEntry) => zipEntry.entryName)
  zip.extractAllTo('./tmp', true)
  return files
}
