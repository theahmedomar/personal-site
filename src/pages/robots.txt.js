export async function GET(context) {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', context.site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
