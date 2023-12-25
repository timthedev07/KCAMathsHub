import { categories } from "../../src/categories";
import prisma from "../../src/db";

(async () => {
  const c = categories;
  await prisma.questionCategory.deleteMany();
  await prisma.questionCategory.createMany({
    data: c.map((name) => ({ name })),
  });
  await prisma.$disconnect();
  console.log("\x1b[32m%s\x1b[0m", "Categories successfully populated.");
})();
