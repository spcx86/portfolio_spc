import postsData from "./posts.json";
import commaNumber from "comma-number";

export type Post = {
  id: string;
  date: string;
  title: string;
};

export const getPosts = async () => {
  const posts = postsData.posts.map((post): Post => {
    return {
      ...post,
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  });
  return posts;
};
