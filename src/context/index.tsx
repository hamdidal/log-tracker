import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { UserModel } from "../model/User";

export const GlobalContext = React.createContext({
  user: undefined,
  setUser: () => {},
} as GlobalContextModel);

interface Props {
  children?: ReactNode;
}

interface GlobalContextModel {
  user: UserModel | undefined;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
}
const GlobalContextProvider = (props: Props) => {
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  const data: GlobalContextModel = {
    user,
    setUser,
  };
  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
