import { categories } from "../../../src/categories";
import prisma from "../../../src/db";
import { classifyKSCategoryByYear } from "../../../src/lib/classifyKSCategory";

const paragraphs = [
  `Differentiation is a fundamental concept in various fields, encompassing mathematics, biology, business, and education. In mathematics, it refers to the process of finding the rate at which a quantity changes concerning another, often expressed as the derivative. This tool is pivotal in understanding the behavior of functions and curves, enabling mathematicians and scientists to analyze patterns and make predictions. In biology, differentiation refers to the process by which cells become specialized and assume distinct functions in an organism, a crucial aspect of development and growth. In business, product differentiation is a strategy employed by companies to distinguish their offerings from competitors, fostering brand identity and customer loyalty. Moreover, differentiation in education involves tailoring instruction to meet the diverse needs of students, recognizing and accommodating various learning styles and abilities. In essence, differentiation underscores the dynamic nature of progress, adaptation, and individuality across disciplines, driving innovation and fostering excellence.`,
  `Integration is a key concept that plays a central role in mathematics, science, and various other disciplines. In mathematics, integration is the inverse operation of differentiation, involving the accumulation of quantities or the determination of the area under a curve. It provides a powerful tool for calculating accumulated changes and analyzing the overall behavior of functions. In physics and engineering, integration is employed to solve problems related to motion, energy, and fluid dynamics, offering a means to comprehend complex systems and phenomena. Beyond mathematics and science, the term "integration" extends into social contexts, where it signifies the process of combining or coordinating different elements into a unified whole. This can be observed in societal integration, where diverse cultures, ideas, and individuals come together to form a cohesive and harmonious community. Overall, integration serves as a unifying force, whether in the realm of mathematics, physical sciences, or the broader tapestry of human interactions, contributing to a more comprehensive understanding of complex systems and fostering unity and synergy.`,
  `De Moivre's Theorem simplifies complex number powers. For any complex number  z = r ( cos θ + i sin θ ) z=r(cosθ+isinθ) and positive integer  n n,  z n = r n ( cos ⁡ ( n θ ) + i sin ⁡ ( n θ ) ) z  n  =r  n  (cos(nθ)+isin(nθ)). This theorem is useful in math and physics for straightforward calculations with complex numbers.`,
  `Composite functions involve combining two or more functions to create a new one. If you have functions  f ( x ) f(x) and  g ( x ) g(x), their composite function is  ( f ∘ g ) ( x ) (f∘g)(x) or  f ( g ( x ) ) f(g(x)). This concept is widely used in math to analyze relationships between variables and solve problems involving multiple processes or transformations.`,
];

function randInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choose(choices: readonly string[]) {
  return choices[Math.floor(Math.random() * choices.length)];
}

function randomChoices(possibilities: string[]) {
  const N = 5;
  const final: string[] = [];
  for (let a = 0; a < N; a++) {
    let isDup = true;
    while (isDup) {
      const c = choose(possibilities);
      if (!final.includes(c)) {
        final.push(c);
        isDup = false;
      }
    }
  }
  return final;
}

(async () => {
  await prisma.question.deleteMany();

  for (let i = 1; i <= 100; i++) {
    const yeargroup = randInt(1, 13);

    await prisma.question.create({
      data: {
        content: choose(paragraphs),
        title: `Question ${i}`,
        studentStage: classifyKSCategoryByYear(yeargroup),
        yearGroupAsked: yeargroup,
        answered: Math.random() > 0.5 ? false : true,
        anonymous: Math.random() > 0.5 ? false : true,
        categories: {
          connect: randomChoices(categories).map((c) => ({ name: c })),
        },
      },
    });
  }
  console.log("\x1b[32m%s\x1b[0m", "Fake questions successfully populated.");
})();
