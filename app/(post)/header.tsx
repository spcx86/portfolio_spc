"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { ago } from "time-ago";
import type { Post } from "@/app/get-posts";

export function Header({ posts }: { posts: Post[] }) {
  const segments = useSelectedLayoutSegments();
  const post = posts.find(
    post => post.id === segments[segments.length - 1]
  );

  if (!post) return null;

  return (
    <div className="mb-10">
      <h1 className="font-bold text-2xl mb-1">{post.title}</h1>
      <div className="text-gray-500 text-sm">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })} ({ago(new Date(post.date))})
      </div>
    </div>
  );
}
