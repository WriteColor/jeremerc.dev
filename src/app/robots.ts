import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/error-test'],
    },
    sitemap: 'https://jeremerc.site/sitemap.xml',
  };
}
