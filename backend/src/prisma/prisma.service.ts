import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Fix for Supabase Transaction Pooler (prepared statement already exists)
    const url = process.env.DATABASE_URL;
    let finalUrl = url;

    if (url && (url.includes('6543') || url.includes('supabase'))) {
      if (!url.includes('pgbouncer=true')) {
        finalUrl += url.includes('?') ? '&pgbouncer=true' : '?pgbouncer=true';
      }
      // Also connection_limit=1 can help with serverless
      if (!finalUrl.includes('connection_limit')) {
        finalUrl += '&connection_limit=1';
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
