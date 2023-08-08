import { db } from '@/server/db/client';
import { TRPCError } from '@trpc/server';
import { v2 as cloud } from 'cloudinary';
import { z } from 'zod';
import { getHashedPassword } from '@/utils';
import { publicProcedure, router } from '../trpc';

const users = db.user;

const UserIdSchema = z.object({
  userId: z.string()
});
const UserNameSchema = UserIdSchema.merge(
  z.object({
    name: z.string()
  })
);
const UserEmailSchema = UserIdSchema.merge(
  z.object({
    email: z.string().email()
  })
);
const UserAvatarSchema = UserIdSchema.merge(
  z.object({
    image: z.string()
  })
);
const UserPasswordSchema = UserIdSchema.merge(
  z.object({
    password: z.string()
  })
);

async function uploadNewAvatar(path: string, id: string) {
  try {
    const { public_id, version } = await cloud.uploader.upload(path, {
      public_id: id,
      folder: 'scatch-avatars',
      filename_override: `avatar-${id}`
    });
    return cloud.url(public_id, { width: 50, version });
  } catch (error) {
    return null;
  }
}

const select = { id: true, name: true, email: true, image: true };

export const settingsRouter = router({
  changeUserName: publicProcedure.input(UserNameSchema).mutation(async ({ input }) => {
    const { userId, name } = input;
    return await users.update({ where: { id: userId }, data: { name }, select });
  }),
  changeUserEmail: publicProcedure.input(UserEmailSchema).mutation(async ({ input }) => {
    const { userId, email } = input;
    try {
      return await users.update({ where: { id: userId }, data: { email }, select });
    } catch (error) {
      throw new TRPCError({ code: 'UNPROCESSABLE_CONTENT', cause: error });
    }
  }),
  changeUserImage: publicProcedure.input(UserAvatarSchema).mutation(async ({ input }) => {
    const { userId, image } = input;
    const newImage = await uploadNewAvatar(image, userId);
    if (!newImage) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

    return await users.update({ where: { id: userId }, data: { image: newImage }, select });
  }),
  changeUserPassword: publicProcedure.input(UserPasswordSchema).mutation(async ({ input }) => {
    const { userId, password } = input;
    const newPassword = await getHashedPassword(password);

    return await users.update({ where: { id: userId }, data: { password: newPassword }, select });
  })
});
