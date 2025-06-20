import { createServer, proxy } from 'aws-serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';


let cachedServer: any;

async function bootstrapServer(): Promise<any> {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();
    return createServer(expressApp);
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    return proxy(cachedServer, event, context, 'PROMISE').promise;
};
