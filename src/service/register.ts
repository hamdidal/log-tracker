import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const register = async (email: string, password: string) => {

const auth = getAuth();

return await createUserWithEmailAndPassword(auth, email, password)

};