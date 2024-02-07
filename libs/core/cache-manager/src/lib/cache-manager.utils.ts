export function redisUrlParse(url: string) {
  const parsedURL = new URL(url);
  return {
    host: parsedURL.hostname,
    port: Number(parsedURL.port),
    database: parsedURL.pathname.substr(1) || '0',
    password: parsedURL.password ? decodeURIComponent(parsedURL.password) : null,
  };
}
