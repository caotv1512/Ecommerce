import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION');
    if (!region) {
      throw new Error('AWS_REGION is missing');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('S3_SECRET_KEY'),
      },
    });
  }

  async upload(fileName: string, file: Buffer) {
    const uploadParams = {
      Bucket: this.configService.get<string>('S3_BUCKET'),
      Key: fileName,
      Body: file,
      ContentType: 'image/jpeg',
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);

      const encodedFileName = encodeURIComponent(fileName);
      const fileUrl = `https://${uploadParams.Bucket}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${encodedFileName}`;
      return fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async uploadMultiple(files: Array<{ fileName: string, file: Buffer }>) {
    const uploadPromises = files.map(file => this.upload(file.fileName, file.file));
    return Promise.all(uploadPromises);
  }
}
