'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <Card className="p-4 sticky top-20">
      <h3 className="text-sm font-semibold mb-3">Table of Contents</h3>
      <nav>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-sm py-1 transition border-l-2 ${
                  activeId === item.id
                    ? 'border-blue-500 text-blue-400 pl-3'
                    : 'border-transparent text-gray-400 hover:text-gray-200 pl-3'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  );
}