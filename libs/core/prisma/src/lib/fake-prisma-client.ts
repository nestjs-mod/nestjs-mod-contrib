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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}
