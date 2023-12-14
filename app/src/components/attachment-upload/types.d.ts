export interface FileWithIdAndObjURL {
  file?: File;
  id: string;
  url: string;
  name?: string;
  size?: number;
  objKey?: string;
}
export type FL = FileWithIdAndObjURL[];
