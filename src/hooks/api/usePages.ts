import { useCallback, useEffect } from 'react';
import { useApi, usePaginatedApi } from './useApi';
import pagesApi from '../../services/api/endpoints/pages';
import { Page, PageFilter, CreatePageDto, UpdatePageDto, PaginatedResponse } from '../../services/api/types';

// Default filter values
const defaultFilters: PageFilter = {
  page: 1,
  limit: 10,
  sortBy: 'updatedAt',
  sortOrder: 'desc',
};

/**
 * Hook for fetching pages with pagination and filtering
 */
export function usePages(initialFilters?: Partial<PageFilter>) {
  const filters = { ...defaultFilters, ...initialFilters };
  
  return usePaginatedApi<PaginatedResponse<Page>, PageFilter>(
    pagesApi.getPages.bind(pagesApi),
    filters
  );
}

/**
 * Hook for fetching a single page by ID
 */
export function usePage(id?: string) {
  const { data, isLoading, error, execute } = useApi(
    pagesApi.getPageById.bind(pagesApi),
    !!id,
    id ? [id] : undefined as any
  );

  const refresh = useCallback(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  // Refetch when ID changes
  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [id, execute]);

  return {
    page: data as Page | null,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for fetching a page by slug
 */
export function usePageBySlug(slug?: string) {
  const { data, isLoading, error, execute } = useApi(
    pagesApi.getPageBySlug.bind(pagesApi),
    !!slug,
    slug ? [slug] : undefined as any
  );

  const refresh = useCallback(() => {
    if (slug) {
      execute(slug);
    }
  }, [slug, execute]);

  // Refetch when slug changes
  useEffect(() => {
    if (slug) {
      execute(slug);
    }
  }, [slug, execute]);

  return {
    page: data as Page | null,
    isLoading,
    error,
    refresh,
  };
}

/**
 * Hook for fetching homepage content
 */
export function useHomepage() {
  const { data, isLoading, error, execute } = useApi(
    pagesApi.getHomepage.bind(pagesApi),
    true,
    []
  );

  return {
    homepage: data as Page | null,
    isLoading,
    error,
    refresh: execute,
  };
}

/**
 * Hook for creating a new page
 */
export function useCreatePage() {
  const { isLoading, error, execute } = useApi<Page, [CreatePageDto]>(
    pagesApi.createPage.bind(pagesApi)
  );

  return {
    createPage: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for updating an existing page
 */
export function useUpdatePage(id?: string) {
  const { isLoading, error, execute } = useApi<Page, [string, UpdatePageDto]>(
    pagesApi.updatePage.bind(pagesApi)
  );

  const updatePage = useCallback(
    async (pageData: UpdatePageDto) => {
      if (!id) {
        throw new Error('Page ID is required');
      }
      return execute(id, pageData);
    },
    [id, execute]
  );

  return {
    updatePage,
    isLoading,
    error,
  };
}

/**
 * Hook for deleting a page
 */
export function useDeletePage() {
  const { isLoading, error, execute } = useApi<void, [string]>(
    pagesApi.deletePage.bind(pagesApi)
  );

  return {
    deletePage: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for setting a page as homepage
 */
export function useSetAsHomepage() {
  const { isLoading, error, execute } = useApi<Page, [string]>(
    pagesApi.setAsHomepage.bind(pagesApi)
  );

  return {
    setAsHomepage: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for updating page status
 */
export function useUpdatePageStatus() {
  const { isLoading, error, execute } = useApi<Page, [string, 'published' | 'draft']>(
    pagesApi.updatePageStatus.bind(pagesApi)
  );

  return {
    updateStatus: execute,
    isLoading,
    error,
  };
}

/**
 * Hook for checking if a slug is available
 */
export function useCheckSlugAvailability() {
  const { data, isLoading, error, execute } = useApi<{ available: boolean }, [string, string | undefined]>(
    pagesApi.checkSlugAvailability.bind(pagesApi)
  );

  const checkSlug = useCallback(
    (slug: string, excludeId?: string) => {
      return execute(slug, excludeId);
    },
    [execute]
  );

  return {
    checkSlug,
    isAvailable: data?.available ?? false,
    isLoading,
    error,
  };
}

/**
 * Hook for generating a slug from a title
 */
export function useGenerateSlug() {
  const { data, isLoading, error, execute } = useApi<{ slug: string }, [string]>(
    pagesApi.generateSlug.bind(pagesApi)
  );

  return {
    generateSlug: execute,
    slug: data?.slug,
    isLoading,
    error,
  };
}
