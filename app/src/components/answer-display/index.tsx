"use client";

import dynamic from "next/dynamic";
import { FC, useCallback, useRef, useState } from "react";
import { trpc } from "../../trpc/client";
import { AnswerForm } from "../answer-form";
import { ModerationModal } from "../forms/ModerationModal";
import { TimedMessageToast, ToastLevel } from "../helpers/time-message-toast/";
import { LoadingSpin } from "../loading/loading-spin";
import { Pagination } from "../pagination";
import { AnswerListItem } from "./Item";
import { Arg } from "./type";

const ModerationList = dynamic(() => import("./ModerationList"), {
  ssr: false,
});

interface AnswersDisplay {
  quid: string;
  uid?: string;
  isAnswerer: boolean;
  isOwner: boolean;
  isAnswered: boolean;
}

const AnswersDisplay: FC<AnswersDisplay> = ({
  quid,
  isAnswerer,
  isOwner,
  uid,
  isAnswered,
}) => {
  const [selectedModerations, setSelectedModerations] = useState<Arg | null>();
  const [listOpen, setListOpen] = useState<boolean>(false);

  const [moderatedAnswerId, setModeratedAnswerId] = useState<string | null>(
    null
  );
  const [moderating, setModerating] = useState<boolean>(false);
  const [moderatedPageNum, setModeratedPageNum] = useState<number | null>(null);

  const [pageNum, setPageNum] = useState<number>(1);
  const topRef = useRef<HTMLDivElement | null>(null);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastLevel, setToastLevel] = useState<ToastLevel>("success");

  const moderate = useCallback((aid: string, pageNum: number) => {
    setModeratedPageNum(pageNum);
    setModeratedAnswerId(aid);
    setModerating(true);
  }, []);
  const resetModerationModal = useCallback(() => {
    setModeratedPageNum(null);
    setModeratedAnswerId(null);
    setModerating(false);
  }, []);
  const showModerations = useCallback((moderations: Arg) => {
    setSelectedModerations(moderations);
    setListOpen(true);
  }, []);
  const closeModerations = useCallback(() => {
    setListOpen(false);
    setSelectedModerations(null);
  }, []);

  const displayToast = (msg: string, level: ToastLevel) => {
    setShowToast(true);
    setToastLevel(level);
    setToastMsg(msg);
  };

  const { data, isLoading } = trpc.getQuestionAnswers.useQuery({
    quid,
    pageNum,
  });

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  return (
    <>
      {moderatedAnswerId && (
        <ModerationModal
          resetModerationModal={resetModerationModal}
          quid={quid}
          answerCurrPage={moderatedPageNum}
          aid={moderatedAnswerId}
          open={moderating}
          setOpen={setModerating}
        />
      )}
      <ModerationList
        setModerations={setSelectedModerations}
        isOpen={Boolean(selectedModerations && listOpen)}
        closeModerations={closeModerations}
        moderations={selectedModerations || null}
      />
      <TimedMessageToast
        show={showToast}
        setShow={setShowToast}
        level={toastLevel}
      >
        {toastMsg}
      </TimedMessageToast>
      {!(!isLoading && (!data || !data.answers.length)) && (
        <div
          className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12"
          ref={topRef}
        >
          <h2 className="font-semibold text-2xl lg:text-3xl">Answers</h2>
          <div className={`w-full flex-col ${isLoading ? "h-72" : ""}`}>
            {isLoading || data === undefined ? (
              <LoadingSpin />
            ) : (
              <Pagination
                currPage={pageNum}
                setCurrPage={(v) => {
                  setPageNum(v);
                  setTimeout(() => {
                    scrollToTop();
                  }, 100);
                }}
                totalPages={data.totalPages}
              >
                <ul className="w-full flex flex-col py-8">
                  {data.answers.map((each, ind) => (
                    <AnswerListItem
                      showModerations={showModerations}
                      moderate={moderate}
                      isAnswered={isAnswered}
                      displayToast={displayToast}
                      currPage={pageNum}
                      data={each}
                      isLast={ind === data.answers.length - 1}
                      key={each.id}
                    />
                  ))}
                </ul>
              </Pagination>
            )}
          </div>
        </div>
      )}
      <hr className="h-[1px] border-0 bg-slate-400/10 mx-auto w-11/12" />
      <div className="min-w-[300px] max-w-[700px] w-full py-24 md:px-0 px-12">
        {uid && (isAnswerer || isOwner) ? (
          <AnswerForm
            key={data && data.answers.length ? data.answers[0].id : 0}
            scrollToTop={scrollToTop}
            operationType="submit"
            quid={quid}
            uid={uid}
          />
        ) : null}
      </div>
    </>
  );
};

export default AnswersDisplay;
