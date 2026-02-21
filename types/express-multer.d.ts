import 'express';

declare global {
  namespace Express {
    interface MulterFile {
      /** Original file name */
      originalname: string;
      /** Encoding type */
      encoding: string;
      /** Mime type */
      mimetype: string;
      /** Buffer of file */
      buffer: Buffer;
      /** Size in bytes */
      size: number;
      /** Field name in form */
      fieldname: string;
      /** Optional path info if saved to disk */
      destination?: string;
      filename?: string;
      path?: string;
    }

    // Optional convenience alias
    type Multer = { File: MulterFile };
  }
}
