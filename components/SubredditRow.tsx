import { ChevronUpIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  topic: string;
  index: number;
};
function SubredditRow({ index, topic }: Props) {
  return (
    <div className="flex items-center space-x-2 border-t bg-white px-4 py-2 last:rouded-b">
      <p>{index + 1}</p>
      <ChevronUpIcon className="h-4 w-4 flex-shrink-0 text-sky-500" />
      <Avatar seed={`/subreddit/${topic}`} />
      <p className="flex-1 truncate text-md">d/{topic}</p>
      <Link href={`/subreddit/${topic}`}>
        <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">Przejdź</div>
      </Link>
    </div>
  );
}

export default SubredditRow;
