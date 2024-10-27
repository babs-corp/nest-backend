import { NestMiddleware } from "@nestjs/common";
import session, { SessionOptions } from "express-session";
import { v4 as uuid4 } from 'uuid';

import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { SessionService } from "./session.service";

export class SessionMiddleware implements NestMiddleware {
  private defaultOptions: Partial<SessionOptions> = {
    resave: false,
    rolling: true,
    saveUninitialized: true,
    genid(req: Request) {
      return req || uuid4(); // TODO fix req.sessionID
    }
  }

  private session: RequestHandler;

  constructor(store: SessionService) {
    const secret = ''; // from env
    const secure = false; // from env
    const httpOnly = false; // from env

    const cookie = { httpOnly, secure };
    this.session = session({ ...this.defaultOptions, cookie, secret, store });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.session(req, res, next);
  }
}