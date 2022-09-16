import { FC, Fragment, ReactNode, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalContext } from "../context";

interface AuthProps {
  children: ReactNode;
}
const Auth: FC<AuthProps> = ({ children }) => {
  const globalContext = useContext(GlobalContext)
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if ( user === null) {
        navigate("/login");
      } else {
        globalContext.setUser({ userName:user.displayName ?? "", userId:user.uid ?? ""})
        console.log(globalContext.user)
        navigate("/");
      }
    });
  }, [globalContext, navigate]);
  return <Fragment>{children}</Fragment>;
};

export default Auth;
