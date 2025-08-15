import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogService, Blog } from '../services/blog.service';
import { DynamicMetaService } from '../services/dynamic-meta.service';

@Injectable({
  providedIn: 'root'
})
export class BlogMetaResolver implements Resolve<Blog | null> {

  constructor(
    private blogService: BlogService,
    private dynamicMetaService: DynamicMetaService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Blog | null> {
    const blogId = route.paramMap.get('id');
    
    if (!blogId) {
      this.dynamicMetaService.resetToDefaults();
      return of(null);
    }

    // Check if meta data is passed via query params (for social media crawlers)
    const queryParams = route.queryParams;
    if (queryParams['title'] && queryParams['description'] && queryParams['image']) {
      // Use query params for immediate meta tag update (for social crawlers)
      this.dynamicMetaService.updateMetaTags({
        title: queryParams['title'] + ' - DATS',
        description: queryParams['description'],
        image: queryParams['image'],
        type: 'article',
        siteName: 'DATS'
      });
    }

    // Fetch the actual blog data
    return this.blogService.getBlogs().pipe(
      map(blogs => {
        const blog = blogs.find(b => b._id === blogId);
        if (blog) {
          // Update meta tags with actual blog data
          this.dynamicMetaService.updateBlogMetaTags(blog);
          return blog;
        }
        return null;
      }),
      catchError(error => {
        console.error('Error in BlogMetaResolver:', error);
        this.dynamicMetaService.resetToDefaults();
        return of(null);
      })
    );
  }
}
