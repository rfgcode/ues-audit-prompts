export default async function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const [, credentials] = basicAuth.split(' ');
    const [user, password] = atob(credentials).split(':');
    if (user === 'ues' && password === process.env.SITE_PASSWORD) {
      return; // ← this tells Vercel to go ahead and serve your HTML file normally
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
