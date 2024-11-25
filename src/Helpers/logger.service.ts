import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%.log', // Log dosyalarının adı
          datePattern: 'YYYY-MM-DD', // Dosya isminin her gün değişmesi için tarih formatı
          zippedArchive: true, // Eski log dosyalarını sıkıştırmak
          maxSize: '30m', // Dosya boyutu sınırı
          maxFiles: '30d', // En fazla 30 gün log tutma
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
