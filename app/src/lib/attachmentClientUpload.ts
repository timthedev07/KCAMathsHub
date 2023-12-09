import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { FileWithIdAndObjURL } from "../components/AttachmentUpload";
import { AppRouter } from "../server";
import { ImgUrlsType } from "../types/upload";

export const uploadToAPI = async (
  files: FileWithIdAndObjURL[],
  addAttachments: (
    _: inferRouterInputs<AppRouter>["addAttachments"]
  ) => Promise<inferRouterOutputs<AppRouter>["addAttachments"]>
) => {
  if (files.length < 1) return [];

  const formData = new FormData();
  let i = 0;
  for (const file of files) {
    formData.append(`file_${i}`, file.file);
    i++;
  }
  formData.append("file_count", `${i}`);

  try {
    const res = await fetch("/api/upload", {
      body: formData,
      method: "POST",
    });

    if (!res.ok) {
      return [];
    }

    const data = ((await res.json()) as { imgUrls: ImgUrlsType }).imgUrls;
    const atts = await addAttachments(
      data.map(({ name, ...rest }) => ({
        attachmentName: name,
        ...rest,
      }))
    );
    return atts;
  } catch (err) {
    console.log(err);
    return [];
  }
};
