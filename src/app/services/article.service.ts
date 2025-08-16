import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ArticleCard {
  id: string;
  articleTitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  content?: string;
  categoryTitle?: string;
}

interface ArticleCategory {
  id: string;
  categoryTitle: string;
  cards: ArticleCard[];
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articlesSubject = new BehaviorSubject<ArticleCategory[]>([]);
  public articles$ = this.articlesSubject.asObservable();

  constructor() { }

  // Get all articles
  getArticles(): Observable<ArticleCategory[]> {
    return this.articles$;
  }

  // Set articles data
  setArticles(articles: ArticleCategory[]): void {
    this.articlesSubject.next(articles);
  }

  // Add new article
  addArticle(article: ArticleCard): void {
    const currentArticles = this.articlesSubject.value;
    const categoryIndex = currentArticles.findIndex(cat => cat.categoryTitle === article.categoryTitle);
    
    if (categoryIndex !== -1) {
      // Add to existing category
      currentArticles[categoryIndex].cards.push(article);
    } else {
      // Create new category
      const newCategory: ArticleCategory = {
        id: this.generateId(),
        categoryTitle: article.categoryTitle || 'Uncategorized',
        cards: [article]
      };
      currentArticles.push(newCategory);
    }
    
    this.articlesSubject.next([...currentArticles]);
  }

  // Update existing article
  updateArticle(articleId: string, updatedArticle: ArticleCard): void {
    const currentArticles = this.articlesSubject.value;
    
    // Find and remove the old article
    for (const category of currentArticles) {
      const articleIndex = category.cards.findIndex(card => card.id === articleId);
      if (articleIndex !== -1) {
        category.cards.splice(articleIndex, 1);
        break;
      }
    }

    // Add the updated article (potentially to a different category)
    const categoryIndex = currentArticles.findIndex(cat => cat.categoryTitle === updatedArticle.categoryTitle);
    
    if (categoryIndex !== -1) {
      currentArticles[categoryIndex].cards.push(updatedArticle);
    } else {
      const newCategory: ArticleCategory = {
        id: this.generateId(),
        categoryTitle: updatedArticle.categoryTitle || 'Uncategorized',
        cards: [updatedArticle]
      };
      currentArticles.push(newCategory);
    }

    this.articlesSubject.next([...currentArticles]);
  }

  // Delete article
  deleteArticle(articleId: string): void {
    const currentArticles = this.articlesSubject.value;
    
    for (let i = 0; i < currentArticles.length; i++) {
      const category = currentArticles[i];
      const articleIndex = category.cards.findIndex(card => card.id === articleId);
      
      if (articleIndex !== -1) {
        category.cards.splice(articleIndex, 1);
        
        // Remove category if it's empty
        if (category.cards.length === 0) {
          currentArticles.splice(i, 1);
        }
        break;
      }
    }
    
    this.articlesSubject.next([...currentArticles]);
  }

  // Get article by ID
  getArticleById(articleId: string): ArticleCard | null {
    const currentArticles = this.articlesSubject.value;
    
    for (const category of currentArticles) {
      const article = category.cards.find(card => card.id === articleId);
      if (article) {
        return article;
      }
    }
    
    return null;
  }

  // Get all category titles
  getCategoryTitles(): string[] {
    const currentArticles = this.articlesSubject.value;
    return currentArticles.map(category => category.categoryTitle);
  }

  // Generate unique ID
  private generateId(): string {
    return 'article_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }
}
