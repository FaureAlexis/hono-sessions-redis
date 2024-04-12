import { Store, SessionData } from "hono-sessions";
import { Redis } from 'ioredis';

interface RedisStoreOptions {
  client: Redis;
  prefix?: string;
  ttl?: number;
}

export class RedisStoreAdapter implements Store {
  prefix: string;
  ttl: number;
  RedisClient: Redis;

  constructor(options: RedisStoreOptions) {
    this.prefix = options.prefix == null ? "session:" : options.prefix;
    this.ttl = options.ttl || 86400;
    this.RedisClient = options.client;
  }

  async getSessionById(sessionId: string): Promise<SessionData | null | undefined> {
    if (!sessionId) {
      return null;
    }
    const key = (this.prefix + sessionId).toString();
    const result = await this.RedisClient.get(key);
    if (result) {
      return JSON.parse(result);
    } else {
        return null;
    }
  }

  async createSession(sessionId: string, initialData: SessionData): Promise<void> {
    if (!sessionId) {
      return;
    }
    const key = (this.prefix + sessionId).toString();
    const ttl = this.ttl;
    await this.RedisClient.setex(key, ttl, JSON.stringify(initialData));
  }
  
  async deleteSession(sessionId: string): Promise<void> {
    const key = (this.prefix + sessionId).toString();
    await this.RedisClient.del(key);
  }

  async persistSessionData(sessionId: string, sessionData: SessionData): Promise<void> {
    if (!sessionId) {
      return;
    }
    const key = (this.prefix + sessionId).toString();
    const ttl = this.ttl;
    await this.RedisClient.setex(key, ttl, JSON.stringify(sessionData));
  }
}