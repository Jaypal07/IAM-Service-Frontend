import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = 'http://3.110.155.78.nip.io:8080';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;
  
  // Reconstruct the full path
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  const targetUrl = `${BACKEND_URL}/api/v1/${apiPath}`;
  
  // Forward query parameters
  const url = new URL(targetUrl);
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'path' && value) {
      url.searchParams.append(key, Array.isArray(value) ? value[0] : value);
    }
  });

  try {
    // Prepare headers to forward
    const forwardHeaders: Record<string, string> = {
      host: new URL(BACKEND_URL).host,
    };

    // Forward relevant headers from the original request
    const headersToForward = [
      'content-type',
      'authorization',
      'accept',
      'accept-language',
      'user-agent',
      'referer',
      'origin',
    ];

    headersToForward.forEach((header) => {
      const value = req.headers[header];
      if (value) {
        forwardHeaders[header] = Array.isArray(value) ? value[0] : value;
      }
    });

    // Forward cookies from browser to backend
    if (req.headers.cookie) {
      forwardHeaders.cookie = req.headers.cookie;
    }

    // Forward the request to backend
    const backendResponse = await fetch(url.toString(), {
      method: req.method,
      headers: forwardHeaders,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    // Forward response status
    res.status(backendResponse.status);

    // Forward response headers (including Set-Cookie)
    backendResponse.headers.forEach((value, key) => {
      // Special handling for Set-Cookie to preserve multiple values
      if (key.toLowerCase() === 'set-cookie') {
        res.setHeader(key, value);
      } else {
        res.setHeader(key, value);
      }
    });

    // Forward response body
    const contentType = backendResponse.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await backendResponse.json();
      res.json(data);
    } else {
      const data = await backendResponse.text();
      res.send(data);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy request failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
