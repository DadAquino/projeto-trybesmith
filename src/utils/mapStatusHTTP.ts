export default function mapStatusHTTP(status: string): number {
  const statusHTTPMap: Record<string, number> = {
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    OK: 201,
    CREATED: 201,
  };
  return statusHTTPMap[status] ?? 500;
}