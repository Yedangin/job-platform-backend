import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export enum FileCategory {
  PROFILES = 'profiles',
  CVS = 'cvs',
  PASSPORT_PHOTOS = 'passport-photos',
  SELFIE_PHOTOS = 'selfie-photos',
  BUSINESS_LICENSES = 'business-licenses',
}

@Injectable()
export class FileService {
  private readonly baseUploadPath = join(process.cwd(), 'uploads');

  constructor() {
    this.ensureBaseUploadDirectoryExists();
  }

  private async ensureBaseUploadDirectoryExists(): Promise<void> {
    try {
      await fs.access(this.baseUploadPath);
    } catch {
      await fs.mkdir(this.baseUploadPath, { recursive: true });
    }
  }

  private async ensureUploadDirectoryExists(
    category: FileCategory
  ): Promise<void> {
    const uploadPath = join(this.baseUploadPath, category);
    try {
      await fs.access(uploadPath);
    } catch {
      await fs.mkdir(uploadPath, { recursive: true });
    }
  }

  async saveFile(
    file: Express.Multer.File,
    category: FileCategory = FileCategory.PROFILES
  ): Promise<string> {
    if (!file || !file.originalname) {
      throw new Error('Invalid file: file or originalname is undefined');
    }

    await this.ensureUploadDirectoryExists(category);

    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const uploadPath = join(this.baseUploadPath, category);
    const filePath = join(uploadPath, fileName);

    await fs.writeFile(filePath, file.buffer);
    return `uploads/${category}/${fileName}`;
  }

  async saveMultipleFiles(
    files: Express.Multer.File[],
    category: FileCategory = FileCategory.PROFILES
  ): Promise<string[]> {
    const savedFiles: string[] = [];
    for (const file of files) {
      const filePath = await this.saveFile(file, category);
      savedFiles.push(filePath);
    }
    return savedFiles;
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const fullPath = join(process.cwd(), filePath);
      await fs.unlink(fullPath);
    } catch (error) {
      // File might not exist, which is fine
      console.warn(`Could not delete file: ${filePath}`, error);
    }
  }

  async deleteMultipleFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      await this.deleteFile(filePath);
    }
  }
}
