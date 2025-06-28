// Set a cookie that expires in 1 day
export function AddCookie(cookie: string, value: string) {
  const expires = new Date();
  expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000); // 1 day
  document.cookie = `${encodeURIComponent(cookie)}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}

// Retrieve the value of a cookie
export function GetCookie(cookie: string): string | null {
  const nameEQ = `${encodeURIComponent(cookie)}=`;
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}
