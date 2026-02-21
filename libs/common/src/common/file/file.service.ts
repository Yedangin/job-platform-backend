import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private storageType: string;
  private localFolder: string;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    // Read flat environment variables
    this.storageType =
      this.configService.get<string>('FILE_STORAGE_TYPE') || 'local';
    this.localFolder =
      this.configService.get<string>('FILE_LOCAL_FOLDER') || './uploads';
    this.baseUrl = this.configService.get<string>('FILE_LOCAL_BASE_URL') || '';

    // Ensure local folder exists
    if (this.storageType === 'local' && !existsSync(this.localFolder)) {
      mkdirSync(this.localFolder, { recursive: true });
    }
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    if (this.storageType === 'local') {
      const filename = `${uuidv4()}-${file.originalname}`;
      const filePath = join(this.localFolder, filename);

      // Save file to local folder
      writeFileSync(filePath, file.buffer);

      // Return URL that can be saved in DB
      return `${this.baseUrl}/${filename}`;
    }

    // Future: cloud storage logic here (AWS S3, GCP, etc.)
    throw new Error('Only local storage implemented for now.');
  }
}
