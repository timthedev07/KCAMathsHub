"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import { ErrorSVG } from "../svgs/message/error";
import { InfoSVG } from "../svgs/message/info";
import { WarningSVG } from "../svgs/message/warning";
import { SuccessSVG } from "../svgs/message/success";

interface MessageProps {
  message: string;
  title?: string;
  messageType?: "error" | "info" | "warning" | "success";
}

const IconMap = {
  error: ErrorSVG,
  info: InfoSVG,
  warning: WarningSVG,
  success: SuccessSVG,
};

export const Message: FC<MessageProps> = ({
  messageType = "warning",
  message,
  title,
}) => {
  let [isOpen, setIsOpen] = useState(true);
  const Icon = IconMap[messageType];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex gap-2 items-center"
                >
                  <Icon className="w-6 h-6" />
                  <ErrorSVG />
                  <span>{title || ""}</span>
                </Dialog.Title>
                <p className="my-8 text-sm text-gray-500">{message}</p>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};