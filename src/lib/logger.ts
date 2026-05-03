type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private format(level: LogLevel, message: string, data?: Record<string, unknown>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    };
  }

  private log(entry: LogEntry) {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;

    switch (entry.level) {
      case 'debug':
        if (!this.isProduction) console.debug(prefix, entry.message, entry.data || '');
        break;
      case 'info':
        console.info(prefix, entry.message, entry.data || '');
        break;
      case 'warn':
        console.warn(prefix, entry.message, entry.data || '');
        break;
      case 'error':
        console.error(prefix, entry.message, entry.data || '');
        break;
    }
  }

  debug(message: string, data?: Record<string, unknown>) {
    this.log(this.format('debug', message, data));
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log(this.format('info', message, data));
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log(this.format('warn', message, data));
  }

  error(message: string, data?: Record<string, unknown>) {
    this.log(this.format('error', message, data));
  }
}

export const logger = new Logger();