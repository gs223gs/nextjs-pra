export type Post = {
  id: string;
  title: string;
  content: string;
  topImage: string | null;
  published: boolean;
  author: {
    name: string | null;
  };
  createdAt: Date;
};

export type PostCardProps = { post: Post };
