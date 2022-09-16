import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

export const login = async (email: string, password: string) => {

const auth = getAuth();

return await signInWithEmailAndPassword(auth, email, password)

};