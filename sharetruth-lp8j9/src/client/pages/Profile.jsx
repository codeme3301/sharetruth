import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUser from '@wasp/queries/getUser';
import createPost from '@wasp/actions/createPost';
import followUser from '@wasp/actions/followUser';

export function Profile() {
  const { username } = useParams();
  const { data: user, isLoading, error } = useQuery(getUser, { username });
  const createPostFn = useAction(createPost);
  const followUserFn = useAction(followUser);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreatePost = (pic, caption) => {
    createPostFn({ pic, caption });
  };

  const handleFollowUser = () => {
    followUserFn({ userId: user.id });
  };

  return (
    <div className='p-4'>
      <div className='flex items-center gap-x-4 mb-4'>
        <img
          src={user.profilePic}
          alt='Profile Pic'
          className='w-16 h-16 rounded-full'
        />
        <h1 className='text-2xl font-bold'>{user.username}</h1>
        <button
          onClick={handleFollowUser}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          {user.isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
      <div className='mb-4'>
        <h2 className='text-xl font-bold'>Posts</h2>
        {user.posts.map((post) => (
          <div key={post.id} className='flex items-center gap-x-2 mb-2'>
            <img src={post.pic} alt='Post Pic' className='w-12 h-12 rounded' />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className='text-xl font-bold'>Create Post</h2>
        <input type='file' accept='image/*' />
        <input type='text' placeholder='Caption' />
        <button
          onClick={handleCreatePost}
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
        >
          Create
        </button>
      </div>
    </div>
  );
}