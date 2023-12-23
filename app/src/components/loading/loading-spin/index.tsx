import dynamic from "next/dynamic";

export const LoadingSpin = dynamic(() => import("./Component"), { ssr: false });
