"use client";
import { useSession } from "next-auth/react";
import { FC, PropsWithChildren } from "react";
import { trpc } from "../../../trpc/client";
import { Button } from "../../reusable/Button";
import { viewPanelBase } from ".";
import { LoadingSpin } from "../../LoadingSpin";
import { useState } from "react";
import { LogoSVG } from "@/components/Logo";

export const ReferralTab: FC = ({}) => {
  const { data, status } = useSession();
  const { data: referralData } = trpc.getReferralEntity.useQuery({
    userId: data?.user.id,
  });
  const { getReferralEntity } = trpc.useUtils();
  const initReferral = trpc.initReferral.useMutation({
    onSuccess: async () => {
      getReferralEntity.invalidate();
    },
  }).mutateAsync;

  const [buttonClicked, setButtonClicked] = useState(false);

  if (status === "loading") {
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
      className={`bg-slate-900/60 rounded-xl shadow-2xl w-full h-[70vh] flex gap-4 flex-col items-center p-2`}
    >
    <LogoSVG className="w-32 h-32 mt-[100px]" />
    <p className="text-5xl mt-[10px]">
      Refer a friend and boost your question
    </p>
    {link ? (
       <div className="mt-[30px]">
        <Button
          size="xl"
          color="cyan"
          onClick={() => {
            navigator.clipboard.writeText(link);
            setButtonClicked(!buttonClicked)
          }}
        >
          Copy Referral Link
        </Button>
        </div>
    ) : null}
    {!referralCreated ? (
      <div className="mt-[30px]">
        <Button
          size="xl"
          className=""
          onClick={async () => {
            await initReferral({ userId: u.id });
            setButtonClicked(true);
          }}
        >
          Create referral link
        </Button>
      </div>
    ) : null}
  </div>)


  const FriendInvited: FC<PropsWithChildren> = ({children}) => {
    return(
        <div className="w-full flex justify-between text-2xl bg-slate-700 p-[10px] rounded-xl mt-[10px]">
          <div className="">{children}</div>
          <div>+50xp</div>
        </div>       
    )
  }


  const buttonClickedCode = (
    <div className="w-full sm:w-10/12 min-w-[460px] sm:mx-auto lg:w-full h-auto lg:h-[70vh] flex lg:flex-row flex-col gap-8 p-2">
      <div
        className={`lg:w-1/2 h-full ${viewPanelBase} flex flex-col py-8 px-8 md:px-12 items-center`}
      >
        <p className="text-4xl font-semibold">
          Your referal link
        </p>
        <div className="mt-[40px] h-[50px] flex items-center justify-center bg-slate-700 px-[20px] rounded-xl">{link}</div>
        <div className="flex w-full justify-end mt-[10px]">
         
            <Button
            color="cyan"
            onClick={() => {
              if (link) navigator.clipboard.writeText(link);
            }}
            >
              Copy Link
            </Button>
        </div>
        <p className="w-full text-3xl mt-[70px] italic"> The more you refer - </p>
        <p className="text-3xl ml-auto italic">The more you get</p>
      </div>



      <div
        className={`lg:w-1/2 h-full ${viewPanelBase} flex flex-col py-8 px-8 md:px-12 items-center`}
      >
        <p className="text-4xl mb-[30px] font-semibold">
          Friends invited
        </p>
        
        <FriendInvited>Mykola</FriendInvited>
        <FriendInvited>Tim</FriendInvited>
        <FriendInvited>Elena</FriendInvited>
      
      </div>
    </div>  
  )
  return (
    referralCreated ? buttonClickedCode : buttonNotClickedCode
  );
};
