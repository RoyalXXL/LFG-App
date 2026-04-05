import { PrismaClient, PostType, JoinMode, PostStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.vote.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.lFGPostPlatform.deleteMany(),
    prisma.lFGPostTag.deleteMany(),
    prisma.lFGPostRequirement.deleteMany(),
    prisma.lFGPost.deleteMany(),
    prisma.followedGame.deleteMany(),
    prisma.gameAlias.deleteMany(),
    prisma.gameHub.deleteMany(),
    prisma.gamePlatform.deleteMany(),
    prisma.platform.deleteMany(),
    prisma.game.deleteMany(),
    prisma.profile.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const [pc, ps5, xbox] = await Promise.all([
    prisma.platform.create({ data: { key: 'pc', label: 'PC' } }),
    prisma.platform.create({ data: { key: 'ps5', label: 'PS5' } }),
    prisma.platform.create({ data: { key: 'xbox', label: 'Xbox Series' } }),
  ]);

  const games = await Promise.all([
    prisma.game.create({ data: { slug: 'valorant', name: 'Valorant', activePlayers7d: 1250000, aliases: { create: [{ alias: 'valo' }] }, hub: { create: { rulesMarkdown: 'No toxic comms.' } } } }),
    prisma.game.create({ data: { slug: 'eternal-realms-online', name: 'Eternal Realms Online', activePlayers7d: 290000, aliases: { create: [{ alias: 'ero' }] }, hub: { create: { rulesMarkdown: 'Raid prep and kindness required.' } } } }),
    prisma.game.create({ data: { slug: 'deadzone-extraction', name: 'Deadzone Extraction', activePlayers7d: 380000, aliases: { create: [{ alias: 'dzx' }] }, hub: { create: { rulesMarkdown: 'No stream sniping.' } } } }),
    prisma.game.create({ data: { slug: 'mythic-depths', name: 'Mythic Depths', activePlayers7d: 410000, aliases: { create: [{ alias: 'depths' }] }, hub: { create: { rulesMarkdown: 'Dungeon patience.' } } } }),
    prisma.game.create({ data: { slug: 'pro-club-26', name: 'Pro Club 26', activePlayers7d: 500000, aliases: { create: [{ alias: 'pc26' }] }, hub: { create: { rulesMarkdown: 'Team-first play style.' } } } }),
  ]);

  for (const game of games) {
    await prisma.gamePlatform.createMany({
      data: [
        { gameId: game.id, platformId: pc.id },
        { gameId: game.id, platformId: ps5.id },
        { gameId: game.id, platformId: xbox.id },
      ],
      skipDuplicates: true,
    });
  }

  const user = await prisma.user.create({
    data: {
      username: 'voltcaptain',
      email: 'captain@example.com',
      profile: {
        create: {
          bio: 'Ranked grinder and teaching-run host',
          timezone: 'America/New_York',
          languages: ['English'],
          playstyles: ['competitive', 'chill'],
          preferredRoles: ['igl', 'support'],
        },
      },
    },
  });

  const postSeeds = [
    { title: 'Need 2 for FPS ranked push', body: 'Gold to Plat climb, calm comms.', game: games[0], postType: PostType.ranked },
    { title: 'MMO fresh raid teaching run', body: 'Explaining mechanics, no experience needed.', game: games[1], postType: PostType.raid },
    { title: 'Extraction shooter squad LF1 scout', body: 'Objective-focused and safe rotates.', game: games[2], postType: PostType.casual },
    { title: 'Co-op dungeon speed + chill', body: 'Need one healer for tonight.', game: games[3], postType: PostType.dungeon },
    { title: 'Sports club recruiting pass-first mids', body: 'Weekly tournament prep and VOD review.', game: games[4], postType: PostType.clan },
  ];

  for (const item of postSeeds) {
    const post = await prisma.lFGPost.create({
      data: {
        title: item.title,
        body: item.body,
        gameId: item.game.id,
        authorId: user.id,
        postType: item.postType,
        timezone: 'America/New_York',
        partySizeNeeded: 5,
        currentPartySize: 3,
        crossplay: true,
        voiceChatRequired: true,
        micRequired: true,
        languages: ['English'],
        joinMode: JoinMode.request_approval,
        status: PostStatus.open,
        score: 20,
      },
    });

    await prisma.lFGPostTag.createMany({
      data: [
        { postId: post.id, tag: 'beginner-friendly' },
        { postId: post.id, tag: 'evening-session' },
      ],
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });