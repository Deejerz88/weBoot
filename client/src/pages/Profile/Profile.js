import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { FaEdit } from "react-icons/fa/index.esm.js";
import $ from "jquery";
import { Form, Orders, Address } from "./components";
import "./style.css";
// import AvatarEditor from "react-avatar-editor";
// import Dropzone from "react-dropzone";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [formState, setFormState] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    image: null,
    address: {
      street: null,
      city: null,
      state: null,
      zip: null,
    },
  });
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);
  // const [imagePreview, setImagePreview] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const { loading, data } = useQuery(QUERY_USER);
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  // const [imageChanged, setImageChanged] = useState(false);
  // const [editor, setEditor] = useState(null);
  // const userData = data?.user || {};
  const [editingAddress, setEditingAddress] = useState(false);

  useEffect(() => {
    if (data) {
      console.log("userData", data.user);
      setUserData(data.user);
      setFormState({
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        image: data.user.image,
        address: {
          street: data.user.address?.street,
          city: data.user.address?.city,
          state: data.user.address?.state,
          zip: data.user.address?.zip,
        },
      });
    }
  }, [data]);
  useEffect(() => {
    if (Auth.loggedIn()) {
      setLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    if (error) {
      console.log("error", error);
    }
  }, [error]);
  useEffect(() => {
    console.log("formState", formState);
  }, [formState]);

  // const handleDrop = (dropped) => {
  //   console.log("dropped", dropped);
  //   const file = dropped[0];
  //   setImagePreview(file);
  //   const path = `/assets/images/uploads/profile-${userData._id}.jpg`;
  //   setFormState({
  //     ...formState,
  //     image: path,
  //   });
  //   setImageChanged(true);
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("formState", formState);
    try {
      if (!formState.password) delete formState.password;
      const { data } = await updateUser({
        variables: { ...formState },
      });
      console.log("data", data);
      setUserData(data.updateUser);
      setEditing(false);
      setEditingAddress(false);
      setChanged(false);
      setShowPasswordConfirm(false);
      $('[name="passwordConfirm"]').val("");
      $('[name="password"]').val("");
    } catch (err) {
      console.error(err);
    }
  };
  const handleInputChange = (event) => {
    const { name, value, defaultValue } = event.target;
      const changed = value !== defaultValue;

    if (name.includes("address")) {
      if (changed) setEditingAddress(true)
      else setEditingAddress(false)
      const address = { ...formState.address };
      address[name.split("-")[1]] = value;
      setFormState({
        ...formState,
        address,
      });
    } else {
      setChanged(changed);
      console.log("name", name, "value", value);
      if (changed) {
        setEditing(true);
        if (name.includes("password")) setShowPasswordConfirm(true);
      } else {
        setShowPasswordConfirm(false);
        $('[name="passwordConfirm"]').val("");
      }
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   const target = $(e.target);
  //   const type =
  //     target.attr("id")?.split("-")[1] ||
  //     target.parent().attr("id").split("-")[1] ||
  //     target.attr("id");
  //   console.log("type", type);
  //   switch (type) {
  //     case "icon":
  //       setEditing(!editing);
  //       break;
  //     // case "save":
  //     //   setImageChanged(false);
  //     //   try {
  //     //     console.log("formState", formState);
  //     //     if (!formState.password) delete formState.password;

  //     //     const { data } = await updateUser({
  //     //       variables: { ...formState },
  //     //     });
  //     //     console.log("data", data);
  //     //     const id = userData._id;
  //     //     if (editor) {
  //     //       const canvas = editor.getImage();
  //     //       const img = editor.getImageScaledToCanvas().toDataURL();
  //     //       console.log("canvas", canvas, "img", typeof img);
  //     //       const newImg = { data: img, contentType: "image/png" };
  //     //       axios.post(`image/${id}`, { newImg }).then((res) => {
  //     //         console.log("res", res);
  //     //       });
  //     //     }
  //     //   } catch (err) {
  //     //     console.error(err);
  //     //   }
  //     //   break;
  //     // case "cancel":
  //     //   setImageChanged(false);
  //     //   setImagePreview(null);
  //     //   break;
  //     default:
  //       break;
  //   }
  // };
  // const setEditorRef = (editor) => setEditor(editor);
  return (
    <Container fluid>
      <Row className="justify-content-center form-container">
        {/* <Col xs={2}>
          <Image/>
        </Col> */}
        <Col className="m-5" xs={8} id="profile-info">
          <Form
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            userData={userData}
            editing={editing}
            setEditing={setEditing}
            showPasswordConfirm={showPasswordConfirm}
            setShowPasswordConfirm={setShowPasswordConfirm}
            changed={changed}
            setChanged={setChanged}
          />
        </Col>
        {/* <Col id="col-icon" hidden={!loggedIn} onClick={handleClick}>
          <FaEdit id="edit-icon" />
        </Col> */}
      </Row>
      <Row className="justify-content-center">
        <Col xs={4}>
          <h2 id="order-title">Order History</h2>
          <Orders orders={userData.orders} />
        </Col>
        <Col xs={4}>
          <h2 id="address-title">Address</h2>
          <Address
            address={userData.address}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            editingAddress={editingAddress}
            setEditingAddress={setEditingAddress}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
