import { createCookieSessionStorage } from '@remix-run/node';

export const sessionStore = createCookieSessionStorage({
  cookie: {
    name: process.env.SESSION_NAME || '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET || 'E919649C3DE566D92F8E73FBD5DED'],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const { getSession, commitSession, destroySession } = sessionStore;

export const getCurrentSession = (request: Request) => {
  const cookie = request.headers.get('cookie');
  return getSession(cookie);
};
