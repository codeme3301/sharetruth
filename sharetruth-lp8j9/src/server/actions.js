import HttpError from '@wasp/core/HttpError.js'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { pic, caption } = args;

  return context.entities.Post.create({
    data: {
      pic,
      caption,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const followUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const currentUser = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const userToFollow = await context.entities.User.findUnique({
    where: { id: args.userId }
  });

  if (!userToFollow) { throw new HttpError(404) };

  await context.entities.User.update({
    where: { id: currentUser.id },
    data: { following: { connect: { id: userToFollow.id } } }
  });

  return { success: true };
}