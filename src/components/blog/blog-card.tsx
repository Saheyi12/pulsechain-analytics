import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
  author?: string;
}

const categoryColors: Record<string, 'primary' | 'success' | 'purple' | 'warning' | 'danger'> = {
  'Market Analysis': 'primary',
  'DeFi': 'success',
  'Prediction': 'purple',
  'Tutorial': 'warning',
  'Technical': 'danger',
  'News': 'primary',
  'Analysis': 'success',
};

export function BlogCard({ slug, title, excerpt, category, date, readTime, image, author }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card hover className="overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center relative overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <span className="text-sm">PulseChain Blog</span>
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant={categoryColors[category] || 'default'}>
              {category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
            <span>{date}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-blue-400 transition">
            {title}
          </h3>

          <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
            {excerpt}
          </p>

          {author && (
            <div className="flex items-center gap-2 pt-3 border-t border-gray-800">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                {author.charAt(0)}
              </div>
              <span className="text-xs text-gray-400">{author}</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}