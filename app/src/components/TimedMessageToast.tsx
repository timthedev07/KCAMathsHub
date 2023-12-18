"use client";

import { Toast } from "flowbite-react";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";

interface Props {
  timeMilliseconds?: number;
  children?: ReactNode;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  level: "success" | "info" | "warning" | "error";
}

export const TimedMessageToast: FC<Props> = ({
  children,
  level,
  show,
  setShow,
  timeMilliseconds = 2000,
}) => {
  useEffect(() => {
    if (!show) return;

    const t = setTimeout(() => {
      setShow(false);
    }, timeMilliseconds);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Toast
      className={`fixed bottom-10 right-10 transition duration-200 shadow-xl ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 text-sm">
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${(() => {
            switch (level) {
              case "error": {
                return "bg-red-500/40 text-red-300";
              }
              case "info": {
                return "bg-cyan-500/40 text-cyan-300";
              }
              case "success": {
                return "bg-green-500/40 text-green-300";
              }
              case "warning": {
                return "bg-yellow-500/40 text-yellow-300";
              }
            }
          })()}`}
        >
          {(() => {
            switch (level) {
              case "success":
                return <FaCheckCircle className="w-4 h-4" />;
              case "info":
                return <IoMdInformationCircle className="w-5 h-5" />;
              case "warning":
                return <RiErrorWarningFill className="w-5 h-5" />;
              case "error":
                return <MdCancel className="w-5 h-5" />;
            }
          })()}
        </div>
        {children}
      </div>
      <Toast.Toggle />
    </Toast>
  );
};
