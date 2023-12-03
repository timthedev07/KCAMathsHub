import { NextPage } from "next";
import { roleChecker, withAccessGuard } from "../../../lib/accessGuard";
import { WithSessionProps } from "../../../types/withSessionPage";
import { Tabs, TabItem, Avatar } from "flowbite-react";
import { getCurrYear } from "../../../lib/getCurrYear";
import { RoleBadge } from "../../../components/user-profile/RoleBadge";
import { UsernameEditable } from "../../../components/user-profile/username-editable";

const Profile: NextPage<WithSessionProps> = async ({ session }) => {
  const u = session!.user;

  return (
    <div className="my-6 mx-8 md:mx-24 rounded-lg">
      <Tabs aria-label="Default tabs" style="underline">
        <TabItem active title="Profile">
          <div className="w-full h-[70vh] flex lg:flex-row flex-col gap-8 p-2">
            {/* This is the main profile section */}
            <div className="shadow-2xl flex-1 w-full h-full bg-slate-900 rounded-xl flex flex-col py-8 px-8 md:px-16">
              <div className="flex items-center gap-8 py-8 flex-col xl:flex-row">
                <Avatar size="xl" rounded img={u.image || undefined} />
                <div className="flex flex-col gap-3 flex-1">
                  <UsernameEditable user={u} />
                  <span className="text-sm text-neutral-300/70 px-2">
                    {u.email}
                  </span>
                  {u.joinedYear ? (
                    <span className="text-sm text-neutral-300/70 px-2">
                      Year {getCurrYear(u.joinedDate, u.joinedYear)}
                    </span>
                  ) : (
                    <></>
                  )}
                  <ul className="flex gap-2 flex-wrap px-2">
                    {["inquirer", "admin", "answerer", "moderator"]
                      .toSorted()
                      .map((each) => (
                        <RoleBadge role={each as any} key={each} />
                      ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 flex-1">
              <div className="shadow-2xl flex-1 bg-slate-900 rounded-xl"></div>
              <div className="shadow-2xl flex-1 bg-slate-900 rounded-xl"></div>
            </div>
          </div>
        </TabItem>
        <TabItem title="Questions"></TabItem>
        {roleChecker(u.roles, ["answerer"]) ? (
          <TabItem title="Answers"></TabItem>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  );
};

export default await withAccessGuard(Profile, [
  "inquirer",
  "admin",
  "answerer",
  "moderator",
]);
