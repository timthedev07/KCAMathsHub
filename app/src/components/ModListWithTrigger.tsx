"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState, type FC } from "react";
import { MdChecklist, MdEdit, MdRateReview } from "react-icons/md";
import { DeletionButtonWithConfirmation } from "../app/questions/[quid]/DeletionButtonWithConfirmation";
import { pageURLs } from "../lib/pageURLGen";
import { roleChecker } from "../lib/roleChecker";
import { trpc } from "../trpc/client";
import ModerationList from "./answer-display/ModerationList";
import { ModerationModal } from "./forms/ModerationModal";
import { Button } from "./reusable/Button";

interface ModListWithTriggerProps {
  aid: string;
  accepted: boolean;
  moderated: boolean;
  answererUsername: string;
  quid: string;
}

export const ModListWithTrigger: FC<ModListWithTriggerProps> = ({
  aid,
  accepted,
  moderated,
  quid,
  answererUsername,
}) => {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [showModerations, setShowModerations] = useState<boolean>(false);

  const [moderating, setModerating] = useState<boolean>(false);

  const moderate = useCallback(() => {
    setModerating(true);
  }, []);

  const resetModerationModal = useCallback(() => {
    setModerating(false);
  }, []);

  const { data: mods } = trpc.getModerations.useQuery({ aid });

  const isOwner = session?.user.username === answererUsername;
  const canMod = Boolean(
    session &&
      !!mods &&
      roleChecker(session.user.roles, ["moderator"]) &&
      mods.every((val) => val.moderator?.username !== session.user.username)
  );
  const canEdit = Boolean(session?.user && isOwner);

  return (
    <>
      <ModerationModal
        resetModerationModal={resetModerationModal}
        quid={quid}
        answerCurrPage={null}
        aid={aid}
        open={moderating}
        setOpen={setModerating}
      />
      <ModerationList
        closeModerations={() => {
          setShowModerations(false);
        }}
        isOpen={showModerations}
        moderations={mods ? { aid, mods } : null}
        setModerations={() => {}}
      />

      <div className="h-8 w-full flex gap-4 justify-end">
        {(mods?.length || 0) > 0 && (
          <Button
            onClick={() => {
              setShowModerations(true);
            }}
            color={accepted ? "info" : "success"}
          >
            <MdChecklist className="mr-2 w-5 h-5" />
            See Moderations
          </Button>
        )}
        {canMod && (
          <Button color="purple" onClick={() => moderate()}>
            Moderate
            <MdRateReview className="ml-2" />
          </Button>
        )}
        {canEdit && (
          <>
            <Link className="h-full" href={pageURLs.editAnswer(aid)}>
              <Button color="purple" className="h-8">
                Edit
                <MdEdit className="ml-1" />
              </Button>
            </Link>
            {!accepted && !moderated && (
              <DeletionButtonWithConfirmation
                currPage={1}
                quid={quid}
                aid={aid}
                color="purple"
                entity="answer"
                isOwner
                uid={session!.user.id}
                onSuccess={() => {
                  push(pageURLs.question(quid));
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
