type TParams = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
};

export async function getDataFromAPI<T>({
  url,
  method = 'GET',
  body,
}: TParams): Promise<T> {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const response = await fetch(url, {
    headers,
    method,
    body,
  });

  return await response.json();
}
