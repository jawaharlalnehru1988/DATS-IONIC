import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Blog } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class IonicMetaService {

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  /**
   * Update meta tags for Ionic application with clean URLs
   */
  updateBlogMetaTags(blog: Blog): void {
    // Extract clean text from HTML content
    const description = this.extractTextFromHtml(blog.content);
    const truncatedDescription = description.length > 160 
      ? description.substring(0, 157) + '...' 
      : description;

    // Get current clean URL
    const currentUrl = this.getCleanUrl(blog._id!);
    
    // Ensure absolute image URL
    const imageUrl = this.getAbsoluteImageUrl(blog.blogImgUrl);

    // Update page title
    this.titleService.setTitle(`${blog.blogTitle} - Ask Hare Krishna`);

    // Clear and update meta tags
    this.updateAllMetaTags({
      title: blog.blogTitle,
      description: truncatedDescription,
      image: imageUrl,
      url: currentUrl,
      author: blog.author,
      category: blog.category
    });

    console.log('✅ Ionic Meta tags updated:', {
      title: blog.blogTitle,
      url: currentUrl,
      image: imageUrl
    });
  }

  private updateAllMetaTags(data: {
    title: string;
    description: string;
    image: string;
    url: string;
    author: string;
    category: string;
  }): void {
    
    // Basic meta tags
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'author', content: data.author });
    this.meta.updateTag({ name: 'keywords', content: `${data.category}, spiritual wisdom, Hare Krishna, ISKCON` });

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

    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: `${data.title} - Ask Hare Krishna` });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: data.title });

    // Article specific tags
    this.meta.updateTag({ property: 'article:author', content: data.author });
    this.meta.updateTag({ property: 'article:section', content: data.category });
    this.meta.updateTag({ property: 'article:published_time', content: new Date().toISOString() });

    // Add structured data
    this.addStructuredData(data);
  }

  private addStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"][data-blog]');
    if (existingScript) {
      existingScript.remove();
    }

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
      "author": {
        "@type": "Person",
        "name": data.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ask Hare Krishna",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg"
        }
      },
      "mainEntityOfPage": data.url,
      "articleSection": data.category
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-blog', 'true');
    script.textContent = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  private extractTextFromHtml(html: string): string {
    const tempDiv = this.document.createElement('div');
    tempDiv.innerHTML = html;
    return (tempDiv.textContent || tempDiv.innerText || '').replace(/\s+/g, ' ').trim();
  }

  private getCleanUrl(blogId: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/blog-details/${blogId}`;
  }

  private getAbsoluteImageUrl(imageUrl: string): string {
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `${window.location.origin}/${imageUrl.replace(/^\//, '')}`;
  }

  /**
   * Reset to default meta tags
   */
  resetToDefaults(): void {
    this.titleService.setTitle('Ask Hare Krishna - Spiritual Wisdom & Guidance');
    
    this.meta.updateTag({ name: 'description', content: 'Explore spiritual wisdom through articles on Hare Krishna philosophy, Bhagavad Gita teachings, and ISKCON principles.' });
    this.meta.updateTag({ property: 'og:title', content: 'Ask Hare Krishna - Spiritual Wisdom & Guidance' });
    this.meta.updateTag({ property: 'og:description', content: 'Explore spiritual wisdom through articles on Hare Krishna philosophy, Bhagavad Gita teachings, and ISKCON principles.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: window.location.origin });

    // Remove blog-specific structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"][data-blog]');
    if (existingScript) {
      existingScript.remove();
    }
  }
}
