# hono-sessions-redis

Redis session store-connector to work with [hono-sessions](https://github.com/jcs224/hono_sessions)
This repo is a fork of [connect-redis-hono](https://github.com/crossunit/connect-redis-hono)
## Installation

```sh
$ pnpm add hono-sessions-redis
```


## Usage

```js
import { Hono } from "hono";
import { sessionMiddleware } from "hono-sessions";
import { RedisStoreAdapter } from "hono-sessions-redis";

// ...
// create your RedisClient and connect to your redis server
// ...

const store = new RedisStoreAdapter({
prefix: "AppPrefix:", 
ttl: 3600, // seconds
client: RedisClient, 
});

const app = new Hono();

app.use(sessionMiddleware({
    store, // pass your store
    // ...other session options    
}));

app.get("/", (ctx) => {
    return ctx.text("Session data stored on Redis");
});

export default {
    port: 3000,
    fetch: app.fetch,
  };
  
```

## Redis client
As of right now this package is only compatible with [ioredis](https://www.npmjs.com/package/ioredis).