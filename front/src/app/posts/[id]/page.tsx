"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface Comment {
  id: number;
  content: string;
  author: { nickname: string };
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: { nickname: string };
  createdAt: string;
  comments: Comment[];
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    api(`/posts/${id}`)
      .then(setPost)
      .catch(() => {});
  }, [id]);

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await api(`/posts/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ content: comment }),
      });
      setComment("");
      api(`/posts/${id}`).then(setPost);
    } catch {}
  };

  if (!post) {
    return <p className="text-gray-500 text-center py-20">로딩 중...</p>;
  }

  console.log("postData", post);

  return (
    <div>
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        &larr; 목록으로
      </Link>

      <article className="mt-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          {/* {post.author.nickname} &middot;{" "} */}
          {new Date(post.createdAt).toLocaleDateString("ko")}
        </p>
        <div>{post?.user?.nickname}</div>
        <div className="mt-6 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </article>

      <section className="mt-10 border-t pt-6">
        <h2 className="font-bold mb-4">댓글 {post.comments?.length || 0}</h2>

        <form onSubmit={handleComment} className="flex gap-2 mb-6">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            className="flex-1 border rounded px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
          >
            등록
          </button>
        </form>

        <ul className="space-y-4">
          {post.comments?.map((c) => (
            <li key={c.id} className="text-sm">
              <span className="font-medium">{c.author.nickname}</span>
              <span className="text-gray-400 ml-2">
                {new Date(c.createdAt).toLocaleDateString("ko")}
              </span>
              <p className="mt-1">{c.content}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
