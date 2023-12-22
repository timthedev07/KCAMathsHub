"use client";

import { TextInput, Toast, Tooltip } from "flowbite-react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { FC, useRef, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";
import { spanBase } from ".";
import { useClickOutside } from "../../../../../hooks/useClickOutside";
import { trpc } from "../../../../../trpc/client";
import { MessageActionModal } from "../../../../helpers/MessageActionModal";

interface EditableProps {
  user: Session["user"];
}

export const Editable: FC<EditableProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputUsername, setInputUsername] = useState<string>(user.username);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean | undefined>();
  const [editable, setEditable] = useState<boolean>(true);
  const { update } = useSession();

  const updateUsername = trpc.updateUsername.useMutation({}).mutateAsync;

  useClickOutside(inputRef, () => {
    setIsEditing(false);
  });

  return (
    <>
      {showToast && (
        <Toast
          theme={{
            root: {
              base: "animate-appearSlow fixed bottom-4 right-4 flex gap-2 w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400",
              closed: "animate-fadeSlow ease-out -z-10",
            },
            toggle: {
              base: "-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white",
              icon: "h-5 w-5 shrink-0",
            },
          }}
        >
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
            {success ? <FaCheckCircle /> : <GoXCircleFill />}
          </div>
          <div className="ml-3 text-sm font-normal">{message}</div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
      <MessageActionModal
        heading="Update Username"
        open={modalOpen}
        setOpen={setModalOpen}
        action={async () => {
          try {
            await updateUsername({
              id: user.id,
              username: inputUsername,
            });
            setEditable(false);
            setSuccess(true);
            setShowToast(true);
            await update({ user: { ...user, username: inputUsername.trim() } });
          } catch (err) {
            const msg = (err as any).message;
            setSuccess(false);
            setMessage(msg);
            setShowToast(true);
          }
        }}
      >
        <div className="space-y-4 text-sm">
          <p>Are you sure to update your username?</p>
          <p>
            You can only modify it once every <b>60 days</b>, so take careful
            considerations before you continue!
          </p>
        </div>
      </MessageActionModal>
      {isEditing ? (
        <TextInput
          id="uname"
          ref={inputRef}
          type="text"
          value={inputUsername}
          onChange={(e) => {
            setInputUsername(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setModalOpen(true);
            }
          }}
        />
      ) : editable ? (
        <Tooltip
          content={`Double click to edit`}
          className="select-none"
          animation="duration-150"
        >
          <span
            className={`${spanBase} cursor-pointer transition duration-150 rounded-md select-none border-slate-500/10 hover:border-slate-500/30 hover:bg-slate-400/20`}
            onClick={(e) => {
              if (e.detail !== 2) return;
              setIsEditing(true);
            }}
          >
            {user.username}
          </span>
        </Tooltip>
      ) : (
        <span className={spanBase}>{user.username}</span>
      )}
    </>
  );
};
