import { useEffect } from 'react';

/**
 * Sets the document title for the current page
 * @param title - The page title (will be appended with " | LS Tours" if not the home page)
 */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
