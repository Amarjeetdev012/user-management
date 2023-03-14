declare namespace Express {
    export interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      token_data: any;
      bucket_file: {
        bucket: string;
        url: string;
        path: string;
      };
    }
  }
  