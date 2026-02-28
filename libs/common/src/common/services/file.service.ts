import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export enum FileCategory {
  PROFILES = 'profiles',
  PRODUCTS = 'products',
}

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);
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
    category: FileCategory,
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
    category: FileCategory = FileCategory.PROFILES,
  ): Promise<string> {
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
    category: FileCategory = FileCategory.PROFILES,
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
      // 파일이 존재하지 않을 수 있음 / File might not exist, which is fine
      this.logger.warn(`파일 삭제 실패 / Could not delete file: ${filePath}`);
    }
  }

  async deleteMultipleFiles(filePaths: string[]): Promise<void> {
    for (const filePath of filePaths) {
      await this.deleteFile(filePath);
    }
  }
}
