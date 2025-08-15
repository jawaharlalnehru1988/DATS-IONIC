import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LanguageService, SupportedLanguage } from './language.service';
import { getUrlPrefixFromLanguage } from '../models/language-routes.model';

export interface BlogComment {
  userName: string;
  comment: string;
}

export interface Blog {
  _id?: string; // Optional for new blogs
  blogTitle: string;
  blogImgUrl: string;
  content: string;
  author: string;
  category: string; // Added category field
  comments: BlogComment[];
  createdAt?: string; // Optional, might be added by backend
  updatedAt?: string; // Optional, might be added by backend
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogsSubject = new BehaviorSubject<Blog[]>([]);
  public blogs$ = this.blogsSubject.asObservable();

  // Language code to full name mapping for API URLs
  private languageMapping: Record<SupportedLanguage, string> = {
    'en': '', // Default/English - no suffix needed
    'ta': 'tamil',
    'hi': 'hindi', 
    'bn': 'bengali',
    'te': 'telugu',
    'mr': 'marathi',
    'gu': 'gujarati',
    'kn': 'kannada',
    'ml': 'malayalam'
  };

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    this.loadBlogs();
    
    // Subscribe to language changes and reload blogs
    this.languageService.currentLanguage$.subscribe(() => {
      this.loadBlogs();
    });
  }

  // Get dynamic API URL based on current language
  private getApiUrl(): string {
    const currentLanguage = this.languageService.getCurrentLanguage();
    const languageSuffix = this.languageMapping[currentLanguage];
    
    if (languageSuffix) {
      return `${environment.apiNestBaseUrl}/blog/${languageSuffix}`;
    } else {
      // Default to English (no suffix)
      return `${environment.apiNestBaseUrl}/blog`;
    }
  }

  // Get API URL for specific language (useful for cross-language operations)
  private getApiUrlForLanguage(language: SupportedLanguage): string {
    const languageSuffix = this.languageMapping[language];
    
    if (languageSuffix) {
      return `${environment.apiNestBaseUrl}/blog/${languageSuffix}`;
    } else {
      return `${environment.apiNestBaseUrl}/blog`;
    }
  }

  // Get language suffix from URL prefix (for URL-based language detection)
  getLanguageFromUrlPrefix(urlPrefix: string): SupportedLanguage {
    // Map URL prefixes back to language codes
    const urlToLangMap: Record<string, SupportedLanguage> = {
      '': 'en',        // Empty prefix = English
      'tamil': 'ta',
      'hindi': 'hi',
      'bengali': 'bn',
      'telugu': 'te',
      'marathi': 'mr',
      'gujarati': 'gu',
      'kannada': 'kn',
      'malayalam': 'ml'
    };
    
    return urlToLangMap[urlPrefix] || 'en';
  }

  // Load all blogs from backend
  loadBlogs(): void {
    const apiUrl = this.getApiUrl();
    console.log('📚 BlogService - Loading blogs from:', apiUrl);
    
    this.http.get<Blog[]>(apiUrl).pipe(
      catchError(error => {
        console.error('Error loading blogs:', error);
        // Fallback to empty array if backend is not available
        return throwError(() => error);
      })
    ).subscribe({
      next: (blogs) => {
        this.blogsSubject.next(blogs);
      },
      error: (error) => {
        console.error('Failed to load blogs from backend:', error);
        // You can load default/fallback data here if needed
        this.blogsSubject.next([]);
      }
    });
  }

  // Get all blogs
  getBlogs(): Observable<Blog[]> {
    return this.blogs$;
  }

  // Get blog by ID
  getBlogById(id: string): Observable<Blog | undefined> {
    return new Observable(observer => {
      this.blogs$.subscribe(blogs => {
        const blog = blogs.find(b => b._id === id);
        observer.next(blog);
        observer.complete();
      });
    });
  }

  // Add new blog
  addBlog(blog: Blog): Observable<Blog> {
    const apiUrl = this.getApiUrl();
    console.log('📝 BlogService.addBlog() - Attempting to create blog:', blog.blogTitle, 'at:', apiUrl);
    
    return this.http.post<Blog>(apiUrl, blog).pipe(
      catchError(error => {
        console.error('❌ BlogService.addBlog() - Error adding blog:', error);
        console.error('❌ BlogService.addBlog() - Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        return throwError(() => error);
      })
    );
  }

  // Update existing blog
  updateBlog(id: string, blog: Blog): Observable<Blog> {
    const apiUrl = this.getApiUrl();
    console.log('✏️ BlogService.updateBlog() - Attempting to update blog:', id, blog.blogTitle, 'at:', apiUrl);
    
    return this.http.patch<Blog>(`${apiUrl}/${id}`, blog).pipe(
      catchError(error => {
        console.error('❌ BlogService.updateBlog() - Error updating blog:', error);
        console.error('❌ BlogService.updateBlog() - Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        return throwError(() => error);
      })
    );
  }

  // Delete blog
  deleteBlog(id: string): Observable<void> {
    const apiUrl = this.getApiUrl();
    console.log('🗑️ BlogService.deleteBlog() - Attempting to delete blog:', id, 'from:', apiUrl);
    
    return this.http.delete<void>(`${apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting blog:', error);
        return throwError(() => error);
      })
    );
  }

  // Add comment to blog
  addComment(blogId: string, comment: BlogComment): Observable<Blog> {
    const apiUrl = this.getApiUrl();
    console.log('💬 BlogService.addComment() - Adding comment to blog:', blogId, 'at:', apiUrl);
    
    return this.http.post<Blog>(`${apiUrl}/post/${blogId}/comments`, comment).pipe(
      catchError(error => {
        console.error('Error adding comment:', error);
        return throwError(() => error);
      })
    );
  }

  // Refresh blogs from server
  refreshBlogs(): void {
    this.loadBlogs();
  }
}
