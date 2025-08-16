 interface LanguageRoute {
  code: string;
  name: string;
  urlPrefix: string;
}

export const LANGUAGE_ROUTES: LanguageRoute[] = [
  { code: 'en', name: 'English', urlPrefix: '' }, // English has no prefix
  { code: 'ta', name: 'Tamil', urlPrefix: 'tamil' },
  { code: 'hi', name: 'Hindi', urlPrefix: 'hindi' },
  { code: 'bn', name: 'Bengali', urlPrefix: 'bengali' },
  { code: 'te', name: 'Telugu', urlPrefix: 'telugu' },
  { code: 'mr', name: 'Marathi', urlPrefix: 'marathi' },
  { code: 'gu', name: 'Gujarati', urlPrefix: 'gujarati' },
  { code: 'kn', name: 'Kannada', urlPrefix: 'kannada' },
  { code: 'ml', name: 'Malayalam', urlPrefix: 'malayalam' }
];

/**
 * Extract language code from URL path
 * @param url - The URL to extract language from
 * @returns Language code or 'en' as default
 */
export function getLanguageFromUrl(url: string): string {
  const pathSegments = url.split('/').filter(segment => segment);
  const firstSegment = pathSegments[0];
  
  const language = LANGUAGE_ROUTES.find(lang => lang.urlPrefix === firstSegment);
  return language ? language.code : 'en'; // Default to English
}

/**
 * Get URL prefix from language code
 * @param languageCode - The language code (e.g., 'ta', 'hi')
 * @returns URL prefix (e.g., 'tamil', 'hindi') or empty string for English
 */
export function getUrlPrefixFromLanguage(languageCode: string): string {
  const language = LANGUAGE_ROUTES.find(lang => lang.code === languageCode);
  return language ? language.urlPrefix : ''; // Default to empty string for English
}

/**
 * Check if a URL prefix is valid
 * @param prefix - The URL prefix to validate
 * @returns True if valid, false otherwise
 */
 function isValidLanguagePrefix(prefix: string): boolean {
  return LANGUAGE_ROUTES.some(lang => lang.urlPrefix === prefix);
}

/**
 * Get language route by URL prefix
 * @param prefix - The URL prefix
 * @returns LanguageRoute object or null if not found
 */
export function getLanguageRouteByPrefix(prefix: string): LanguageRoute | null {
  return LANGUAGE_ROUTES.find(lang => lang.urlPrefix === prefix) || null;
}

/**
 * Get language route by language code
 * @param code - The language code
 * @returns LanguageRoute object or null if not found
 */
 function getLanguageRouteByCode(code: string): LanguageRoute | null {
  return LANGUAGE_ROUTES.find(lang => lang.code === code) || null;
}
