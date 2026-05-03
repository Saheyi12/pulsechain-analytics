interface ArticleLDProps {
  title: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  authorName?: string;
  category?: string;
  tags?: string[];
}

export function ArticleLD({
  title,
  description,
  image,
  url,
  publishedAt,
  modifiedAt,
  authorName = 'PulseChain Analytics',
  category = 'Cryptocurrency',
  tags = [],
}: ArticleLDProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://pulsechain-analytics.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PulseChain Analytics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pulsechain-analytics.vercel.app/logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    about: {
      '@type': 'Thing',
      name: category,
    },
    keywords: tags.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}