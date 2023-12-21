"use client";

import { Modal } from "flowbite-react";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { LoadingSpin } from "./LoadingSpin";
import { Button } from "./reusable/Button";

interface MessageActionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  heading: string;
  action?: Function;
  proceedDisabled?: boolean;
}

export const MessageActionModal: FC<
  PropsWithChildren<MessageActionModalProps>
> = ({
  open,
  setOpen,
  heading,
  children,
  action = () => {},
  proceedDisabled = false,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal
      theme={{
        content: {
          inner: "relative rounded-lg shadow-lg bg-[#19191d]",
        },
      }}
      dismissible
      show={open}
      onClose={() => setOpen(false)}
    >
      <Modal.Header>{heading}</Modal.Header>
      <Modal.Body className="text-sm">
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
          disabled={loading || proceedDisabled}
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
