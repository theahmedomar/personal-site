import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../lib/site';

export async function GET(context) {
  const articles = (await getCollection('articles'))
    .filter((a) => !a.data.draft)
    .sort((a, b) => b.data.pubDate - a.data.pubDate);

  return rss({
    title: site.name,
    description:
      'Musings on software, systems, and occasionally random things.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/writing/${a.id}/`,
      categories: a.data.tags,
    })),
  });
}
