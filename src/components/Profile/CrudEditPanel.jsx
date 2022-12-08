import React, { useState, useEffect } from "react";
import { Button, Modal, InputGroup, Form, Row, Col } from "react-bootstrap";
import {
  ref,
  set,
  get,
  update,
  remove,
  child,
  onValue,
} from "firebase/database";
import { db } from "../../firebase";
export const CrudEditPanel = (props) => {
  console.log("props", props);
  const [mode, setMode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [record, setRecord] = useState();

  const [modCreated, setModCreated] = useState("");
  const [modMsgids, setModMsgids] = useState("");
  const [modOnline, setModOnline] = useState("");
  const [modUid, setModUid] = useState("");
  const [modBirth, setModBirth] = useState("");
  const [modCity, setModCity] = useState("");
  const [modCover, setModCover] = useState("");
  const [modEmail, setModEmail] = useState("");
  const [modName, setModName] = useState("");
  const [modPhoneNumber, setModPhoneNumber] = useState("");
  const [modIsWhats, setModIsWhats] = useState("");
  const [modFacebook, setModFacebook] = useState("");
  const [modInstagram, setModInstagram] = useState("");
  const [modTiktok, setModTiktok] = useState("");
  const [modTwitter, setModTwitter] = useState("");

  useEffect(() => {
    handlePropsRecord();
  }, [props]);
  const handlePropsRecord = () => {
    setRecord({
      created: props.record.created,
      msgids: props.record.msgids,
      online: props.record.online,
      uid: props.record.uid,
      birth: props.record.birth,
      city: props.record.city,
      cover: props.record.cover,
      email: props.record.email,
      name: props.record.name,
      phoneNumber: props.record.phoneNumber,
      isWhats: props.record.isWhats,
      facebook: props.record.facebook,
      instagram: props.record.instagram,
      tiktok: props.record.tiktok,
      twitter: props.record.twitter,
    });
  };
  const openModal = (option) => {
    if (option == "add") {
      setIsOpen(true);
      setMode(option);
      setModName("");
      setModEmail("");
      setModPhoneNumber("");
    } else if (option == "edit") {
      console.log(record);
      let rec = record;
      console.log("rec", rec);
      setModUid(rec.uid);
      setIsOpen(true);
      setMode(option);
      setModBirth(rec.birth);
      setModCity(rec.city);
      setModCover(rec.cover);
      setModCreated(rec.created);
      setModEmail(rec.email);
      setModFacebook(rec.facebook);
      setModInstagram(rec.instagram);
      setModIsWhats(rec.isWhats);
      setModMsgids(rec.msgids);
      setModName(rec.name);
      setModOnline(rec.online);
      setModPhoneNumber(rec.phoneNumber);
      setModTiktok(rec.tiktok);
      setModTwitter(rec.twitter);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getAllData = () => {
    return {
      id: modUid,
      data: {
        birth: modBirth,
        city: modCity,
        cover: modCover,
        created: modCreated,
        email: modEmail,
        facebook: modFacebook,
        instagram: modInstagram,
        isWhats: modIsWhats,
        msgids: modMsgids,
        name: modName,
        online: modOnline,
        phoneNumber: modPhoneNumber,
        tiktok: modTiktok,
        twitter: modTwitter,
      },
    };
  };

  const interfaces = (option) => {
    if (option == "edit") updateData();
    closeModal();
  };

  const updateData = () => {
    const dbRef = ref(db, "users/" + modUid);
    const records = getAllData();
    const address = "users/" + records.id;
    console.log("address", address);
    console.log("record", record);
    onValue(dbRef, (snapshot) => {
      console.log("snap", snapshot);
      console.log("recordData", records.data);
      if (snapshot.exists()) {
        update(ref(db, address), records.data);
      } else {
        alert("Ocorreu um erro");
      }
    });
  };

  return (
    <>
      {/* <Button
        variant="primary"
        className="ms-2"
        onClick={() => openModal("add")}
      >
        Add
      </Button> */}
      <Button
        variant="primary"
        className="ms-2"
        onClick={() => openModal("edit")}
      >
        Edit
      </Button>
      <Modal show={isOpen}>
        <Modal.Header>
          <Modal.Title>{mode === "add" ? "Add" : "Edit"}</Modal.Title>
          <Button size="sm" variant="dark" onClick={() => closeModal()}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Text>Nome</InputGroup.Text>
            <Form.Control
              value={modName}
              onChange={(e) => {
                setModName(e.target.value);
              }}
              disabled={mode != "add"}
            />
          </InputGroup>

          <InputGroup>
            <InputGroup.Text>E-mail</InputGroup.Text>
            <Form.Control
              value={modEmail}
              onChange={(e) => {
                setModEmail(e.target.value);
              }}
            />
          </InputGroup>
          <Row className="mb-3">
            <InputGroup as={Col} md="6">
              <InputGroup.Text>Telefone</InputGroup.Text>
              <Form.Control
                value={modPhoneNumber}
                onChange={(e) => {
                  setModPhoneNumber(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup as={Col} md="6">
              <InputGroup.Text>É WhatsApp</InputGroup.Text>
              <Form.Check
                id="custom-switch"
                label="É whats?"
                defaultChecked={modIsWhats}
                onChange={() => {
                  setModIsWhats(!modIsWhats);
                }}
              />
            </InputGroup>
          </Row>

          <InputGroup>
            <InputGroup.Text>Aniversario</InputGroup.Text>
            <Form.Control
              value={modBirth}
              onChange={(e) => {
                setModBirth(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Cidade</InputGroup.Text>
            <Form.Control
              value={modCity}
              onChange={(e) => {
                setModCity(e.target.value);
              }}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Instagram: @</InputGroup.Text>
            <Form.Control
              value={modInstagram}
              onChange={(e) => {
                setModInstagram(e.target.value);
              }}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            className="ms-2"
            onClick={() => interfaces("edit")}
          >
            Update
          </Button>
          <Button variant="danger" className="ms-2">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
