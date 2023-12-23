import dynamic from "next/dynamic";

export type ToastLevel = "success" | "info" | "warning" | "error";

export const TimedMessageToast = dynamic(() => import("./TimedMessageToast"), {
  ssr: false,
});
