declare namespace Express {
    export interface Request {
      token_data: any;
      bucket_file: {
        bucket: string;
        url: string;
        path: string;
      };
    }
  }
  