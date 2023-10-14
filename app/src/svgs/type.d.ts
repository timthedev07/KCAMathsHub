import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";

export type SVGType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
>;
