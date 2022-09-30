import {
  createUserWithEmailAndPassword,
  getAuth,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

export const login = async (email: string, password: string) => {
  const auth = getAuth()
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logout = async () => {
  const user = getAuth()
  return await signOut(user)
}

export const register = async (email: string, password: string) => {
  const auth = getAuth()
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const onAuthChange = (callback: NextOrObserver<User>) => {
  const auth = getAuth()
  onAuthStateChanged(auth, callback)
}
