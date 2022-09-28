import { FC, Fragment, ReactNode, useEffect, useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalContext } from "../../context";

interface AuthProps {
  children: ReactNode;
}
const Auth: FC<AuthProps> = ({ children }) => {
  const {user, setUser} = useContext(GlobalContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (authUser) => {
      if ( authUser === null) {
        navigate("/login");
      } else {
        setUser({ userName:authUser.displayName ?? "", userId:authUser.uid ?? ""})
        navigate("/");
      }
    });
  }, [user, setUser]);
  return <Fragment>{children}</Fragment>;
};

export default Auth;
