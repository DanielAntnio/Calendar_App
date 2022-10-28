import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

export function SignOutFunction() {
  signOut(auth).catch(alert);
}
