import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/Helpers/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, headers } = req;
    const timestamp = new Date().toISOString();

    res.on('finish', () => {
      const isError = res.statusCode >= 400;

      const logMessage: any = {
        time: timestamp,
        method: method,
        url: originalUrl,
        status: res.statusCode,
        body: body,
        query: query,
        headers: {
          'user-agent': headers['user-agent'],
          accept: headers['accept'],
        },
      };

      if (isError) {
        // Hata bilgilerini ekliyoruz
        const errorDetails = {
          message: res.statusMessage || 'No status message',
          stack: res.locals?.exception?.stack || 'No stack trace available',
          error: res.locals?.exception?.message || 'Unknown error',
          // İstekle ilgili diğer detayları ekleyebiliriz
          ip: req.ip || 'Unknown IP', // İstek yapan IP adresi
          userAgent: req.headers['user-agent'] || 'Unknown User Agent', // Kullanıcı ajanı
          referer: req.headers['referer'] || 'No Referer', // Referans başlığı
        };

        logMessage.errorDetails = errorDetails;
        this.logger.error(JSON.stringify(logMessage));
      } else {
        this.logger.log(JSON.stringify(logMessage));
      }

      // Log mesajını dosyaya yazıyoruz
    });

    next();
  }
}
