import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { GET_POST_BY_POST_ID } from "../../graphql/queries";
import Post from "../../components/Post";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADD_COMMENT } from "../../graphql/mutations";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import TimeAgo from 'timeago-react';
import pl from 'timeago.js/lib/lang/pl';
import * as timeago from 'timeago.js'

timeago.register('pl', pl);

type FormData = {
  comment: string;
};

function PostPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const post: Post = data?.getPostListByPostId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, "getPostListByPostId"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const notification = toast.loading("Przesyłanie komentarza...");

    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    setValue("comment", "");

    toast.success("Komentarz przesłany", {
      id: notification,
    });
  };
  return (
    <div className="mx-auto my-7 max-w-5xl">
      <Post post={post} />

      <div className="rounded-b-md border border-t0 border-gray-300 bg-white p-5 pl-16">
        <p>
          Dodaj komentarz jako{" "}
          <span className=" text-sky-500">{session?.user?.name}</span>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-5xl flex-col space-y-2"
        >
          <textarea
            {...register("comment", { required: true })}
            disabled={!session}
            className="h-24 rounder-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              session
                ? "Tutaj możesz wpisać treść komentarza"
                : "Zaloguj się aby komentować"
            }
          />
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.comment?.type === "required" && (
                <p>- Treść jest wymagana</p>
              )}
            </div>
          )}
          <button
            disabled={!session}
            type="submit"
            className="rounded-full bg-sky-500 p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Dodaj komentarz
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2"/>
        {post?.comments.map((comment) => (
          <div className="relative flex items-center space-x-2 space-y-5" key={comment.id}>
            <hr className="absolute top-10 left-7 z-0 h-16 border" />
            <div className="z-50">
              <Avatar seed={comment.username} />
            </div>
            <div>
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600">{comment.username}</span>{" "}
                <TimeAgo datetime={comment.created_at} locale='pl'/>
              </p>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostPage;
