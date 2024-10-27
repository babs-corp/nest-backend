import { Inject, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Store, SessionData } from 'express-session';
import { ClsService } from 'nestjs-cls';
import { AxiosRequestConfig } from 'axios';

import dotenv from 'dotenv';
dotenv.config();

export class SessionService extends Store {
  private ttl = 0;

  constructor(
    @Inject(USER_AGENT) private userAgent: HttpService,
    private cls: ClsService,
  ) {
    super();
    this.ttl = Number(process.env.MAX_AGE_IN_DAYS) * 24 * 60 * 60; // in ms
  }

  async destroy(sid: string, callback: (err: any) => void) {
    Logger.warn('SessionService - destroy', sid);
    let error: any;
    callback(error);
  }

  async get(sid: string, callback: (err: any, session: SessionData) => void) {
    Logger.debug('SessionService - get', sid);
    let error: any;
    let cookie: any;

    try {
      const { options } = this.agentParams(sid);
      const { data } = await this.userAgent.axiosRef.get('/session', options);

      cookie = JSON.parse(data?.data || '{"originalMaxAge": null}');

      this.cls.set('userId', data?.userId || null);
      this.cls.set('sid', sid);
    } catch (err: any) {
      error = err;
    }

    Logger.debug('SessionService - get - data', cookie);

    callback(error, { cookie });
  }

  async set(sid: string, session: SessionData, callback: (err: any) => void) {
    Logger.debug('SessionService - set', sid);
    let error: any;
    const { data, options } = this.agentParams(sid, session);

    try {
      await this.userAgent.axiosRef.post('/session', data, options);
    } catch (err: any) {
      error = err;
    }

    callback(error);
  }

  private agentParams(sid: string, session?: SessionData) {
    const options: AxiosRequestConfig = { headers: { sid }};

    const data = {
      ttl: this.ttl,
      data: JSON.stringify(session?.cookie || {}),
    }

    return { options, data };
  }
}