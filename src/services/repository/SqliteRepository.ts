import Sqlite, { Options } from "better-sqlite3";

import { Repository } from "./Repository";

const TEMP_TABLE = "test";

export class SqliteRepository extends Repository {
  constructor(
    dbFileURI: string,
    dbOptions: Options = {},
    private readonly db = new Sqlite(dbFileURI, dbOptions)
  ) {
    super();
    this.createTable();
  }

  protected createTable(table = TEMP_TABLE): void {
    try {
      this.db.exec(`CREATE TABLE IF NOT EXISTS ${table} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL
      )`);
    } catch (error) {
      console.error(error);
    }
  }

  insert<T extends Record<string, any>>(data: T, table = TEMP_TABLE): boolean {
    try {
      const [colNames, valNames] = this.stringifyColumnValueNames(data);
      return (
        this.db
          .prepare(`INSERT INTO ${table} (${colNames}) VALUES (${valNames})`)
          .run(data).changes > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private stringifyColumnValueNames(
    data: Record<string, any>
  ): [string, string] {
    const colNames = Object.keys(data);
    return [colNames.join(", "), colNames.map((name) => `@${name}`).join(", ")];
  }

  readById<T>(key: string, table = TEMP_TABLE): T | void {
    try {
      return this.db.prepare(`SELECT * FROM ${table} WHERE key=?`).get(key);
    } catch (error) {
      console.error(error);
      return;
    }
  }

  readAll<T = {}>(table = TEMP_TABLE): T[] {
    try {
      return this.db.prepare(`SELECT * FROM ${table}`).all();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  delete(key?: string, table = TEMP_TABLE): boolean {
    try {
      return (
        (key
          ? this.db.prepare(`DELETE FROM ${table} WHERE key=@key`).run({ key })
          : this.db.prepare(`DELETE FROM ${table}`).run()
        ).changes > 0
      );
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const sqliteRepository = new SqliteRepository(`${TEMP_TABLE}.sqlite`);
