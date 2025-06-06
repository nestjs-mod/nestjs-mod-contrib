export class FakePrismaClient {
  fakeClient = true;

  constructor(options: any) {
    // null
  }

  $on() {
    // null
  }
  async $connect() {
    // null
  }
  async $disconnect() {
    // null
  }
  async $queryRaw() {
    // null
  }
  async $executeRaw() {
    // null
  }
  async $queryRawUnsafe() {
    // null
  }
  async $executeRawUnsafe() {
    // null
  }
  async $transaction() {
    // null
  }

  $use() {
    // null
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $extends: any;
}

// need for use it as default PrismaClient when we don't have generated client
export { FakePrismaClient as PrismaClient };
