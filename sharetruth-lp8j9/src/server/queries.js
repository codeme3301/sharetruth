import HttpError from '@wasp/core/HttpError.js'

export const getPosts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const followingIds = context.user.following.map(user => user.id);

  const posts = await context.entities.Post.findMany({
    where: {
      user: { id: { in: followingIds } }
    }
  });

  return posts;
}

export const getRandomPosts = async (args, context) => {
  const posts = await context.entities.Post.findMany({
    take: 10,
    orderBy: { id: 'desc' },
  });

  return posts;
}

export const getUser = async ({ username }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      profilePic: true,
      posts: true,
      following: true,
      followers: true
    }
  });

  if (!user) throw new HttpError(404, 'No user with username ' + username);

  return user;
}