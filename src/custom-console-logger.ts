import { ConsoleLogger, LogLevel} from '@nestjs/common';
import { CustomLogger } from './winston-logger';

export class CustomConsoleLogger extends ConsoleLogger {
    private readonly logger = CustomLogger;

    log(message: any, context?: string) {
        super.log(message, context);
        this.logger.info(message, { context });
    }

    error(message: any, trace?: string, context?: string) {
        super.error(message, trace, context);
        this.logger.error(message, { trace, context });
    }

    warn(message: any, context?: string) {
        super.warn(message, context);
        this.logger.warn(message, { context });
    }

    debug(message: any, context?: string) {
        super.debug(message, context);
        this.logger.debug(message, { context });
    }

    verbose(message: any, context?: string) {
        super.verbose(message, context);
        this.logger.verbose(message, { context });
    }
}
