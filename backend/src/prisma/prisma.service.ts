import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Fix for Supabase Transaction Pooler (prepared statement already exists)
    const url = (process.env.DATABASE_URL || '').trim();
    let finalUrl = url;

    if (url && url.includes('supabase')) {
      if (!url.includes('pgbouncer=true') && url.includes('6543')) {
        finalUrl += url.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
      }
    }

    super({
      datasources: {
        db: {
          url: finalUrl,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
