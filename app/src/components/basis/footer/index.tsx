import { FC, ReactNode } from "react";

interface FooterProps {}

const FooterSection: FC<{ heading: string; children?: ReactNode }> = ({
  children,
  heading,
}) => {
  return (
    <section className="flex-col flex flex-1 gap-8">
      <h3 className="font-semibold text-xl">{heading}</h3>
      <div className="text-slate-300">{children}</div>
    </section>
  );
};

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-footer-bg flex flex-col">
      <section className="flex min-h-[384px] justify-center px-36 py-20 gap-16">
        <FooterSection heading="About us">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et
          felis tellus. Duis accumsan turpis a diam auctor, vel suscipit leo
          tristique. Nullam finibus, magna eu auctor rhoncus, lacus nisl rutrum
          neque, ac pretium erat justo in justo. Sed rutrum urna et lorem
          pretium, ac condimentum erat ornare. Curabitur nec turpis porttitor,
          blandit mauris sit amet, ultricies nibh.
        </FooterSection>
        <FooterSection heading="Links"></FooterSection>
        <FooterSection heading="Contact us"></FooterSection>
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
