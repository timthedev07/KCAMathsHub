"use client";

import { Textarea } from "flowbite-react";
import { Session } from "next-auth";
import { FC, useState } from "react";
import { updateIntervalCheck } from "../../../../lib/updateIntervalCheck";
import { DAYS_BETWEEN_BIO_UPDATE } from "../../../../constants/updateIntervals";
import { trpc } from "../../../../trpc/client";
import { MessageActionModal } from "../../../MessageActionModal";
import { BIO_MAX_LENGTH } from "../../../../constants/maxLengths";

interface EditableTextAreaProps {
  user: Session["user"];
  sameUser?: boolean;
}

export const EditableTextArea: FC<EditableTextAreaProps> = ({
  user,
  sameUser = false,
}) => {
  const mutateBio = trpc.updateBio.useMutation().mutateAsync;
  const [val, setVal] = useState<string>(() => user.bio);
  const [open, setOpen] = useState<boolean>(false);
  const [updatable, setUpdatable] = useState<boolean>(
    !user.bioLastUpdated ||
      updateIntervalCheck(
        user.bioLastUpdated.valueOf(),
        DAYS_BETWEEN_BIO_UPDATE
      )
  );

  return (
    <>
      <MessageActionModal
        heading="Update bio?"
        open={open}
        setOpen={setOpen}
        action={async () => {
          await mutateBio({ id: user.id, bio: val.trim() });
          setUpdatable(false);
        }}
      >
        <div className="space-y-4 text-sm">
          <p>Are you sure to update your bio?</p>
          <p>
            You can only modify it once every{" "}
            <b>
              {DAYS_BETWEEN_BIO_UPDATE} day
              {DAYS_BETWEEN_BIO_UPDATE > 1 ? "s" : ""}
            </b>
            , so take careful considerations before you continue!
          </p>
        </div>
      </MessageActionModal>
      <div className="relative ">
        <Textarea
          theme={{
            base: "block w-full p-4 rounded-lg border disabled:select-auto disabled:cursor-text dark:disabled:bg-gray-700/40 text-sm",
            colors: {
              gray: "transition duration-200 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-slate-300/80 dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:text-slate-200/90",
            },
          }}
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
          }}
          maxLength={BIO_MAX_LENGTH}
          disabled={sameUser ? !updatable : true}
          className="min-h-[156px] h-full resize-none text-sm"
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            setOpen(true);
          }}
        ></Textarea>
        <span className="absolute bottom-2 right-2 text-xs text-slate-200/60">
          {val.length}/{BIO_MAX_LENGTH}
        </span>
      </div>
    </>
  );
};
