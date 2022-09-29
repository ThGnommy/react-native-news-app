import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const user: any = auth.currentUser;

export const readFirebaseUserData = async () => {
  const userRef = doc(db, "users", user?.uid);
  const userData = await getDoc(userRef);

  if (userData.exists()) {
    console.log("User data:", userData.data());
    // return userData.data();
  } else {
    console.log("No such document!");
  }
};
