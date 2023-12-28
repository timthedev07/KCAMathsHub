"use client";
import { Toast, Tooltip } from "flowbite-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, PropsWithChildren, useState } from "react";
import { BsAwardFill } from "react-icons/bs";
import { FaCheckCircle, FaCopy } from "react-icons/fa";
import { viewPanelBase } from ".";
import { calcCreatorCreditGain } from "../../../lib/calcCreatorCreditGain";
import { pageURLs } from "../../../lib/pageURLGen";
import { trpc } from "../../../trpc/client";
import { Coin } from "../../helpers/Coin";
import { ProfileImgDisplay } from "../../image/ProfileImgDisplay";
import { LoadingSpin } from "../../loading/loading-spin";
import { Button } from "../../reusable/Button";

const FriendInvited: FC<
  PropsWithChildren<{ username: string; userProfilePic: string; ind: number }>
> = ({ children, username, userProfilePic, ind }) => {
  const t = calcCreatorCreditGain(ind + 1);
  return (
    <Link href={pageURLs.user(username)}>
      <li className="w-full py-3 px-4 flex mb-6 justify-between items-center text-base text-slate-100/70 hover:text-slate-50/90 hover:bg-slate-500/30 transition duration-200 cursor-pointer bg-slate-500/20 rounded-lg border border-slate-500/30">
        <div className="flex gap-3 items-center">
          <ProfileImgDisplay className="w-9 h-9" src={userProfilePic} />
          <span>{children}</span>
        </div>
        <span className="font-mono flex gap-2 items-center">
          <span>+{t}</span>
          <Coin width={24} height={24} />
        </span>
      </li>
    </Link>
  );
};

export const ReferralTab: FC = ({}) => {
  const { data, status } = useSession();
  const { data: referralData, isLoading } = trpc.getReferralEntity.useQuery({
    userId: data?.user.id,
  });
  const { getReferralEntity } = trpc.useUtils();
  const initReferral = trpc.initReferral.useMutation({
    onSuccess: async () => {
      getReferralEntity.invalidate();
    },
  }).mutateAsync;

  const [showToast, setShowToast] = useState<boolean>(false);

  if (status === "loading" || isLoading) {
    return (
      <div className={`${viewPanelBase} w-full h-[70vh]`}>
        <LoadingSpin size="md" />
      </div>
    );
  }
  const u = data?.user!;

  const users = referralData?.acceptedUsers;
  const link = referralData?.url;
  const referralCreated = !!referralData;

  const buttonNotClickedCode = (
    <div
      className={`bg-slate-900/60 rounded-xl shadow-2xl w-full h-[70vh] flex gap-16 justify-center flex-col items-center`}
    >
      <div className="rounded-3xl text-cyan-600 w-40 h-40 flex justify-center items-center bg-cyan-300/10">
        <BsAwardFill className="w-28 h-28" />
      </div>
      <p className="text-3xl font-semibold">Invite users for credit boosts!</p>
      <div className="">
        <Button
          size="lg"
          className="text-slate-100/90"
          onClick={async () => {
            await initReferral({ userId: u.id });
          }}
        >
          Create referral link
        </Button>
      </div>
    </div>
  );

  const copyLink = (link?: string) => {
    if (link) {
      navigator.clipboard.writeText(link);
      setShowToast(true);
    }
  };

  const buttonClickedCode = (
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
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-200">
            <FaCheckCircle />
          </div>
          <div className="ml-3 text-sm font-normal">Link copied!</div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      )}
      <div className="w-full sm:w-10/12 min-w-[460px] sm:mx-auto lg:w-full h-auto lg:h-[70vh] flex lg:flex-row flex-col gap-8 p-2">
        <div
          className={`lg:w-1/2 h-full ${viewPanelBase} flex flex-col py-8 px-8 gap-24 lg:gap-0 justify-between md:px-12 items-center`}
        >
          <h1 className="text-2xl xl:text-3xl font-semibold">Referral link</h1>
          <div className="w-full flex flex-col items-end gap-8">
            <div
              onClick={() => {
                copyLink(link);
              }}
              className="text-sm text-slate-100/70 hover:text-slate-50/90 transition duration-200 cursor-pointer text-center bg-slate-500/20 w-full flex px-8 py-2 truncate rounded-lg border border-slate-500/30"
            >
              <div className="mx-auto truncate">
                <Tooltip content="Copy link" placement="top">
                  {link}
                </Tooltip>
              </div>
            </div>
            <div>
              <div
                className="w-max h-min"
                onClick={() => {
                  copyLink(link);
                }}
              >
                <Button color="success" size="md" className="font-bold">
                  <FaCopy className="w-4 h-4 mr-2" /> Click to copy
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <hr className="border-none h-[1px] w-full bg-slate-300/30" />

            <p className="w-full italic font-thin">
              <span>The more you refer, the more you get.</span>
              <br />
              <span className="float-right">Mykola, 2023</span>
            </p>
          </div>
        </div>

        <div
          className={`lg:w-1/2 h-full ${viewPanelBase} flex flex-col py-8 px-8 gap-8 md:px-12 items-center overflow-y-auto`}
        >
          <h1 className="text-2xl xl:text-3xl font-semibold">
            Friends invited
          </h1>

          {users && !isLoading ? (
            <ol className="w-full">
              {users.map((each, ind) => (
                <FriendInvited
                  ind={users.length - ind - 1}
                  userProfilePic={each.image || ""}
                  username={each.username}
                  key={each.id}
                >
                  {each.username}
                </FriendInvited>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </>
  );

  return referralCreated ? buttonClickedCode : buttonNotClickedCode;
};
