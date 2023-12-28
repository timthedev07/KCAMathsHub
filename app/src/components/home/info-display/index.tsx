import Link from "next/link";

import { FaInfoCircle } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import { Section } from "./Section";

export const HomePageInfoDisplay = () => {
  return (
    <div className="flex flex-col gap-10 p-8">
      <Section colorScheme="blue" heading="Welcome" icon={FaInfoCircle}>
        <div className="flex flex-col">
          Welcome to KCAMathsHub, an internally maintained and used platform for
          asking, answering, and moderating questions that students at any
          stage, in any year group, encountered.
        </div>
      </Section>
      <Section colorScheme="green" heading="Quick access" icon={IoMdLink}>
        <ul className="list-disc list-inside pl-3">
          <li>
            <Link href="/docs">Docs</Link>
          </li>
          <li>
            <Link href="/questions/ask">Ask question</Link>
          </li>
          <li>
            <Link href="/user/profile">Profile</Link>
          </li>
        </ul>
      </Section>
      <Section
        colorScheme="orange"
        heading="Expectations"
        icon={PiWarningCircleFill}
      >
        <p className="mb-3">
          Students are expected to act sensibly and respectfully on the
          platform.
        </p>
        <p>
          Offensive/disruptive behavior will be recorded and reported. Read more
          about legislations{" "}
          <u>
            <Link href="/docs/legislation">here</Link>
          </u>
          .
        </p>
      </Section>
    </div>
  );
};
