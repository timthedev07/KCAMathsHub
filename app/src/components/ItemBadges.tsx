import { FC } from "react";
import {
  FaCheckCircle,
  FaUser,
  FaUserCheck,
  FaUserSecret,
} from "react-icons/fa";
import { HiChevronDoubleUp } from "react-icons/hi";

export const Moderated = () => (
  <div className="bg-blue-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUser className="w-5 h-5 text-blue-400" />
  </div>
);

export const Approved = () => (
  <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
    <FaUserCheck className="w-5 h-5 text-green-400" />
  </div>
);
export const Accepted: FC<{ hasBg?: boolean }> = ({ hasBg = true }) => {
  return hasBg ? (
    <div className="bg-green-300/20 rounded-md w-8 h-8 flex justify-center items-center">
      <FaCheckCircle className="w-5 h-5 text-green-400" />
    </div>
  ) : (
    <FaCheckCircle className="w-5 h-5 text-green-400" />
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
