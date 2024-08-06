import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('files')
export class FilesController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return await this.uploadService.upload(file.originalname, file.buffer);
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // Giới hạn tối đa 10 tệp
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const fileUploadPromises = files.map((file) => ({
      fileName: file.originalname,
      file: file.buffer,
    }));

    const fileUrls =
      await this.uploadService.uploadMultiple(fileUploadPromises);
    return { urls: fileUrls };
  }
}
