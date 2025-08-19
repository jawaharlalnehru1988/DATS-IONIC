import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Blog } from './blog.service';

export interface BlogMetaData {
  title: string;
  description: string;
  image: string;
  url: string;
  author?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SSRMetaService {

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Update meta tags for server-side rendering
   */
  updateBlogMetaTags(blog: Blog): void {
    // Extract clean text from HTML content
    const description = this.extractTextFromHtml(blog.content);
    const truncatedDescription = description.length > 160 
      ? description.substring(0, 157) + '...' 
      : description;

    // Get current URL (works in both browser and server)
    const currentUrl = this.getCurrentUrl(blog._id!);
    
    // Ensure absolute image URL
    const imageUrl = this.getAbsoluteImageUrl(blog.blogImgUrl);

    const metaData: BlogMetaData = {
      title: blog.blogTitle,
      description: truncatedDescription,
      image: imageUrl,
      url: currentUrl,
      author: blog.author,
      category: blog.category
    };

    this.setMetaTags(metaData);
  }

  /**
   * Pre-render meta tags for SSR (called early in the component lifecycle)
   */
  preRenderBlogMeta(blogId: string, title?: string): void {
    // Set basic meta tags early for faster SSR
    if (title) {
      this.titleService.setTitle(`${title} - Ask Hare Krishna`);
    }
    
    // Set basic Open Graph URL early
    const currentUrl = this.getCurrentUrl(blogId);
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    
    console.log('🚀 Pre-rendered basic meta tags for blog:', blogId);
  }

  private setMetaTags(data: BlogMetaData): void {
    // Update page title
    this.titleService.setTitle(`${data.title} - Ask Hare Krishna`);

    // Clear existing meta tags first
    this.clearPreviousMetaTags();

    // Basic meta tags
    this.meta.addTag({ name: 'description', content: data.description });
    this.meta.addTag({ name: 'author', content: data.author || 'Ask Hare Krishna' });
    this.meta.addTag({ name: 'keywords', content: `${data.category}, spiritual wisdom, Hare Krishna, ISKCON, Bhagavad Gita` });

    // Open Graph meta tags
    this.meta.addTag({ property: 'og:title', content: `${data.title} - Ask Hare Krishna` });
    this.meta.addTag({ property: 'og:description', content: data.description });
    this.meta.addTag({ property: 'og:image', content: data.image });
    this.meta.addTag({ property: 'og:image:width', content: '1200' });
    this.meta.addTag({ property: 'og:image:height', content: '630' });
    this.meta.addTag({ property: 'og:image:alt', content: data.title });
    this.meta.addTag({ property: 'og:url', content: data.url });
    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:site_name', content: 'Ask Hare Krishna' });
    this.meta.addTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card meta tags
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:title', content: `${data.title} - Ask Hare Krishna` });
    this.meta.addTag({ name: 'twitter:description', content: data.description });
    this.meta.addTag({ name: 'twitter:image', content: data.image });
    this.meta.addTag({ name: 'twitter:image:alt', content: data.title });
    this.meta.addTag({ name: 'twitter:creator', content: '@AskHareKrishna' });

    // Article-specific meta tags
    this.meta.addTag({ property: 'article:author', content: data.author || 'Ask Hare Krishna Team' });
    this.meta.addTag({ property: 'article:section', content: data.category || 'Spiritual Wisdom' });
    this.meta.addTag({ property: 'article:published_time', content: new Date().toISOString() });
    this.meta.addTag({ property: 'article:tag', content: data.category || 'spiritual' });

    // Add structured data for SEO
    this.addStructuredData(data);

    // Force refresh meta tags for better social media compatibility
    this.forceMetaRefresh();

    console.log('✅ SSR Meta tags updated for:', data.title);
    console.log('📄 Page title set to:', `${data.title} - Ask Hare Krishna`);
    console.log('🔗 URL set to:', data.url);
    console.log('🖼️ Image set to:', data.image);
  }

  private clearPreviousMetaTags(): void {
    // Remove existing meta tags to avoid duplicates using proper Angular Meta service methods
    const metaTagsToRemove = [
      { name: 'description' },
      { name: 'author' },
      { name: 'keywords' },
      { property: 'og:title' },
      { property: 'og:description' },
      { property: 'og:image' },
      { property: 'og:image:width' },
      { property: 'og:image:height' },
      { property: 'og:image:alt' },
      { property: 'og:url' },
      { property: 'og:type' },
      { name: 'twitter:title' },
      { name: 'twitter:description' },
      { name: 'twitter:image' },
      { name: 'twitter:image:alt' },
      { property: 'article:author' },
      { property: 'article:section' },
      { property: 'article:published_time' },
      { property: 'article:tag' }
    ];

    metaTagsToRemove.forEach(tag => {
      this.meta.removeTag(tag.name ? `name="${tag.name}"` : `property="${tag.property}"`);
    });

    // Also manually remove from DOM to be extra sure
    if (typeof window !== 'undefined') {
      const existingMetas = this.document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"], meta[name="author"], meta[name="keywords"]');
      existingMetas.forEach(meta => {
        if (meta.parentNode) {
          meta.parentNode.removeChild(meta);
        }
      });
    }

    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"][data-blog-meta]');
    if (existingScript) {
      existingScript.remove();
    }
  }

  private addStructuredData(data: BlogMetaData): void {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "image": {
        "@type": "ImageObject",
        "url": data.image,
        "width": 1200,
        "height": 630
      },
      "url": data.url,
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": data.author || "Ask Hare Krishna Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ask Hare Krishna",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg",
          "width": 600,
          "height": 315
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": data.url
      },
      "articleSection": data.category || "Spiritual Wisdom",
      "keywords": `${data.category}, spiritual, Hare Krishna, ISKCON, Bhagavad Gita`
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog-meta', 'true');
    script.textContent = JSON.stringify(structuredData, null, 2);
    
    // Add to head
    this.document.head.appendChild(script);
  }

  private extractTextFromHtml(html: string): string {
    if (typeof window === 'undefined') {
      // Server-side: simple HTML tag removal
      return html.replace(/<[^>]*>/g, ' ')
                 .replace(/\s+/g, ' ')
                 .trim();
    } else {
      // Client-side: use DOM parser
      const tempDiv = this.document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    }
  }

  private getCurrentUrl(blogId: string): string {
    if (typeof window !== 'undefined') {
      // Client-side - use current URL
      return window.location.href;
    } else {
      // Server-side fallback - construct the proper URL
      return `https://askharekrishna.com/blog-details/${blogId}`;
    }
  }

  private getAbsoluteImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If relative URL, make it absolute
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/${imageUrl.replace(/^\//, '')}`;
    } else {
      // Server-side fallback
      return `https://askharekrishna.com/${imageUrl.replace(/^\//, '')}`;
    }
  }

  /**
   * Force refresh of meta tags in the DOM
   * This helps with social media crawlers that might cache meta tags
   */
  private forceMetaRefresh(): void {
    if (typeof window !== 'undefined') {
      // Add a timestamp to force refresh
      const timestamp = new Date().getTime();
      this.meta.addTag({ property: 'og:updated_time', content: new Date().toISOString() });
      
      // Force browser to re-evaluate meta tags
      setTimeout(() => {
        // Trigger a DOM refresh by briefly modifying the document title
        const currentTitle = this.document.title;
        this.document.title = currentTitle + ' ';
        setTimeout(() => {
          this.document.title = currentTitle;
        }, 10);
      }, 50);
      
      console.log('🔄 Meta tags force refreshed at:', timestamp);
    }
  }

  /**
   * Reset to default meta tags
   */
  resetToDefaults(): void {
    this.titleService.setTitle('Ask Hare Krishna - Spiritual Wisdom & Guidance');
    
    this.clearPreviousMetaTags();
    
    this.meta.addTag({ name: 'description', content: 'Explore spiritual wisdom through our comprehensive collection of articles, insights, and guidance on Hare Krishna philosophy, Bhagavad Gita teachings, and ISKCON principles.' });
    this.meta.addTag({ property: 'og:title', content: 'Ask Hare Krishna - Spiritual Wisdom & Guidance' });
    this.meta.addTag({ property: 'og:description', content: 'Explore spiritual wisdom through our comprehensive collection of articles, insights, and guidance on Hare Krishna philosophy.' });
    this.meta.addTag({ property: 'og:image', content: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg' });
    this.meta.addTag({ property: 'og:type', content: 'website' });
    this.meta.addTag({ property: 'og:site_name', content: 'Ask Hare Krishna' });
    
    console.log('🔄 Reset to default meta tags');
  }

  /**
   * Debug method to check current meta tags in DOM
   */
  debugCurrentMetaTags(): void {
    if (typeof window !== 'undefined') {
      console.log('🔍 Current meta tags in DOM:');
      console.log('Title:', this.document.title);
      
      const metas = this.document.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"], meta[name="description"]');
      metas.forEach(meta => {
        const property = meta.getAttribute('property') || meta.getAttribute('name');
        const content = meta.getAttribute('content');
        console.log(`  ${property}: ${content}`);
      });
    }
  }
}
