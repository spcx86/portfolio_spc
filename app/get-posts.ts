import postsData from "./posts.json";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
};

export const getPosts = async () => {
  const posts = postsData.posts.map((post): Post => {
    const views = 0; // Set a default value or implement a different view counting mechanism
    return {
      ...post,
    };
  });
  return posts;
};
