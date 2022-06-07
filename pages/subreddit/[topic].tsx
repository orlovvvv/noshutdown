import { useRouter } from "next/router";
import React from "react";
import Avatar from "../../components/Avatar";
import Feed from "../../components/Feed";
import PostBox from "../../components/PostBox";

function Subreddit() {
  const {
    query: { topic },
  } = useRouter();

  return (
    <div className={"h-24 bg-sky-400 p-8"}>
      <div className="-mx-8 mt-10 bg-white">
        <div className=" mx-auto flex max-w-5xl items-center space-x-4 pb-3">
          <div className="-mt-8">
            <Avatar seed={topic as string} large />
            <div className="py-2">
              <h1 className="text-3xl font-semibold">
                Witaj w dziale d/{topic}!
              </h1>
              <p className="text-sm text-gray-400">d/{topic}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-5xl pb-10">
          <PostBox subreddit={topic as string} />
          <Feed topic={topic as string}/>
      </div>
    </div>
  );
}

export default Subreddit;
