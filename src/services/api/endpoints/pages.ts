import apiClient from '../client';
import {
  Page,
  PageFilter,
  CreatePageDto,
  UpdatePageDto,
  PaginatedResponse
} from '../types';

/**
 * Pages API service
 * Handles all content page-related API calls including CRUD, filtering, and pagination
 */
class PagesApiService {
  private baseUrl = '/pages';
  
  /**
   * Get all pages with optional filtering and pagination
   */
  public async getPages(filters?: PageFilter): Promise<PaginatedResponse<Page>> {
    // Convert filters to query params
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await apiClient.get<PaginatedResponse<Page>>(`${this.baseUrl}${queryString}`);
    return response.data;
  }
  
  /**
   * Get a single page by ID
   */
  public async getPageById(id: string): Promise<Page> {
    const response = await apiClient.get<Page>(`${this.baseUrl}/${id}`);
    return response.data;
  }
  
  /**
   * Get a page by slug
   */
  public async getPageBySlug(slug: string): Promise<Page> {
    const response = await apiClient.get<Page>(`${this.baseUrl}/by-slug/${slug}`);
    return response.data;
  }
  
  /**
   * Get homepage content
   */
  public async getHomepage(): Promise<Page> {
    const response = await apiClient.get<Page>(`${this.baseUrl}/homepage`);
    return response.data;
  }
  
  /**
   * Create a new page
   */
  public async createPage(pageData: CreatePageDto): Promise<Page> {
    const response = await apiClient.post<Page>(this.baseUrl, pageData);
    return response.data;
  }
  
  /**
   * Update an existing page
   */
  public async updatePage(id: string, pageData: UpdatePageDto): Promise<Page> {
    const response = await apiClient.put<Page>(`${this.baseUrl}/${id}`, pageData);
    return response.data;
  }
  
  /**
   * Delete a page
   */
  public async deletePage(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
  }
  
  /**
   * Set page as homepage
   */
  public async setAsHomepage(id: string): Promise<Page> {
    const response = await apiClient.patch<Page>(`${this.baseUrl}/${id}/set-homepage`);
    return response.data;
  }
  
  /**
   * Update page status (published, draft)
   */
  public async updatePageStatus(id: string, status: 'published' | 'draft'): Promise<Page> {
    const response = await apiClient.patch<Page>(`${this.baseUrl}/${id}/status`, { status });
    return response.data;
  }
  
  /**
   * Check if a slug is available (not used by another page)
   */
  public async checkSlugAvailability(slug: string, excludeId?: string): Promise<{ available: boolean }> {
    const queryParams = excludeId ? `?excludeId=${excludeId}` : '';
    const response = await apiClient.get<{ available: boolean }>(`${this.baseUrl}/check-slug/${slug}${queryParams}`);
    return response.data;
  }
  
  /**
   * Generate a slug from a title
   */
  public async generateSlug(title: string): Promise<{ slug: string }> {
    const response = await apiClient.post<{ slug: string }>(`${this.baseUrl}/generate-slug`, { title });
    return response.data;
  }
}

// Create singleton instance
const pagesApi = new PagesApiService();
export default pagesApi;
