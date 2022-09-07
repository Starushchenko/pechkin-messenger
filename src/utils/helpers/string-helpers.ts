export const trim = (string: string, cuted = ''): string => {
  if (!cuted) {
    return string.trim();
  }
  return string.replace(new RegExp(`^[${cuted}]+|[${cuted}]+$`, 'g'), '');
}

export const stringSanitize = (str: string) => {
  return str.replace(/[&<>"']/gi, '')
}
