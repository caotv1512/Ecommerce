// src/upload/multer.config.ts
import { ConfigService } from '@nestjs/config';
import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';

export const multerConfig = {
  useFactory: (configService: ConfigService) => ({
    storage: multerS3({
      s3: new AWS.S3({
        accessKeyId: configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: configService.get<string>('S3_SECRET_KEY'),
        region: configService.get<string>('AWS_REGION'),
      }),
      bucket: configService.get<string>('S3_BUCKET'),
      acl: 'public-read', // Tệp sẽ được truy cập công khai
      contentType: multerS3.AUTO_CONTENT_TYPE, // Tự động xác định loại nội dung
      key: (req, file, cb) => {
        cb(null, `${Date.now().toString()}-${file.originalname}`);
      },
    }),
  }),
  inject: [ConfigService],
};
