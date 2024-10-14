"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Suspense } from "react";
import useSWR from "swr";

type SortSetting = ["date", "desc" | "asc"];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Posts({ posts: initialPosts }) {
  const [sort, setSort] = useState<SortSetting>(["date", "desc"]);
  const { data: posts } = useSWR("/api/posts", fetcher, {
    fallbackData: initialPosts,
    refreshInterval: 5000,
  });

  function sortDate() {
    setSort(sort => [
      "date",
      sort[1] === "asc" ? "desc" : "asc",
    ]);
  }

  return (
    <Suspense fallback={null}>
      <main className="max-w-2xl font-mono m-auto mb-10 text-sm">
        <header className="text-gray-500 dark:text-gray-600 flex items-center text-xs">
          <button
            onClick={sortDate}
            className={`w-32 h-9 text-left ${
              sort[1] !== "desc"
                ? "text-gray-700 dark:text-gray-400"
                : ""
            }`}
          >
            date
            {sort[1] === "asc" && "↑"}
          </button>
          <span className="grow">title</span>
        </header>

        <List posts={posts} sort={sort} />
      </main>
    </Suspense>
  );
}

function List({ posts, sort }) {
  const sortedPosts = useMemo(() => {
    const [, sortDirection] = sort;
    return [...posts].sort((a, b) => {
      return sortDirection === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [posts, sort]);

  return (
    <ul>
      {sortedPosts.map((post) => {
        const date = new Date(post.date);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        return (
          <li key={post.id}>
            <Link href={`/${date.getFullYear()}/${post.id}`}>
              <span className="flex transition-[background-color] hover:bg-gray-100 dark:hover:bg-[#242424] active:bg-gray-200 dark:active:bg-[#222] border-y border-gray-200 dark:border-[#313131]">
                <span className="py-3 flex items-center">
                  <span className="w-32 inline-block shrink-0 text-gray-500 dark:text-gray-500">
                    {formattedDate}
                  </span>
                  <span className="grow dark:text-gray-100">{post.title}</span>
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function getYear(date: string) {
  return new Date(date).getFullYear();
}
