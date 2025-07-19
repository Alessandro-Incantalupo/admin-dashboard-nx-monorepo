export type BaseResponse<T = unknown> = {
  data: T;
  message: string | null;
  code: number | null;
};
