"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

interface CommentData {
  id: number;
  content: string;
  user: { nickname: string };
}

interface Post {
  id: number;
  title: string;
  content: string;
  user: { nickname: string };
}

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [comment, setComment] = useState("");

  const fetchComments = () => {
    api(`/comment/post/${id}`).then(setComments).catch(() => {});
  };

  useEffect(() => {
    api(`/posts/${id}`)
      .then(setPost)
      .catch(() => {});
    fetchComments();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await api(`/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      router.push("/");
    } catch {
      alert("본인의 게시글만 삭제할 수 있습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    try {
      await api(`/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchComments();
    } catch {
      alert("본인의 댓글만 삭제할 수 있습니다.");
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await api(`/comment/post/${id}`, {
        method: "POST",
        body: JSON.stringify({ content: comment }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComment("");
      fetchComments();
    } catch {}
  };

  if (!post) {
    return <p className="text-gray-500 text-center py-20">로딩 중...</p>;
  }

  return (
    <div>
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        &larr; 목록으로
      </Link>

      <article className="mt-4">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          {post.user?.nickname}
        </p>
        <div className="mt-6 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
        <button
          onClick={handleDelete}
          className="mt-4 text-sm text-red-500 hover:underline"
        >
          삭제
        </button>
      </article>

      <section className="mt-10 border-t pt-6">
        <h2 className="font-bold mb-4">댓글 {comments.length}</h2>

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
          {comments.map((c) => (
            <li key={c.id} className="text-sm">
              <span className="font-medium">{c.user?.nickname}</span>
              <p className="mt-1">{c.content}</p>
              <button
                onClick={() => handleDeleteComment(c.id)}
                className="text-red-400 text-xs hover:underline mt-1"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
