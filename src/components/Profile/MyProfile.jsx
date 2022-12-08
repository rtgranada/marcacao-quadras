import React, { useState, useEffect } from "react";
import { doc, getDoc } from "@firebase/firestore";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/UserAuthContext";
import { db } from "../../firebase";
import {
  ref,
  set,
  get,
  update,
  remove,
  child,
  onValue,
} from "firebase/database";
import nonPicture from "../../imgs/NoNPictureUser.png";
import ReactWhatsapp from "react-whatsapp";
import {
  BsInstagram,
  BsWhatsapp,
  BsXCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { FaBirthdayCake } from "react-icons/fa";
import { MdOutlineEmail, MdPhone } from "react-icons/md";
import { RiLogoutCircleLine, RiEditCircleLine } from "react-icons/ri";
import { CrudEditPanel } from "./CrudEditPanel";

export const MyProfile = () => {
  const { logOut, user } = useUserAuth();

  const navigate = useNavigate();
  const [userLimpo, setUserLimpo] = useState("");
  const [userDoc, setUserDoc] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userSocial, setUserSocial] = useState("");
  const [userCustomatization, setUserCustomatization] = useState("");
  const [userId, setUserId] = useState("");

  async function fetchUser() {
    const str = localStorage.getItem("uKey");
    const Nstr = str.substring(1, str.length - 1);
    user.uid ? setUserId(user.uid) : setUserId(Nstr);
    if (userId) {
      const queryUser2 = ref(db, "users/" + userId);
      onValue(queryUser2, (snapshot) => {
        setUserDoc(snapshot.val());
      });
      // await get(child(queryUser, userId)).then((users) => {
      //   //setUserLimpo(users.val());
      //   // const userInfo = users.val().userInfo;
      //   // delete userInfo.phone;
      //   // delete userInfo.social;
      //   // setUserInfo(userInfo);
      //   // setUserPhone(users.val().userInfo.phone);
      //   // setUserSocial(users.val().userInfo.social);
      //   // setUserCustomatization(users.val().userInfo.customatization);
      //   // const basicUser = users.val();
      //   // delete basicUser.userInfo;
      //   // delete basicUser.social;
      //   // delete basicUser.customatization;
      //   setUserDoc(users.val());
      // });
    }
  }

  const getAllInputs = () => {
    const resultado = {
      uid: userDoc.uid,
      online: userDoc.online,
      name: userDoc.name,
      cover: userDoc.cover,
      birth: userDoc.birth,
      phoneNumber: userDoc.number,
      isWhats: userDoc.whats,
      city: userDoc.city,
      email: userDoc.email,
      instagram: userDoc.instagram,
      facebook: userDoc.facebook,
      tiktok: userDoc.tiktok,
      twitter: userDoc.twitter,
    };
    console.log("resultado", resultado);
    return resultado;
  };

  const updateData = () => {
    console.log("user", userDoc);
    const data = getAllInputs();
    console.log("data", data);
    update(ref(db, "users/" + data.uid), {
      online: data.online,
      name: data.name,
      cover: data.cover,
      birth: data.birth,
      phoneNumber: data.number,
      isWhats: data.whats,
      city: data.city,
      email: data.email,
      instagram: data.instagram,
      facebook: data.facebook,
      tiktok: data.tiktok,
      twitter: data.twitter,
    })
      .then(() => {
        alert("update realizado com sucesso");
      })
      .catch((error) => {
        alert("houve um erro, detalhes: " + error);
      });
  };

  useEffect(() => {
    console.log("user", user);
    const queryUser2 = ref(db, "users/" + user.uid);
    onValue(queryUser2, (snapshot) => {
      console.log("valores", snapshot.val());
      setUserDoc(snapshot.val());
    });
  }, [user]);

  const handleChangePhone = (type, e) => {
    const value = e.target.value;
    setUserPhone((prevState) => ({
      number: value,
      ...prevState,
    }));
    // setUserDoc({ userInfo.phone.number: e.target.value });
    const userRef = ref(db, "users/" + userId);
    console.log("teste", userRef);
    //    userRef.child("userInfo").child("phone").update({ number: e.target.value });
    console.log("type", type);
    console.log("value", value);

    const teste = updateData();
    console.log("teste", teste);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  if (userDoc) {
    return (
      <>
        {console.log("o que vem", userDoc)}
        <div className="p-4 box mt-3 text-center profileCard">
          <div className="row">
            <div className="col-2">
              {userDoc?.cover ? (
                <img src={userDoc?.cover} alt="" className="coverProfile" />
              ) : (
                <img src={nonPicture} alt="" className="coverProfile" />
              )}
            </div>

            <div className="col-6 profileInfos">
              <label htmlFor="name">Nome:</label>

              <input type="text" id="name" defaultValue={userDoc?.name} />
              <br />
              <label htmlFor="email">
                E-mail <MdOutlineEmail /> :
              </label>
              <input type="text" id="email" defaultValue={userDoc?.email} />
              <br />
              <label htmlFor="telefone">
                Telefone <MdPhone /> :
              </label>
              <p>{userDoc?.phoneNumber}</p>

              <br />
              <label htmlFor="aniversario">
                Aniversário <FaBirthdayCake /> :
              </label>
              <input
                type="text"
                id="aniversario"
                defaultValue={userDoc?.birth}
              />
              <br />
              <span>
                Status :{" "}
                {userDoc?.online ? (
                  <BsCheckCircleFill style={{ color: "green" }} />
                ) : (
                  <BsXCircleFill style={{ color: "red" }} />
                )}
              </span>
              <br />
              <div className="row">
                <p>Social</p>
                {userDoc?.instagram && (
                  <a
                    href={`http://www.instagram.com/${userDoc?.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsInstagram />
                  </a>
                )}
                {userDoc?.isWhats && (
                  <ReactWhatsapp number={userDoc?.phoneNumber}>
                    <BsWhatsapp />
                  </ReactWhatsapp>
                )}
              </div>
              <CrudEditPanel uid={userDoc.uid} record={userDoc} />
              <button className="btn btn-warning">
                <RiEditCircleLine />
                Editar
              </button>
            </div>
          </div>
          <div className="aside"></div>
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            <RiLogoutCircleLine /> Sair
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-4 box mt-3 text-center">
          Carregando... <br />
        </div>
        <div className="d-grid gap-2">
          <Button variant="primary" onClick={handleLogout}>
            <RiLogoutCircleLine /> Sair
          </Button>
        </div>
      </>
    );
  }
};
