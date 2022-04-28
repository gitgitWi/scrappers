export class Repository {
  protected createTable(_table?: string): any {
    throw new Error(`NEED TO IMPLEMENT`);
  }

  readById(_id: string): any {
    throw new Error(`NEED TO IMPLEMENT`);
  }

  readAll(): any {
    throw new Error(`NEED TO IMPLEMENT`);
  }

  insert(_data: any): any {
    throw new Error(`NEED TO IMPLEMENT`);
  }

  delete(_key?: string): boolean {
    throw new Error(`NEED TO IMPLEMENT`);
  }
}
