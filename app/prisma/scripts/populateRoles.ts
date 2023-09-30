import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const roles = ["inquirer", "moderator", "admin", "answerer"];

(async () => {
  await prisma.role.createMany({
    data: roles.map((each) => ({ name: each })),
  });
})()
  .then(async () => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
