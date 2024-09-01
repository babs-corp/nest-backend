import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Request, Response } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private startTime = Date.now();

  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.getArgByIndex<Request>(0);

    this.requestMessage(request);

    context.getArgByIndex(1).on('close', () => {
      this.responseMessage(request, context.getArgByIndex<Response>(1).statusCode);
    });

    this.debugMessage(context, true);

    return next
      .handle()
      .pipe(
        tap(() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const res = context.switchToHttp().getResponse();
        }),
        catchError((err) =>
          throwError(() => {
            const { method, url } = request;
            let msg = `ERR [${method}] ${url} | ${err} `;

            if(err?.response?.message) {
              const errText = err.response.message.join?.(', ') || err.response.message;
              msg += `| Message: "${errText}"`;
            }

            this.logger.error(msg);

            return err;
          }),
        ),
      )
      .pipe(tap(() => this.debugMessage(context)));
  }

  private requestMessage({ url, method, query, body }: Request) {
    let message = `Request [${method}] ${url}`;

    if(query && Object.keys(query)[0]) {
      message += ` | PARAMS: ${JSON.stringify(query)}`;
    }

    if(body && Object.keys(body)[0]) {
      message += ` | BODY: ${JSON.stringify(body)}`;
    }

    this.logger.log(message);
  }

  private responseMessage({ url, method }: Request, code: number) {
    this.logger.log(`Response [${method}] ${url} (status: ${code})`);
  }

  private debugMessage(context: ExecutionContext, isStartMessage?: boolean) {
    const message = `${context.getClass().name} - ${context.getHandler().name} - `;

    if(isStartMessage) {
      this.startTime = Date.now();
      this.logger.debug(`${message}start...`);
    } else {
      this.logger.debug(`${message}end after ${Date.now() - this.startTime} ms`);
    }
  }
}