
import { PopularSite } from './types';

export const MIN_YEAR = 1995;
export const MAX_YEAR = 2026;

export const POPULAR_SITES: PopularSite[] = [
  { id: 'google', name: 'Google', url: 'google.com', icon: '🔍', startYear: 1998 },
  { id: 'apple', name: 'Apple', url: 'apple.com', icon: '🍎', startYear: 1996 },
  { id: 'amazon', name: 'Amazon', url: 'amazon.com', icon: '📦', startYear: 1995 },
  { id: 'facebook', name: 'Facebook', url: 'facebook.com', icon: '💙', startYear: 2004 },
  { id: 'youtube', name: 'YouTube', url: 'youtube.com', icon: '📺', startYear: 2005 },
  { id: 'nyt', name: 'NY Times', url: 'nytimes.com', icon: '📰', startYear: 1996 },
  { id: 'netflix', name: 'Netflix', url: 'netflix.com', icon: '🍿', startYear: 1997 },
  { id: 'yahoo', name: 'Yahoo', url: 'yahoo.com', icon: '🟣', startYear: 1995 },
  { id: 'wikipedia', name: 'Wikipedia', url: 'wikipedia.org', icon: '🌐', startYear: 2001 },
  { id: 'ebay', name: 'eBay', url: 'ebay.com', icon: '💰', startYear: 1995 },
];
