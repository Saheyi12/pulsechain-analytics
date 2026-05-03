import Link from 'next/link';
import { Card } from '@/components/ui/card';

interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Related Articles</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card hover className="p-5 h-full">
              <div className="text-xs text-blue-400 font-medium mb-2">{post.category}</div>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">{post.excerpt}</p>
              <span className="text-xs text-gray-500">{post.date}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}