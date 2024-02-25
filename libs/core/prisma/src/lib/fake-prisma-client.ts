export class FakePrismaClient {
  fakeClient = true;

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
