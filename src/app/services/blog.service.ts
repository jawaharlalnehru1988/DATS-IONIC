import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  comments: BlogComment[];
  createdAt?: string; // Optional, might be added by backend
  updatedAt?: string; // Optional, might be added by backend
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly API_URL = environment.apiNestBaseUrl + '/blog';
  private blogsSubject = new BehaviorSubject<Blog[]>([]);
  public blogs$ = this.blogsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadBlogs();
  }

  // Load all blogs from backend
  loadBlogs(): void {
    this.http.get<Blog[]>(this.API_URL).pipe(
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
    console.log('📝 BlogService.addBlog() - Attempting to create blog:', blog.blogTitle);
    return this.http.post<Blog>(this.API_URL, blog).pipe(
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
    console.log('✏️ BlogService.updateBlog() - Attempting to update blog:', id, blog.blogTitle);
    return this.http.patch<Blog>(`${this.API_URL}/${id}`, blog).pipe(
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
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting blog:', error);
        return throwError(() => error);
      })
    );
  }

  // Add comment to blog
  addComment(blogId: string, comment: BlogComment): Observable<Blog> {
    return this.http.post<Blog>(`${this.API_URL}/${blogId}/comments`, comment).pipe(
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
