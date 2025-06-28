export interface ErrorType {
  error: { message: string; error: string; statusCode: number };
}

export interface ICommonResponse {
  id: string;
  createDate: string;
  updateDate: string;
}

export interface IMeta {
  itemsPerPage?: number;
  totalItems: number;
  currentPage?: number;
  totalPages: number;
  nextPage: number;
  previoudPage: number;
  hasNextPage: boolean;
}
