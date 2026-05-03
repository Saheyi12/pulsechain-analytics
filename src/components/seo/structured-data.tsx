interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'WebApplication';
  data?: Record<string, any>;
}

export function StructuredData({ type, data = {} }: StructuredDataProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  const schemas: Record<string, any> = {
    Organization: {
      ...baseData,
      name: 'PulseChain Analytics',
      url: 'https://pulsechain-analytics.vercel.app',
      logo: 'https://pulsechain-analytics.vercel.app/logo.svg',
      description: 'AI-powered cryptocurrency analytics platform with price predictions, portfolio tracking, and automated market insights.',
      sameAs: [
        'https://twitter.com/pulsechain',
        'https://github.com/pulsechain',
      ],
    },
    WebSite: {
      ...baseData,
      name: 'PulseChain Analytics',
      url: 'https://pulsechain-analytics.vercel.app',
      description: 'AI-Powered Crypto Market Intelligence',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://pulsechain-analytics.vercel.app/search?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    WebApplication: {
      ...baseData,
      name: 'PulseChain Analytics',
      url: 'https://pulsechain-analytics.vercel.app',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
    },
  };

  const schema = schemas[type] || { ...baseData, ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}