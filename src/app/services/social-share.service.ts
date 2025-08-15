import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class SocialShareService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private languageService: LanguageService
  ) {}

  /**
   * Generate clean shareable URL with language prefix (except for English)
   */
  generateShareableUrl(blog: any): string {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'https://askharekrishna.com';
    
    // Get current language prefix
    const currentLangPrefix = this.languageService.getCurrentLanguagePrefix();
    
    // Generate language-aware URL
    if (currentLangPrefix) {
      // Non-English language with prefix
      return `${baseUrl}/${currentLangPrefix}/blog-details/${blog._id}`;
    } else {
      // English (no prefix)
      return `${baseUrl}/blog-details/${blog._id}`;
    }
  }

  /**
   * Share blog on WhatsApp
   */
  shareOnWhatsApp(blog: any): void {
    const shareableUrl = this.generateShareableUrl(blog);
    const text = `${blog.blogTitle}\n\n${this.extractTextFromHtml(blog.content).substring(0, 100)}...\n\n`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + shareableUrl)}`;
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Share blog on Facebook
   */
  shareOnFacebook(blog: any): void {
    const shareableUrl = this.generateShareableUrl(blog);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`;
    window.open(facebookUrl, '_blank');
  }

  /**
   * Share blog on Twitter
   */
  shareOnTwitter(blog: any): void {
    const shareableUrl = this.generateShareableUrl(blog);
    const text = `${blog.blogTitle}\n\n${this.extractTextFromHtml(blog.content).substring(0, 100)}...`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableUrl)}`;
    window.open(twitterUrl, '_blank');
  }

  /**
   * Copy shareable URL to clipboard
   */
  async copyToClipboard(blog: any): Promise<boolean> {
    try {
      const shareableUrl = this.generateShareableUrl(blog);
      await navigator.clipboard.writeText(shareableUrl);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Generic share function using Web Share API (mobile)
   */
  async nativeShare(blog: any): Promise<boolean> {
    if (!navigator.share) {
      return false;
    }

    try {
      const shareableUrl = this.generateShareableUrl(blog);
      await navigator.share({
        title: blog.blogTitle,
        text: this.extractTextFromHtml(blog.content).substring(0, 100) + '...',
        url: shareableUrl
      });
      return true;
    } catch (error) {
      console.error('Native share failed:', error);
      return false;
    }
  }

  /**
   * Extract text content from HTML
   */
  private extractTextFromHtml(html: string): string {
    const tempDiv = this.document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
  }

  /**
   * Generate Open Graph meta tags HTML for embedding
   * This can be used for server-side rendering or dynamic injection
   */
  generateMetaTagsHtml(blog: any): string {
    const description = this.extractTextFromHtml(blog.content).substring(0, 160);
    const imageUrl = blog.blogImgUrl.startsWith('http') 
      ? blog.blogImgUrl 
      : `${window.location.origin}/${blog.blogImgUrl.replace(/^\//, '')}`;

    return `
<!-- Dynamic Open Graph Meta Tags -->
<meta property="og:title" content="${blog.blogTitle} - DATS" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:url" content="${window.location.href}" />
<meta property="og:type" content="article" />
<meta property="og:site_name" content="DATS" />

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${blog.blogTitle} - DATS" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${imageUrl}" />

<!-- Additional Meta Tags -->
<meta name="description" content="${description}" />
<meta name="author" content="${blog.author}" />
<meta name="keywords" content="${blog.category}, spiritual, hare krishna, dats" />
    `.trim();
  }
}
