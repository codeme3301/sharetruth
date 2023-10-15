import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getRandomPosts from '@wasp/queries/getRandomPosts';

export function Explore() {
  const { data: posts, isLoading, error } = useQuery(getRandomPosts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <img src={post.pic} alt={post.caption} className='w-full' />
          <p>{post.caption}</p>
        </div>
      ))}
      <Link to='/home' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Go to Home</Link>
    </div>
  );
}