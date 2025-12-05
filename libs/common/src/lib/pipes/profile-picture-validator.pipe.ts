import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class ProfilePictureValidatorPipe implements PipeTransform {
  private readonly allowedExtensions = ['.png', '.jpeg', '.jpg'];
  private readonly maxSize = 5 * 1024 * 1024; // 5MB

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) {
      throw new BadRequestException('Profile picture is required');
    }

    if (!file.originalname) {
      throw new BadRequestException('Invalid file structure');
    }

    const normalizedOriginalName = Buffer.from(
      file.originalname,
      'binary',
    ).toString();
    const extension = extname(normalizedOriginalName).toLowerCase();

    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `File type ${extension} is not supported. Only PNG, JPEG, and JPG files are allowed.`,
      );
    }

    if (file.size > this.maxSize) {
      throw new BadRequestException(
        `File exceeds 5MB limit (received: ${(file.size / 1024 / 1024).toFixed(2)}MB)`,
      );
    }

    return file;
  }
}
