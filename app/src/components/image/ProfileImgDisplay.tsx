import Image from "next/image";
import { FC } from "react";
import { ProfileImgPlaceholderSVG } from "../../svgs/ProfileImgPlaceholder";

interface ProfileImgDisplayProps {
  src: string | null | undefined;
  className?: string;
}

export const ProfileImgDisplay: FC<ProfileImgDisplayProps> = ({
  src,
  className,
}) => {
  return (
    <div
      className={`${
        !className ? "w-10 h-10" : className
      } relative text-neutral-400 select-none`}
    >
      {src ? (
        <Image
          src={src}
          fill
          alt="user profile image"
          className="rounded-full"
        />
      ) : (
        <ProfileImgPlaceholderSVG className="w-full h-full" />
      )}
    </div>
  );
};
