export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const [, credentials] = basicAuth.split(' ');
    const [user, password] = atob(credentials).split(':');
    if (user === 'admin' && password === process.env.SITE_PASSWORD) {
      return new Response(null, { status: 200 });
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = {
  matcher: '/(.*)',
  runtime: 'edge',
};
