import { forwardRef, SVGProps } from "react";

export const ProfileImgPlaceholderSVG = forwardRef<
  SVGSVGElement,
  SVGProps<SVGSVGElement>
>(({ ...props }, ref) => {
  return (
    <svg ref={ref} viewBox="0 0 512 512" {...props}>
      <path
        fill="currentColor"
        d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 128c39.77 0 72 32.24 72 72s-32.2 72-72 72c-39.76 0-72-32.24-72-72s32.2-72 72-72zm0 320c-52.93 0-100.9-21.53-135.7-56.29C136.5 349.9 176.5 320 224 320h64c47.54 0 87.54 29.88 103.7 71.71C356.9 426.5 308.9 448 256 448z"
      />
    </svg>
  );
});

ProfileImgPlaceholderSVG.displayName = "ProfileImgPlaceholder";