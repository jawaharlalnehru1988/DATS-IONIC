export interface DecodedToken {
  name: string;
  email: string;
  sub: string;
  role: string;
  exp?: number;
  iat?: number;
}

export class JwtUtil {
  
  /**
   * Decode JWT token without verification (client-side only)
   * @param token JWT token string
   * @returns Decoded payload or null if invalid
   */
  static decodeToken(token: string): DecodedToken | null {
    try {
      if (!token) return null;
      
      // Split the token and get the payload (second part)
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      // Decode the base64 payload
      const payload = parts[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      
      return JSON.parse(decodedPayload) as DecodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  /**
   * Check if token is expired
   * @param token JWT token string
   * @returns true if expired, false if valid
   */
  static isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  /**
   * Get user initials from name
   * @param name Full name string
   * @returns User initials (max 2 characters)
   */
  static getUserInitials(name: string): string {
    if (!name) return '';
    
    const words = name.trim().split(/\s+/);
    
    if (words.length === 1) {
      // Single word - return first character
      return words[0].charAt(0).toUpperCase();
    } else {
      // Multiple words - return first character of first two words
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
  }
}
