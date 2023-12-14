"use client";

import { Modal } from "flowbite-react";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Button } from "./reusable/Button";
import { LoadingSpin } from "./LoadingSpin";

interface MessageActionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  heading: string;
  action?: Function;
}

export const MessageActionModal: FC<
  PropsWithChildren<MessageActionModalProps>
> = ({ open, setOpen, heading, children, action = () => {} }) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      <Modal.Body>
        {loading ? (
          <div className="w-full h-48 flex justify-center items-center">
            <LoadingSpin size="md" />
          </div>
        ) : (
          children
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          color={"indigo"}
          disabled={loading}
          onClick={async () => {
            if (!loading) {
              setLoading(true);
              await action();
              setOpen(false);
              setLoading(false);
            }
          }}
        >
          Proceed
        </Button>
        <Button
          color={"green"}
          onClick={() => {
            setOpen(false);
          }}
          disabled={loading}
        >
          Back
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
