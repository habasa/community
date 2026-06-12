"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  author: { nickname: string };
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api("/posts")
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">게시판</h1>
        <Link
          href="/posts/write"
          className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800"
        >
          글쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          아직 게시글이 없습니다. 백엔드 API를 만들어보세요!
        </p>
      ) : (
        <ul className="divide-y">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/posts/${post.id}`}
                className="block py-4 hover:bg-gray-50 -mx-4 px-4"
              >
                <h2 className="font-medium">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {post.author.nickname} &middot;{" "}
                  {new Date(post.createdAt).toLocaleDateString("ko")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
