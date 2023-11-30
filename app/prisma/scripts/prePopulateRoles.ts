import prisma from "../../src/db";
import { ROLES } from "../../src/types/role";

(async () => {
  await prisma.$connect();
  if (
    (
      await prisma.role.findMany({
        where: { name: { in: ROLES.map((each) => each) } },
      })
    ).length !== ROLES.length
  ) {
    await prisma.role.deleteMany();
    await prisma.role.createMany({
      data: ROLES.map((role) => ({ name: role })),
    });
  }
})().then(async () => {
  await prisma.$disconnect();
  console.log("\x1b[32m%s\x1b[0m", "Roles successfully populated.");
});
