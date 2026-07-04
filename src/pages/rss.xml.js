import rss from '@astrojs/rss';
import { site } from '../lib/site';

export function GET(context) {
  return rss({
    title: site.name,
    description:
      'Musings on software, systems, and occasionally random things.',
    site: context.site,
    items: [],
  });
}
