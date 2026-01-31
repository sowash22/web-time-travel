
export interface PopularSite {
  id: string;
  name: string;
  url: string;
  icon: string;
  startYear: number;
}

export interface NavigationState {
  currentUrl: string;
  currentYear: number;
  isLoading: boolean;
}
