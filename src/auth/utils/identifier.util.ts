export function isEmail(identifier: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
}

export function isPhone(identifier: string): boolean {
  return /^\+?[1-9]\d{9,14}$/.test(identifier);
}
