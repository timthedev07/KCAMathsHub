import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type SVGType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
>;
