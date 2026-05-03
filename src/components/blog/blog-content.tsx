import { Badge } from '@/components/ui/badge';

interface BlogContentProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  content: string;
}

export function BlogContent({ title, category, date, readTime, author, content }: BlogContentProps) {
  return (
    <article>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="primary">{category}</Badge>
          <span className="text-sm text-gray-400">{date}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-400">{readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
            {author.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-sm">{author}</div>
            <div className="text-xs text-gray-400">AI Market Analyst</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 leading-relaxed">
          {/* Render content sections */}
          {content.split('\n## ').map((section, index) => {
            if (index === 0) {
              return (
                <div key={index} className="mb-6">
                  {section.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) {
                      return (
                        <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-white">
                          {line.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (line.startsWith('- **')) {
                      const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
                      if (match) {
                        return (
                          <div key={i} className="flex gap-2 py-1 text-sm">
                            <span className="font-semibold text-gray-200">{match[1]}:</span>
                            <span className="text-gray-400">{match[2]}</span>
                          </div>
                        );
                      }
                    }
                    if (line.startsWith('- ')) {
                      return (
                        <li key={i} className="text-gray-300 ml-4">{line.replace('- ', '')}</li>
                      );
                    }
                    if (line.startsWith('*')) {
                      return (
                        <p key={i} className="text-sm text-gray-500 italic my-2">{line.replace(/\*/g, '')}</p>
                      );
                    }
                    if (line.trim()) {
                      return (
                        <p key={i} className="text-gray-300 mb-3">{line}</p>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }
            return (
              <div key={index} className="mb-6">
                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">
                  {section.split('\n')[0]}
                </h2>
                {section.split('\n').slice(1).map((line, i) => {
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-white">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (line.startsWith('- **')) {
                    const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
                    if (match) {
                      return (
                        <div key={i} className="flex gap-2 py-1 text-sm">
                          <span className="font-semibold text-gray-200">{match[1]}:</span>
                          <span className="text-gray-400">{match[2]}</span>
                        </div>
                      );
                    }
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={i} className="text-gray-300 ml-4">{line.replace('- ', '')}</li>
                    );
                  }
                  if (line.startsWith('*')) {
                    return (
                      <p key={i} className="text-sm text-gray-500 italic my-2">{line.replace(/\*/g, '')}</p>
                    );
                  }
                  if (line.trim()) {
                    return (
                      <p key={i} className="text-gray-300 mb-3">{line}</p>
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400">
          <strong className="text-gray-300">Disclaimer:</strong> This article is for informational purposes only and does not constitute financial advice. Cryptocurrency trading carries significant risk. Always do your own research before making investment decisions.
        </p>
      </div>
    </article>
  );
}