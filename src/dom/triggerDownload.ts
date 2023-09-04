export function triggerDownload(data: BlobPart, name: string): void {
  const blob = new Blob([data])
  const url = URL.createObjectURL(blob)

  setTimeout(() => URL.revokeObjectURL(url))

  // See https://developers.google.com/web/updates/2011/08/Downloading-resources-in-HTML5-a-download
  const anchor = document.createElement('a')
  document.body.appendChild(anchor)
  anchor.download = name
  anchor.href = url
  anchor.click()

  setTimeout(() => document.body.removeChild(anchor))
}
