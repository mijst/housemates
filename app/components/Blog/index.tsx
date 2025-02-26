'use client'
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/store';
import { authors } from '@/utils/author';
import { BlogCard } from '../BlogCard';
import { iBlog } from '@/types';

const Blog: React.FC<{ blogData: iBlog[] }> = ({ blogData }) => {
  const { setData } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  useEffect(() => {
    setData(blogData);
  }, [blogData, setData]);

  const filteredBlogData: iBlog[] = blogData.filter((blog) => {
    if (searchBy === 'title') {
      return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchBy === 'author') {
      const authorName = authors[blog.userId - 1].name.toLowerCase();
      return authorName.includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <div className="relative flex justify-center items-center mt-4 lg:mt-10 ">
        <button
          onClick={() => setSearchBy(searchBy === "title" ? "author" : "title")}
          className="p-3 font-semibold text-[rgb(0,128,128)] min-w-[80px]"
        >
          {searchBy === "title" ? "Title" : "Author"}
        </button>
        <input
          type="text"
          placeholder={`Search ${searchBy}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[rgb(0,128,128)] focus:border-transparent"
        />
      </div>
      <BlogCard data={filteredBlogData} />
    </>
  );
};

export default Blog;
