import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './upload.controller';
import { multerConfig } from 'src/config/multer.config';
import { UploadService } from './upload.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MulterModule.registerAsync({
    //   useFactory: multerConfig.useFactory,
    //   inject: [ConfigService],
    // }),
  ],
  providers: [
    UploadService
  ],
  controllers: [FilesController],
})
export class FilesModule {}
