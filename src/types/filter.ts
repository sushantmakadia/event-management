export interface Props {
  filterType: string;
  filterCategory: string;
  startDate: string;
  endDate: string;
  updateQueryParam: (key: string, value: string) => void;
  clearAllQueryParams: () => void; 
  onClose: () => void;
}

export interface FilterState {
  type: string;
  category: string;
  start: string;
  end: string;
}

export interface FilterContextProps extends FilterState {
  setFilterParam: (key: string, value: string) => void;
  clearFilters: () => void;
}