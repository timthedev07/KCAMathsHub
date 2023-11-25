import { FC, ReactNode } from "react";
import { LogoSVG } from "../../Logo";

interface FooterProps {}

const sBase = "flex-col flex flex-1 gap-8 lg:gap-0";
const bt = "border-b border-slate-300/30 lg:border-0 pt-4 lg:pt-0 h-14";

const FooterSection: FC<{ heading: string; children?: ReactNode }> = ({
  children,
  heading,
}) => {
  return (
    <section className={`${sBase} mt-10`}>
      <h3 className={`${bt} font-semibold text-xl`}>{heading}</h3>
      <div className={"text-slate-300"}>{children}</div>
    </section>
  );
};

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-gradient-to-br from-footer-bg-a to-slate-900 from-0% to-80% flex flex-col">
      <section className="flex min-h-[384px] justify-center px-16 lg:px-36 py-20 gap-16 flex-col lg:flex-row">
        <section
          className={`${sBase} w-full min-w-[25%] items-center justify-start`}
        >
          <div className="flex w-[80%] lg:w-auto justify-center items-center gap-2 rounded-lg p-4 px-8 glass-morphism border-slate-300/20 border bg-opacity-30 bg-slate-900">
            <LogoSVG className="w-16 h-16" />
            <h1 className="font-bold font-roboto text-2xl">KCAMathsHub</h1>
          </div>
        </section>
        <div className="flex flex-col lg:flex-row gap-24">
          {" "}
          <FooterSection heading="Creators">
            <ul>
              <li>Tim</li>
              <li>Mykola</li>
              <li>Elena</li>
            </ul>
          </FooterSection>
          <FooterSection heading="Links"></FooterSection>
          <FooterSection heading="Contact us"></FooterSection>
        </div>
      </section>
      <section className="h-24">
        <hr className="w-[70%] mx-auto border-0 bg-slate-400/50 h-[1px]" />
        <div className="px-36 flex items-center justify-end h-full">
          <span className="text-sm text-slate-300">
            2023-{new Date().getFullYear()} &copy; Tim, Mykola & Elena
          </span>
        </div>
      </section>
    </footer>
  );
};
