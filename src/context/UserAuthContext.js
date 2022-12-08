import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "@firebase/firestore";
import { ref, set, get, update, remove, child } from "firebase/database";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  // const notificationsCollectionRef = collection(db, "notifications");
  const notificationsCollectionRef = ref(db, "notifications");
  //console.log("notification", notificationsCollectionRef);
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password, name, instagram, phone, cover) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const newUser = result.user;
        const date = new Date();
        const dateBr = date.toLocaleDateString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        if (newUser.metadata.creationTime === newUser.metadata.lastSignInTime) {
          const NovoUsuario = {
            created: dateBr,
            msgids: "",
            uid: newUser.uid,
            online: true,
            name: name,
            cover: cover,
            birth: "",
            phoneNumber: phone,
            isWhats: false,
            city: "",
            email: newUser.email,
            instagram: instagram,
            facebook: "",
            tiktok: "",
            twitter: "",
          };
          // const docRef = doc(db, "users", newUser.uid);
          const docRef = ref(db, "users/" + newUser.uid);
          set(docRef, NovoUsuario)
            .then((docRef) => {
              console.log("Gravado com sucesso");
            })
            .catch((error) => {
              console.log("error", error);
            });
          set(notificationsCollectionRef, {
            notifications: [],
          });
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;

        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        console.log("email", email);
        console.log("credential", credential);
      });
  }
  function logOut() {
    localStorage.removeItem("uKey");
    return signOut(auth);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();

    return signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const newUser = result.user;
        console.log("newUser", newUser);
        const date = new Date();
        const dateBr = date.toLocaleDateString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        if (newUser.metadata.creationTime === newUser.metadata.lastSignInTime) {
          const NovoUsuario = {
            created: dateBr,
            msgids: "",
            uid: newUser.uid,
            online: true,
            name: newUser.displayName,
            cover: newUser.photoURL,
            birth: "",
            phoneNumber: newUser.phoneNumber ? newUser.phoneNumber : "",
            isWhats: false,
            city: "",
            email: newUser.email,
            instagram: "",
            facebook: "",
            tiktok: "",
            twitter: "",
          };

          // const docRef = doc(db, "users", newUser.uid);
          const docRef = ref(db, "users/" + newUser.uid);
          set(docRef, NovoUsuario)
            .then((docRef) => {
              console.log("Gravado com sucesso");
            })
            .catch((error) => {
              console.log("error", error);
            });
          set(notificationsCollectionRef, {
            notifications: [],
          });
        }
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;

        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
        console.log("email", email);
        console.log("credential", credential);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      if (currentuser) {
        localStorage.setItem("uKey", JSON.stringify(currentuser.uid));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
