import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getPosts from '@wasp/queries/getPosts';

export function HomePage() {
  const { data: posts, isLoading, error } = useQuery(getPosts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <img src={post.pic} alt={post.caption} className='w-48 h-48 object-cover rounded' />
          <div>{post.caption}</div>
        </div>
      ))}
      <Link to='/explore' className='text-blue-500'>Explore</Link>
      <Link to='/profile/myusername' className='text-blue-500'>My Profile</Link>
    </div>
  );
}