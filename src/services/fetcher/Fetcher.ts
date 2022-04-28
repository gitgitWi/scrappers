import { request } from "undici";

export class Fetcher {
  constructor(private readonly fetch = request) {}

  protected async get<T>(paths: string): Promise<T | false> {
    try {
      return this.fetch(paths).then(({ statusCode, body }) => {
        if (statusCode >= 400) return false;
        return body.json();
      });
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
