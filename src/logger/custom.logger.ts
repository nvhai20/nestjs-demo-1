import { Logger } from '@nestjs/common';

export class LoggerService extends Logger {
  error(message: string, trace: string) {
    // Send stack trace to chatwork, or some others logic
    super.error(message, trace);
  }
}
