import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

export interface FileValidatorOptions {
  optional?: boolean;
  allowedExtensions?: string[];
  maxSize?: number;
}


@Injectable()
export class FileValidatorPipe implements PipeTransform {
  private allowedExtensions: string[];
  private maxSize: number;
  private optional: boolean;

  constructor(options: FileValidatorOptions = {}) {
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

  transform(value?: {
    profile?: Express.Multer.File;
    cv?: Express.Multer.File;
    passportPhoto?: Express.Multer.File;
    selfiePhoto?: Express.Multer.File;
    businessLicenseFile?: Express.Multer.File;
  }): {
    profile?: Express.Multer.File;
    cv?: Express.Multer.File;
    passportPhoto?: Express.Multer.File;
    selfiePhoto?: Express.Multer.File;
    businessLicenseFile?: Express.Multer.File;
  } | null {
    if (!value) {
      if (this.optional) return null;
      throw new BadRequestException('No files uploaded');
    }

    const result: {
      profile?: Express.Multer.File;
      cv?: Express.Multer.File;
      passportPhoto?: Express.Multer.File;
      selfiePhoto?: Express.Multer.File;
      businessLicenseFile?: Express.Multer.File;
    } = {};

    // Handle profile field
    if (value.profile) {
      result.profile = this.validateFile(value.profile);
    }

    // Handle cv field
    if (value.cv) {
      result.cv = this.validateFile(value.cv);
    }

    // Handle passportPhoto field
    if (value.passportPhoto) {
      result.passportPhoto = this.validateFile(value.passportPhoto);
    }

    // Handle selfiePhoto field
    if (value.selfiePhoto) {
      result.selfiePhoto = this.validateFile(value.selfiePhoto);
    }

    // Handle businessLicenseFile field
    if (value.businessLicenseFile) {
      result.businessLicenseFile = this.validateFile(value.businessLicenseFile);
    }

    return result;
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
      throw new BadRequestException(`File type ${extension} is not supported`);
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File exceeds 20MB limit (received: ${(file.size / 1024 / 1024).toFixed(
          2
        )}MB)`
      );
    }

    return file;
  }
}
