import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export const isLogged = async () =>
  onAuthStateChanged(auth, user => {
    if (!user) window.location.href = './login'
  });
