import { categories } from "../../../src/categories.json";
import prisma from "../../../src/db";
import { StudentStages } from "../../../src/types/StudentStage";

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

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum risus justo, eu malesuada elit rhoncus sed. Nam sollicitudin ligula aliquam, pretium leo sit amet, vestibulum diam. Morbi ut orci volutpat, lacinia ipsum sagittis, consequat risus. Praesent a arcu magna. Integer in eros laoreet elit maximus tempor. Nam lobortis dui leo, sagittis malesuada ipsum vehicula sit amet. Aliquam aliquam maximus felis, et efficitur mi volutpat id. Curabitur eu elit purus. In faucibus condimentum aliquet. Praesent accumsan augue sit amet urna eleifend, ac vestibulum metus congue. Vestibulum tincidunt bibendum magna. Quisque luctus euismod dolor at convallis.

Nulla cursus, mi sed rutrum condimentum, nulla ante commodo massa, ac egestas risus sapien non justo. Phasellus vitae ex nisi. Morbi id magna a diam cursus hendrerit non id orci. Nullam mollis sit amet quam a egestas. Aenean vehicula velit eget libero porttitor elementum imperdiet eget neque. Curabitur a erat cursus, placerat ligula eget, aliquet mi. Nulla dapibus tristique nisi sed venenatis. Pellentesque erat metus, finibus sit amet lobortis quis, semper placerat nibh. In commodo posuere libero, at varius velit luctus sed.

Cras nec scelerisque sapien. Suspendisse ut risus eget tellus vehicula pretium id in leo. Quisque nec mollis mi, quis porta diam. Mauris pretium nulla tortor, eget mollis eros lobortis vel. Sed volutpat sed dolor ac rhoncus. Vestibulum id dolor a tellus eleifend varius. Cras eget neque sollicitudin, condimentum enim eu, cursus ex. Vestibulum eleifend, tortor ut consequat suscipit, tortor dolor lobortis libero, eu vestibulum magna libero ac sem. Sed tincidunt ipsum quis tortor varius, ut mattis orci sollicitudin.

Maecenas quis sagittis enim. Vivamus nunc nunc, porta quis erat eget, mattis rutrum elit. Nulla in justo ac nisi faucibus commodo nec sit amet quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis vel lacinia urna. In pellentesque lacus feugiat arcu efficitur fermentum. Donec congue imperdiet lectus id tincidunt. Praesent ut aliquet quam. Fusce rutrum ipsum est, eu dignissim orci condimentum eget. Maecenas mattis consequat magna, id mattis ex tempor sed. Aenean elit nisl, semper rutrum augue a, luctus laoreet nulla. Pellentesque efficitur ullamcorper odio a egestas. Mauris luctus tristique arcu ut vehicula.

Praesent porta, nibh a ullamcorper posuere, purus mauris pharetra massa, aliquam pretium nisi erat id massa. Duis sollicitudin ipsum in est molestie malesuada. Proin suscipit nisi a egestas porta. Donec dignissim nisi et erat lacinia, et condimentum libero sodales. Nam mauris urna, eleifend vel enim ut, blandit tempus enim. Fusce eu enim feugiat, ultrices enim vel, iaculis risus. Mauris eget fermentum ex, eget bibendum turpis. Curabitur et urna nunc. Maecenas convallis tincidunt luctus. Aenean eros nulla, imperdiet a accumsan in, finibus eu diam. Integer a lorem semper, efficitur nulla non, lacinia mauris. Sed finibus accumsan nibh, sed rhoncus felis commodo vel. Duis et vestibulum enim, ac egestas nibh. Vivamus sed quam a orci imperdiet ullamcorper posuere et nulla. Nam dictum viverra enim consectetur porttitor.`;

(async () => {
  for (let i = 1; i <= 20; i++) {
    await prisma.question.create({
      data: {
        content: lorem,
        title: `Question ${i}`,
        category: choose(StudentStages),
        yearGroupAsked: Math.floor(Math.random() * 13),
        anonymous: Math.random() > 0.5 ? false : true,
        categories: {
          connect: randomChoices(categories).map((c) => ({ name: c })),
        },
      },
    });
  }
  console.log("\x1b[32m%s\x1b[0m", "Fake questions successfully populated.");
})();
