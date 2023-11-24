import { FC, ReactNode } from "react";
import { LogoSVG } from "../../Logo";

interface FooterProps {}

const FooterSection: FC<{ heading: string; children?: ReactNode }> = ({
  children,
  heading,
}) => {
  return (
    <div>
      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">{heading}</h2>
      <ul className="text-gray-500 text-gray-400 font-medium">
          {children}
      </ul>
    </div>
  );
};

export const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-white dark:bg-slate-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="flex w-[80%] lg:w-auto justify-center items-center gap-2 rounded-lg p-4 px-8 glass-morphism border-slate-300/20 border bg-opacity-30 bg-slate-900">
                <LogoSVG className="w-16 h-16" />
                <h1 className="font-bold font-roboto text-2xl">KCAMathsHub</h1>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <FooterSection heading="Creators">
                  <li className="mb-4">
                    Tim Bao
                  </li>
                  <li className="mb-4">
                    Mykola Starovoit
                  </li>  
                  <li>
                    Elena Zhuang
                  </li>
                </FooterSection>
                <FooterSection heading="Legal">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                  </li>
                  <li>
                      <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                  </li>
                </FooterSection>
                <FooterSection heading="Contact us">
                    <li className="mb-4">
                      mikola.sta@kcpupil.org
                    </li>
                    <li className="mb-4">
                      tim.bao@kcpupils.org
                    </li>
                    <li>
                      elena.zhu@kcpupils.org
                    </li>
                </FooterSection>
              </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">`2023-{new Date().getFullYear()} &copy; Tim, Mykola & Elena`
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                      "Inst, twitter logos"
                  </a>
              </div>
          </div>
        </div>
    </footer>

  );
};




