import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const [regular, bold] = await Promise.all([
  readFile('./src/og/fonts/PTSerif-Regular.ttf'),
  readFile('./src/og/fonts/PTSerif-Bold.ttf'),
]);

const C = {
  bg: '#fcfbf8',
  accent: '#2f7d4f',
  ink: '#1a1816',
  muted: '#6d685f',
  faint: '#a09a8f',
};

function card(title: string, description: string) {
  const row = (children: unknown, style: object) => ({
    type: 'div',
    props: { style: { display: 'flex', ...style }, children },
  });

  return row(
    [
      row('Ahmed Omar · Writing', {
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: 6,
        textTransform: 'uppercase',
        color: C.accent,
      }),
      row(
        [
          row(title, {
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            color: C.ink,
          }),
          row(description, {
            fontSize: 34,
            lineHeight: 1.4,
            color: C.muted,
            marginTop: 28,
          }),
        ],
        { flexDirection: 'column' },
      ),
      row(
        [
          {
            type: 'div',
            props: {
              style: {
                width: 16,
                height: 16,
                backgroundColor: C.accent,
                transform: 'rotate(45deg)',
                marginRight: 16,
              },
            },
          },
          row('theahmedomar.com', { fontSize: 26, color: C.faint }),
        ],
        { alignItems: 'center' },
      ),
    ],
    {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: C.bg,
      padding: '66px 72px',
      borderLeft: `20px solid ${C.accent}`,
      fontFamily: 'PT Serif',
    },
  );
}

export async function getStaticPaths() {
  const articles = await getCollection(
    'articles',
    ({ data }) => (import.meta.env.PROD ? !data.draft : true) && !data.ogImage,
  );
  return articles.map((a) => ({
    params: { slug: a.id },
    props: { title: a.data.title, description: a.data.description },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { title, description } = props as {
    title: string;
    description: string;
  };
  const svg = await satori(card(title, description), {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'PT Serif', data: regular, weight: 400, style: 'normal' },
      { name: 'PT Serif', data: bold, weight: 700, style: 'normal' },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
