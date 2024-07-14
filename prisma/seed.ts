import { PrismaClient, VoteType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: 'alice',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'bob',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      body: 'This is the content of the first post.',
      createdBy: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      body: 'This is the content of the second post.',
      createdBy: user2.id,
    },
  });

  // Create votes
  const vote1 = await prisma.vote.create({
    data: {
      postId: post1.id,
      type: VoteType.UP,
      userId: user2.id,
    },
  });

  const vote2 = await prisma.vote.create({
    data: {
      postId: post2.id,
      type: VoteType.DOWN,
      userId: user1.id,
    },
  });

  console.log({ user1, user2, post1, post2, vote1, vote2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
