import { Tweet as ReactTweet } from 'react-tweet'

interface TweetProps {
  id: string;
}

export default function Tweet({ id }: TweetProps) {
  return <ReactTweet id={id} />;
}

export { Tweet };