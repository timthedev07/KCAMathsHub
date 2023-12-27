export const StudentStages = ["Primary", "KS3", "KS4", "KS5"];
const _ = ["Primary", "KS3", "KS4", "KS5"] as const;
export type StudentStageType = (typeof StudentStages)[number];
