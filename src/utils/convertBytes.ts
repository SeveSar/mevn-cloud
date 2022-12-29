const units = ["B", "KB", "MB", "GB", "TB", "PB"];

export const bytesForHuman = (bytes: number) => {
  let i = 0;
  for (i; bytes >= 1024; i++) {
    bytes /= 1024;
  }

  return bytes.toFixed(2) + " " + units[i];
};
