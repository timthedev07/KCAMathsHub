"use client";
import Image from "next/image";
import { FC, PropsWithChildren, useEffect, useState } from "react";

interface ExpandedImgProps {
  src: string;
  isBlob?: boolean;
}

export const WithExpandedImg: FC<PropsWithChildren<ExpandedImgProps>> = ({
  children,
  src,
  isBlob = false,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("keydown", (k) => {
      if (k.key === "Escape") {
        setOpen(false);
      }
    });
  }, []);

  return (
    <>
      <div
        onClick={() => {
          setOpen(false);
        }}
        className={`w-full h-screen flex justify-center items-center fixed top-0 left-0 transition duration-200 ${
          open ? "opacity-100 z-20" : "opacity-0 -z-20"
        } bg-black/70`}
      >
        <div
          className={`w-[90vw] max-w-[800px] h-[80vh] relative transition duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          {open ? (
            <>
              {isBlob ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt=""
                  className="absolute object-contain shadow-xl"
                />
              ) : (
                <Image
                  sizes="100%"
                  className="object-contain shadow-xl"
                  src={src}
                  alt={""}
                  fill
                />
              )}
            </>
          ) : null}
        </div>
      </div>
      {/* overlay */}
      <div
        onClick={() => {
          setOpen((p) => !p);
          console.log("shit");
        }}
      >
        {children}
      </div>
    </>
  );
};
