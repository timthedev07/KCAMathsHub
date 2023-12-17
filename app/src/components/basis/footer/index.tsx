import Link from "next/link";
import { FC, ReactNode } from "react";
import { EmailSVG } from "../../../svgs/social/Email";
import { InstagramSVG } from "../../../svgs/social/Instagram";
import { XSVG } from "../../../svgs/social/X";
import { LogoSVG } from "../../Logo";

interface FooterProps {}

const sBase = "flex-col flex flex-1 gap-4 lg:gap-0 px-16 lg:px-0";

const contactInfo = [
  ["Tim", "tim.bao"],
  ["Mykola", "mykola.sta"],
  ["Elena", "elena.zhu"],
];

const FooterSection: FC<{ heading: string; children?: ReactNode }> = ({
  children,
  heading,
}) => {
  return (
    <section className={`${sBase} mt-8 lg:mt-0`}>
      <h3
        className={`border-b border-slate-300/30 lg:border-0 pt-4 lg:pt-0 h-12 lg:h-auto lg:mb-2 font-semibold uppercase`}
      >
        {heading}
      </h3>
      <div className={"text-slate-300/80"}>{children}</div>
    </section>
  );
};

export const Footer: FC<FooterProps> = ({}) => {
  const y = new Date().getFullYear();
  const startY = 2023;

  return (
    <footer className="bg-slate-900/60 from-0% to-80% flex flex-col lg:px-24 border-t-2 border-slate-600/70">
      <section className="flex lg:h-72 h-max justify-center py-16 gap-16 flex-col lg:flex-row">
        <section
          className={`${sBase} w-full h-32 lg:h-full flex-1 items-center lg:items-start justify-center`}
        >
          <Link
            href="/"
            className="transition-all duration-200 hover:scale-[1.02] cursor-pointer flex h-full justify-center items-center gap-2 rounded-xl w-80 shadow-2xl border-slate-300/20 border bg-opacity-30 bg-slate-900"
          >
            <LogoSVG className="w-16 h-16" />
            <h1 className="font-bold font-roboto text-2xl">KCAMathsHub</h1>
          </Link>
        </section>
        <div className="flex flex-col lg:flex-row flex-1 grow-1">
          <FooterSection heading="Creators">
            <ul className="flex flex-col gap-1">
              <li>Tim</li>
              <li>Mykola</li>
              <li>Elena</li>
            </ul>
          </FooterSection>
          <FooterSection heading="Legal">
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policies">Privacy Policies</Link>
              </li>
            </ul>
          </FooterSection>
          <FooterSection heading="Contact us">
            <ul>
              {contactInfo.map(([name, email]) => {
                return (
                  <li key={name}>
                    <Link
                      className="flex items-center text-slate-300/80 group"
                      href={`mailto:${email}@kcpupils.org`}
                    >
                      <EmailSVG className="w-5 h-5 mr-2 transition duration-200 group-hover:text-slate-100" />
                      <span className="group-hover:text-slate-100">{name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </FooterSection>
        </div>
      </section>
      <section className="h-24 px-16 lg:px-0">
        <hr className="w-full mx-auto border-0 bg-slate-400/50 h-[1px] hidden lg:block" />
        <div className="flex items-center justify-between h-full ">
          <div className="flex gap-4">
            <Link href="https://www.instagram.com/kcamathshub/" passHref>
              <InstagramSVG className="w-7 text-slate-200" />
            </Link>
            <Link href="" passHref>
              <XSVG className="w-7 text-slate-200" />
            </Link>
          </div>
          <span className="text-sm text-slate-300">
            {startY === y ? y : `${startY}-${y}`} &copy; Tim, Mykola & Elena
          </span>
        </div>
      </section>
    </footer>
  );
};
