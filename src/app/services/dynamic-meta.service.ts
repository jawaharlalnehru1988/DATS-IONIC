import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

interface MetaTagsData {
  title: string;
  description: string;
  image: string;
  url?: string;
  type?: string;
  siteName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DynamicMetaService {

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateMetaTags(data: MetaTagsData) {
    // Update page title
    this.titleService.setTitle(data.title);

    // Clear existing meta tags
    this.clearMetaTags();

    // Ensure absolute URL for image
    let imageUrl = data.image;
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = window.location.origin + '/' + imageUrl.replace(/^\//, '');
    }

    const currentUrl = data.url || window.location.href;
    const description = data.description.length > 160 
      ? data.description.substring(0, 157) + '...' 
      : data.description;

    // Basic meta tags
    this.meta.addTag({ name: 'description', content: description });
    this.meta.addTag({ name: 'robots', content: 'index,follow' });

    // Open Graph tags
    this.meta.addTag({ property: 'og:title', content: data.title });
    this.meta.addTag({ property: 'og:description', content: description });
    this.meta.addTag({ property: 'og:image', content: imageUrl });
    this.meta.addTag({ property: 'og:image:width', content: '1200' });
    this.meta.addTag({ property: 'og:image:height', content: '630' });
    this.meta.addTag({ property: 'og:image:alt', content: data.title });
    this.meta.addTag({ property: 'og:url', content: currentUrl });
    this.meta.addTag({ property: 'og:type', content: data.type || 'article' });
    this.meta.addTag({ property: 'og:site_name', content: data.siteName || 'DATS' });

    // Twitter Card tags
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:title', content: data.title });
    this.meta.addTag({ name: 'twitter:description', content: description });
    this.meta.addTag({ name: 'twitter:image', content: imageUrl });
    this.meta.addTag({ name: 'twitter:image:alt', content: data.title });

    // Additional social media tags
    this.meta.addTag({ property: 'article:author', content: 'DATS Team' });
    this.meta.addTag({ property: 'article:published_time', content: new Date().toISOString() });

    // Add structured data for better SEO
    this.addStructuredData(data, imageUrl, currentUrl);

    console.log('✅ Dynamic meta tags updated:', {
      title: data.title,
      description: description.substring(0, 50) + '...',
      image: imageUrl,
      url: currentUrl
    });
  }

  private clearMetaTags() {
    // Remove existing meta tags
    const tagsToRemove = [
      'name="description"',
      'property="og:title"',
      'property="og:description"',
      'property="og:image"',
      'property="og:image:width"',
      'property="og:image:height"',
      'property="og:image:alt"',
      'property="og:url"',
      'property="og:type"',
      'property="og:site_name"',
      'name="twitter:card"',
      'name="twitter:title"',
      'name="twitter:description"',
      'name="twitter:image"',
      'name="twitter:image:alt"',
      'property="article:author"',
      'property="article:published_time"'
    ];

    tagsToRemove.forEach(selector => {
      this.meta.removeTag(selector);
    });

    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
  }

  private addStructuredData(data: MetaTagsData, imageUrl: string, currentUrl: string) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": data.title,
      "description": data.description,
      "image": imageUrl,
      "url": currentUrl,
      "author": {
        "@type": "Organization",
        "name": "DATS"
      },
      "publisher": {
        "@type": "Organization",
        "name": "DATS",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg"
        }
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString()
    };

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  // Method to update meta tags specifically for blog articles
  updateBlogMetaTags(blog: any) {
    // Extract text content from HTML
    const tempDiv = this.document.createElement('div');
    tempDiv.innerHTML = blog.content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    this.updateMetaTags({
      title: `${blog.blogTitle} - DATS`,
      description: textContent.substring(0, 160),
      image: blog.blogImgUrl,
      type: 'article',
      siteName: 'DATS'
    });
  }

  // Reset to default meta tags
  resetToDefaults() {
    this.updateMetaTags({
      title: 'Ask Hare Krishna - DATS',
      description: 'Explore spiritual wisdom through our comprehensive collection of articles and insights.',
      image: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751699516/sitting_and_smiling_tcfzdw.jpg',
      type: 'website',
      siteName: 'DATS'
    });
  }
}
