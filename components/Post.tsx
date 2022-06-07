import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Link from "next/link";
import { RaceBy } from "@uiball/loaders";
import TimeAgo from "timeago-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_VOTE } from "../graphql/mutations";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";

type Props = {
  post: Post;
};
function Post({ post }: Props) {
  const [vote, setVote] = useState<boolean>();
  const { data: session } = useSession();
  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("Aby głosować musisz być zalogowany");
      return;
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVotesByPostId"],
  });

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;
    const vote = votes?.find(
      (vote) => vote.username == session?.user?.name
    )?.upvote;
    setVote(vote);
  }, [data]);

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );
    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <RaceBy size={200} lineWeight={3} speed={1} color="blue" />
      </div>
    );
  return (
    <Link href={`/post/${post.id}`}>
      <div className="rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-blue-500">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-blue-500 ${vote === true}`}
          />
          <p className="text-xs text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-500 ${vote === false}`}
          />
        </div>
        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} large />
            <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
              <p className="text-xs text-gray-400">
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  d/{post.subreddit[0]?.topic}
                </span>{" "}
                | Posted by u/ {post.username}{" "}
                <TimeAgo
                  datetime={post.subreddit[0].created_at}
                  locale="pl_PL"
                />
              </p>
            </Link>
          </div>
          {/* Body */}
          <div className="py-4">
            <h2 className="text-x font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>
          {/* Image */}
          <img className="w-full" src={post.image} alt="" />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatAltIcon className="h-6 w-6" />
              <p className="">{post.comments.length} Komentarze</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline"> Udostępnij</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Zapisz</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
