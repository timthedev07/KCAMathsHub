"use client";

import { Modal } from "flowbite-react";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { LoadingSpin } from "../../loading/LoadingSpin";
import { Button } from "../../reusable/Button";

interface MessageActionModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  heading: string;
  action?: Function;
  proceedDisabled?: boolean;
  modalSize?: string;
}

const Component: FC<PropsWithChildren<MessageActionModalProps>> = ({
  open,
  setOpen,
  heading,
  children,
  action = () => {},
  proceedDisabled = false,
  modalSize = "2xl",
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Modal
      size={modalSize}
      theme={{
        root: {
          show: {
            on: "flex bg-neutral-950/80",
            off: "hidden",
          },
        },
        content: {
          inner: "relative rounded-lg shadow-lg bg-[#18181c]",
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
          processingSpinner={<AiOutlineLoading className="h-4 h-4" />}
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

export default Component;
