import { readFileSync, writeFileSync } from 'node:fs';

const files2: string[] = [
  'libs/feature/notifications/src/lib/generated/prisma-client/internal/class.ts',
  'libs/feature/two-factor/src/lib/generated/prisma-client/internal/class.ts',
  'libs/feature/webhook/src/lib/generated/prisma-client/internal/class.ts',
];
for (let file of files2) {
  writeFileSync(
    file,
    readFileSync(file)
      .toString()
      .split('("@prisma/client/runtime')
      .join('("node_modules/@prisma/client/runtime')
      .split('require.resolve(')
      .join("(await import('node:path')).resolve(")
  );
}
