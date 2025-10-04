export type BaseResponse<T = unknown> = {
  data: T;
  message: string | null;
  code: number | null;
};

export type PaginatedResponse<T> = BaseResponse<T[]> & {
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};
