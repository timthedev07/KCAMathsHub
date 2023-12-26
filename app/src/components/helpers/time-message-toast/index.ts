import dynamic from "next/dynamic";

export const TimedMessageToast = dynamic(() => import("./TimedMessageToast"), {
  ssr: false,
});
