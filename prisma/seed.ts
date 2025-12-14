import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in environment variables',
    );
  }

  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      name: 'Cloudberry Admin',
      email,
      password: await bcrypt.hash(password, 12),
    },
  });

  console.log('✅ Admin seeded', await prisma.admin.findMany());
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
