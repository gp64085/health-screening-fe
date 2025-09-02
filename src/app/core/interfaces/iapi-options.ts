import type { HttpParams } from '@angular/common/http';

export interface IApiOptions {
  headers?: {
    [key: string]: string;
  };
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
}
