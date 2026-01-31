
/**
 * Constructs a Wayback Machine URL for a specific year and site.
 * We use Jan 1st as the target date for simplicity.
 */
export const getWaybackUrl = (url: string, year: number): string => {
  // Normalize URL
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http')) {
    cleanUrl = `http://${cleanUrl}`;
  }
  
  // Format: https://web.archive.org/web/[timestamp]/[url]
  // Timestamp: YYYYMMDDHHMMSS
  const timestamp = `${year}0101000000`;
  return `https://web.archive.org/web/${timestamp}/${cleanUrl}`;
};

/**
 * Validates a URL and ensures it doesn't have common protocols prepended twice.
 */
export const validateUrl = (url: string): string => {
  let processed = url.trim().toLowerCase();
  processed = processed.replace(/^https?:\/\//, '');
  processed = processed.replace(/^www\./, '');
  return processed;
};
