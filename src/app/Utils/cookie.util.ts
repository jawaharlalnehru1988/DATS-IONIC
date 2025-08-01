export class CookieUtil {
  
  /**
   * Set a cookie with name, value, and optional expiration days
   * @param name Cookie name
   * @param value Cookie value
   * @param days Days until expiration (default: 1 day)
   */
  static setCookie(name: string, value: string, days: number = 1): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
  }

  /**
   * Get a cookie value by name
   * @param name Cookie name
   * @returns Cookie value or null if not found
   */
  static getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  /**
   * Delete a cookie by name
   * @param name Cookie name
   */
  static deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  /**
   * Check if a cookie exists
   * @param name Cookie name
   * @returns true if cookie exists, false otherwise
   */
  static hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }

  /**
   * Get all cookies as an object
   * @returns Object with cookie names as keys and values as values
   */
  static getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const cookiesArray = document.cookie.split(';');
    
    cookiesArray.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = value;
      }
    });
    
    return cookies;
  }
}
