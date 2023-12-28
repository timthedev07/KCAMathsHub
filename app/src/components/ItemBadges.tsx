import { FC } from "react";
import {
  FaCheckCircle,
  FaUser,
  FaUserCheck,
  FaUserSecret,
} from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { HiChevronDoubleUp } from "react-icons/hi";

type HasBg = FC<{ hasBg?: boolean; className?: string }>;

export const Moderated = () => (
  <div className="bg-blue-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUser className="w-5 h-5 text-blue-400" />
  </div>
);

export const Cross: HasBg = ({ hasBg = true, className = "" }) => {
  return hasBg ? (
    <div className="bg-red-300/20 rounded-md w-8 h-8 flex justify-center items-center">
      <FaCircleXmark className="w-5 h-5 text-red-400" />
    </div>
  ) : (
    <FaCircleXmark className={"w-5 h-5 text-red-400 " + className} />
  );
};

export const Approved = () => (
  <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUserCheck className="w-5 h-5 text-green-400" />
  </div>
);
export const Accepted: HasBg = ({ hasBg = true, className = "" }) => {
  return hasBg ? (
    <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
      <FaCheckCircle className="w-5 h-5 text-green-400" />
    </div>
  ) : (
    <FaCheckCircle className={"w-5 h-5 text-green-400 " + className} />
  );
};

export const Anonymous = () => (
  <div className="bg-amber-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUserSecret className="w-5 h-5 text-amber-400" />
  </div>
);

export const Boosted = () => (
  <div className="bg-yellow-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <HiChevronDoubleUp className="w-5 h-5 text-yellow-400" />
  </div>
);
