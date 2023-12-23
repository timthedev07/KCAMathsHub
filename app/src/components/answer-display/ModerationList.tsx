import { useSession } from "next-auth/react";
import { MDXRemote } from "next-mdx-remote";
import { Dispatch, FC, SetStateAction } from "react";
import { FaUserCheck } from "react-icons/fa6";
import { dateTimeDisplay } from "../../lib/datetimeDisplay";
import { pageURLs } from "../../lib/pageURLGen";
import { OptionalLinkWrapper } from "../helpers/OptionalLinkWrapper";
import { ProfileImgDisplay } from "../image/ProfileImgDisplay";
import { mdxCustomComponents } from "../mdx/components";
import { StyledWrapper } from "../richtext/StyledWrapper";
import { DeleteModeration } from "./DeleteModeration";
import { Arg } from "./type";

interface ModerationListProps {
  moderations: Arg | null;
  closeModerations: () => void;
  isOpen: boolean;
  setModerations: Dispatch<SetStateAction<Arg | null | undefined>>;
}

const ModerationList: FC<ModerationListProps> = ({
  moderations,
  closeModerations,
  isOpen,
  setModerations,
}) => {
  const { data: session } = useSession();
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
          closeModerations();
        }
      }}
      className={`w-full transition duration-300 ${
        isOpen ? "bg-black/90 z-40" : "bg-transparent -z-20"
      } h-screen absolute top-0 left-0 flex justify-center items-center`}
    >
      <ul
        className={`border z-30 border-slate-400/20 py-8 rounded-2xl h-[70vh] min-h-[300px] overflow-y-auto bg-[#101318] w-full max-w-[728px] min-w-[240px] mx-12 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-bold px-8">Moderations</h2>
        <hr className="bg-slate-400/20 mt-8 h-[1px] w-full border-0" />
        {!!moderations &&
          moderations?.mods.map(
            (
              {
                id,
                anonymous,
                approval,
                moderationComment,
                moderator,
                timestamp,
              },
              ind
            ) => {
              const canEdit = Boolean(
                session && session.user.username === moderator?.username
              );
              return (
                <li key={id} className="flex flex-col p-8 gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-4">
                      <OptionalLinkWrapper
                        hasLink={Boolean(!anonymous)}
                        href={pageURLs.user(moderator!.username)}
                      >
                        <div className="flex gap-3 items-center w-fit">
                          <ProfileImgDisplay
                            className="w-6 h-6"
                            src={!anonymous ? moderator?.image : null}
                          />
                          <span
                            className={`text-white/90 text-sm ${
                              anonymous ? "italic" : "font-mono"
                            }`}
                          >
                            {anonymous
                              ? "Anonymous"
                              : moderator?.username || "deleted user"}
                          </span>
                        </div>
                      </OptionalLinkWrapper>
                      <span className="text-sm text-white/50">
                        {dateTimeDisplay(timestamp)}
                      </span>
                    </div>
                    {approval && (
                      <div className="rounded-full flex gap-2 items-center text-xs p-2 bg-green-600/70 font-semibold px-5">
                        <FaUserCheck />
                        Answer approved
                      </div>
                    )}
                  </div>

                  <StyledWrapper className="overflow-x-scroll mt-2">
                    <div className="overflow-x-scroll max-h-[600px] overflow-y-auto min-h-[100px] [&>*]:mb-4 [&>p]:text-white/80 [&>p]:text-sm">
                      {!!moderationComment ? (
                        <MDXRemote
                          {...moderationComment}
                          components={mdxCustomComponents}
                        />
                      ) : null}
                    </div>
                  </StyledWrapper>
                  <div className="h-8 w-full flex gap-4 justify-center md:justify-end">
                    {canEdit && (
                      <DeleteModeration
                        setState={setModerations}
                        color="dark"
                        moderationId={id}
                        aid={moderations.aid}
                      />
                    )}
                  </div>
                  {ind !== moderations.mods.length - 1 ? (
                    <hr className="bg-slate-400/20 mt-8 h-[1px] w-full border-0" />
                  ) : null}
                </li>
              );
            }
          )}
      </ul>
    </div>
  );
};

export default ModerationList;
