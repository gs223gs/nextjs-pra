import { prisma } from "@/lib/prisma";

export const getOwnPosts = async (userId: string) => {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      title: true,
      published: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: "desc" },
  });
};
