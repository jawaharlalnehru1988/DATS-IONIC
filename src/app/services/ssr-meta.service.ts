import { Injectable, Inject, Optional } from '@angular/core';
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

  private setMetaTags(data: BlogMetaData): void {
    // Update page title
    this.titleService.setTitle(`${data.title} - Ask Hare Krishna`);

    // Clear existing meta tags
    this.clearPreviousMetaTags();

    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'author', content: data.author || 'Ask Hare Krishna' });
    this.meta.updateTag({ name: 'keywords', content: `${data.category}, spiritual wisdom, Hare Krishna, ISKCON, Bhagavad Gita` });

    // Open Graph meta tags
    this.meta.updateTag({ property: 'og:title', content: `${data.title} - Ask Hare Krishna` });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: data.title });
    this.meta.updateTag({ property: 'og:url', content: data.url });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Ask Hare Krishna' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: `${data.title} - Ask Hare Krishna` });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: data.title });
    this.meta.updateTag({ name: 'twitter:creator', content: '@AskHareKrishna' });

    // Article-specific meta tags
    this.meta.updateTag({ property: 'article:author', content: data.author || 'Ask Hare Krishna Team' });
    this.meta.updateTag({ property: 'article:section', content: data.category || 'Spiritual Wisdom' });
    this.meta.updateTag({ property: 'article:published_time', content: new Date().toISOString() });
    this.meta.updateTag({ property: 'article:tag', content: data.category || 'spiritual' });

    // Add structured data for SEO
    this.addStructuredData(data);

    console.log('✅ SSR Meta tags updated for:', data.title);
  }

  private clearPreviousMetaTags(): void {
    // Remove existing meta tags to avoid duplicates
    const metaTagsToRemove = [
      'name="description"',
      'name="author"',
      'name="keywords"',
      'property="og:title"',
      'property="og:description"',
      'property="og:image"',
      'property="og:image:width"',
      'property="og:image:height"',
      'property="og:image:alt"',
      'property="og:url"',
      'property="og:type"',
      'property="og:site_name"',
      'property="og:locale"',
      'name="twitter:card"',
      'name="twitter:title"',
      'name="twitter:description"',
      'name="twitter:image"',
      'name="twitter:image:alt"',
      'name="twitter:creator"',
      'property="article:author"',
      'property="article:section"',
      'property="article:published_time"',
      'property="article:tag"'
    ];

    metaTagsToRemove.forEach(selector => {
      this.meta.removeTag(selector);
    });

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
      // Client-side
      return window.location.href;
    } else {
      // Server-side fallback - use your production domain
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
   * Reset to default meta tags
   */
  resetToDefaults(): void {
    this.titleService.setTitle('Ask Hare Krishna - Spiritual Wisdom & Guidance');
    
    this.clearPreviousMetaTags();
    
    this.meta.updateTag({ name: 'description', content: 'Explore spiritual wisdom through our comprehensive collection of articles, insights, and guidance on Hare Krishna philosophy, Bhagavad Gita teachings, and ISKCON principles.' });
    this.meta.updateTag({ property: 'og:title', content: 'Ask Hare Krishna - Spiritual Wisdom & Guidance' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore spiritual wisdom through our comprehensive collection of articles, insights, and guidance on Hare Krishna philosophy.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Ask Hare Krishna' });
  }
}
