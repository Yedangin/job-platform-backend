import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ParseFilePipeDocument implements PipeTransform {
  private readonly allowedExtensions = [
    '.png',
    '.jpeg',
    '.jpg',
    '.pdf',
    '.mp4',
    '.mov',
    '.mkv',
  ];
  private readonly maxSize = 20 * 1024 * 1024; // 20MB

  constructor(private readonly optional = false) {}

  transform(value?: {
    images?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
    content?: Express.Multer.File[];
  }): {
    images?: Express.Multer.File[];
    thumbnail?: Express.Multer.File[];
    content?: Express.Multer.File[];
  } | null {
    if (!value) {
      if (this.optional) return null;
      throw new BadRequestException('No files uploaded');
    }

    const result: {
      images?: Express.Multer.File[];
      thumbnail?: Express.Multer.File[];
      content?: Express.Multer.File[];
    } = {};

    // Handle images field
    if (value.images && value.images.length > 0) {
      result.images = this.validateFiles(value.images);
    }

    // Handle thumbnail field
    if (value.thumbnail && value.thumbnail.length > 0) {
      result.thumbnail = this.validateFiles(value.thumbnail);
    }

    // Handle content field (for .pdf files)
    if (value.content && value.content.length > 0) {
      result.content = this.validateFiles(value.content);
    }

    // Check if any files were processed
    if (!result.images && !result.thumbnail && !result.content) {
      if (this.optional) return null;
      throw new BadRequestException('No valid files uploaded');
    }

    return result;
  }

  private validateFiles(files: Express.Multer.File[]): Express.Multer.File[] {
    return files.map((file) => {
      if (!file || !file.originalname) {
        throw new BadRequestException('Invalid file structure.');
      }
      const normalizedOriginalName = Buffer.from(
        file.originalname,
        'binary',
      ).toString();
      const extension = extname(normalizedOriginalName).toLowerCase();

      if (!this.allowedExtensions.includes(extension)) {
        throw new BadRequestException(
          `File type ${extension} is not supported`,
        );
      }

      if (file.size > this.maxSize) {
        throw new BadRequestException(
          `File exceeds 20MB limit (received: ${(file.size / 1024 / 1024).toFixed(2)}MB)`,
        );
      }

      return file;
    });
  }
}
