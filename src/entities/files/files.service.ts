import { join } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile, rm } from 'node:fs/promises';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as uuid from 'uuid';

const staticDirectory = join(__dirname, '..', '..', 'static');

@Injectable()
export class FilesService {
  async createFile(
    file: Express.Multer.File,
    directory: string,
  ): Promise<string> {
    try {
      const format = file.mimetype.split('/')[1];
      const fileName = uuid.v4() + '.' + format;
      const directoryPath = join(staticDirectory, directory);

      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }

      await writeFile(join(directoryPath, fileName), file.buffer, {
        flag: 'wx',
      });

      return fileName;
    } catch (error) {
      throw new InternalServerErrorException('File creating error');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    try {
      const path = join(staticDirectory, filePath);

      await rm(path);
    } catch (error) {
      throw new InternalServerErrorException('File deleting error');
    }
  }
}
