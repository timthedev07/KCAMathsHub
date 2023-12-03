"use client";

import { Modal } from "flowbite-react";
import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { Button } from "./reusable/Button";

interface MessageActionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  heading: string;
  action?: Function;
}

export const MessageActionModal: FC<
  PropsWithChildren<MessageActionModalProps>
> = ({ open, setOpen, heading, children, action = () => {} }) => {
  return (
    <Modal
      theme={{
        content: {
          inner: "relative bg-white rounded-lg shadow-lg dark:bg-slate-800",
        },
      }}
      show={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>{heading}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button
          color={"indigo"}
          onClick={async () => {
            await action();
            setOpen(false);
          }}
        >
          Proceed
        </Button>
        <Button
          color={"green"}
          onClick={() => {
            setOpen(false);
          }}
        >
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
