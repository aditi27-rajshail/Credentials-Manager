import constate from "constate";
import { useState } from "react";

const useAppState_ = () => {
  const [userID, setUserID] = useState("");

  return {
    userID,
    setUserID,
  };
};
export const [AppStateProvider, useAppState] = constate(useAppState_);
