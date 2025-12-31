import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

export interface SingleFileValidatorOptions {
  optional?: boolean;
  allowedExtensions?: string[];
  maxSize?: number;
}

@Injectable()
export class SingleFileValidatorPipe implements PipeTransform {
  private allowedExtensions: string[];
  private maxSize: number;
  private optional: boolean;

  constructor(options: SingleFileValidatorOptions = {}) {
    this.allowedExtensions = options.allowedExtensions || [
      '.png',
      '.jpeg',
      '.jpg',
      '.pdf',
      '.docx',
    ];
    this.maxSize = options.maxSize || 5 * 1024 * 1024; // 5MB default
    this.optional = options.optional || false;
  }

  transform(file: Express.Multer.File): Express.Multer.File | null {
    if (!file) {
      if (this.optional) return null;
      throw new BadRequestException('No file uploaded');
    }

    return this.validateFile(file);
  }

  private validateFile(file: Express.Multer.File): Express.Multer.File {
    if (!file || !file.originalname) {
      throw new BadRequestException('Invalid file structure.');
    }

    const normalizedOriginalName = Buffer.from(
      file.originalname,
      'binary'
    ).toString();
    const extension = extname(normalizedOriginalName).toLowerCase();

    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `File type ${extension} is not supported. Allowed types: ${this.allowedExtensions.join(
          ', '
        )}`
      );
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File exceeds ${(this.maxSize / 1024 / 1024).toFixed(
          0
        )}MB limit (received: ${(file.size / 1024 / 1024).toFixed(2)}MB)`
      );
    }

    return file;
  }
}
