const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  path: string,
  method: string,
  body?: any,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers = new Headers(options.headers);
  if (body && !(body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    method,
    headers,
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    throw new ApiError(
      errorData?.message || `HTTP error! status: ${response.status}`,
      response.status,
      errorData
    );
  }

  // Handle empty or 204 No Content responses safely
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, 'GET', undefined, options),
  post: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, 'POST', body, options),
  put: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, 'PUT', body, options),
  patch: <T>(path: string, body?: any, options?: RequestInit) => request<T>(path, 'PATCH', body, options),
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, 'DELETE', undefined, options),
};
