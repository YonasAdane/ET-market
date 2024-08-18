import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@repo/database/src';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}
