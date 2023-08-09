import { cssBundleHref } from '@remix-run/css-bundle';
import type {
  LoaderArgs,
  LinksFunction,
  ActionFunction,
  ActionArgs,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';

import globalStyles from '~/styles/global.css';
import { createThemeCookie, getThemeFromCookie } from '~/lib/theme.server';
import { ThemeProvider } from '~/components/theme-provider';
import { Header } from '~/components/header';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export async function loader({ request }: LoaderArgs) {
  const theme = await getThemeFromCookie(request);
  return json({
    theme,
  });
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const { theme = 'system' } = await request.json();
  return createThemeCookie(request, theme);
};

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Remix shadcn/ui Dark theme Demo App' },
    {
      property: 'og:title',
      content: 'Remix shadcn/ui Dark theme Demo App',
    },
    {
      property: 'og:image',
      content: '/assets/preview-dark.png',
    },
    {
      name: 'description',
      content:
        'Remix shadcn/ui Dark theme Demo App to showcase the Dark theme toggle feature and reference for documentation',
    },
    {
      name: 'og:description',
      content:
        'Remix shadcn/ui Dark theme Demo App to showcase the Dark theme toggle feature and reference for documentation',
    },
    {
      name: 'og:url',
      content: 'https://remix-shadcn-ui-dark-theme-demo.vercel.app/',
    },

    {
      property: 'twitter:title',
      content: 'Remix shadcn/ui Dark theme Demo App',
    },
    {
      property: 'twitter:image',
      content: '/assets/preview-dark.png',
    },
    {
      property: 'twitter:card',
      content: '/assets/preview-dark.png',
    },
  ];
};

export default function App() {
  const { theme = 'system' } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const onThemeChange = (theme: string) => {
    submit({ theme }, { method: 'post', encType: 'application/json' });
  };
  return (
    <html lang="en" className={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <ThemeProvider defaultTheme={theme} onThemeChange={onThemeChange}>
          <Header />
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
