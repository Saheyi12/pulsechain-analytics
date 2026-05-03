import { generateDailyBlogs } from '../src/lib/services/blog-generator';
import { prisma } from '../src/lib/prisma';
import { isFeatureEnabled } from '../src/lib/feature-flags';
import slugify from 'slugify';

async function main() {
  console.log('🚀 Starting automated blog generation...\n');

  // Check if blog automation is enabled
  if (!isFeatureEnabled('BLOG_AUTOMATION')) {
    console.log('❌ Blog automation is currently disabled.');
    console.log('   Enable it in settings or set BLOG_AUTOMATION=true');
    process.exit(0);
  }

  try {
    // Generate blog posts
    console.log('📝 Generating blog posts with AI...');
    const blogs = await generateDailyBlogs();
    
    console.log(`✅ Generated ${blogs.length} blog posts\n`);

    // Save to database
    let savedCount = 0;
    let skippedCount = 0;

    for (const blog of blogs) {
      try {
        // Check if slug already exists
        const existing = await prisma.blogPost.findUnique({
          where: { slug: blog.slug },
        });

        if (existing) {
          console.log(`⏭️  Skipped (exists): ${blog.title}`);
          skippedCount++;
          continue;
        }

        // Save blog post
        await prisma.blogPost.create({
          data: {
            title: blog.title,
            slug: blog.slug,
            content: blog.content,
            excerpt: blog.excerpt,
            category: blog.category,
            tags: blog.tags,
            seoTitle: blog.seoTitle,
            seoDescription: blog.seoDescription,
            isPublished: true,
            publishedAt: new Date(),
            authorId: 'system-ai',
            featuredImage: `/images/blog/default-blog-hero.webp`,
          },
        });

        console.log(`📰 Published: ${blog.title}`);
        console.log(`   Category: ${blog.category}`);
        console.log(`   Reading time: ${blog.readingTime} min`);
        console.log(`   Tags: ${blog.tags.join(', ')}\n`);

        savedCount++;
      } catch (error) {
        console.error(`❌ Failed to save "${blog.title}":`, error);
      }
    }

    console.log('═══════════════════════════════════════');
    console.log(`📊 Summary:`);
    console.log(`   Total generated: ${blogs.length}`);
    console.log(`   Published: ${savedCount}`);
    console.log(`   Skipped: ${skippedCount}`);
    console.log(`   Failed: ${blogs.length - savedCount - skippedCount}`);
    console.log('═══════════════════════════════════════\n');

    // Ping search engines
    if (savedCount > 0) {
      console.log('🔔 Notifying search engines...');
      await notifySearchEngines();
      console.log('✅ Search engines notified\n');
    }

  } catch (error) {
    console.error('❌ Blog generation failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function notifySearchEngines() {
  const sitemapUrl = 'https://pulsechain-analytics.vercel.app/sitemap.xml';
  
  try {
    await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
  } catch (error) {
    console.warn('⚠️  Failed to notify Google:', error);
  }

  try {
    await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`);
  } catch (error) {
    console.warn('⚠️  Failed to notify Bing:', error);
  }
}

// Run if called directly
main()
  .then(() => {
    console.log('🎉 Blog generation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });