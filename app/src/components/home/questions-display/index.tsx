import { FC } from "react";
import { InfiniteScrollingDisplay } from "./InfiniteScrollingDisplay";
import { InfiniteScrollingDisplayProps } from "./props.types";

export const HPQuestionsDisplay: FC<{} & InfiniteScrollingDisplayProps> = ({
  ...rest
}) => {
  return <InfiniteScrollingDisplay {...rest} />;
};
