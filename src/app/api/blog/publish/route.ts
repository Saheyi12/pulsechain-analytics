import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, category, tags, seoTitle, seoDescription } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content required' }, { status: 400 });
    }

    const published = {
      id: `post-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content,
      excerpt: excerpt || content.substring(0, 160),
      category: category || 'MARKET_ANALYSIS',
      tags: tags || ['crypto', 'market'],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt,
      isPublished: true,
      publishedAt: new Date().toISOString(),
      viewCount: 0,
    };

    return NextResponse.json({
      success: true,
      message: 'Blog post published successfully',
      post: published,
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to publish blog post' }, { status: 500 });
  }
}