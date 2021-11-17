import React, { useState, useContext } from "react";
import axios from "axios";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";
import { Col, Card, Modal, Image, Button } from "react-bootstrap";
import { AuthContext } from "../store/auth-context";
import { BsFillTrashFill } from "react-icons/bs";
import LoadingSpinner from "./UI/LoadingSpinner";

const GalleryItem = ({ item, onDelete }) => {
  const { uid } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };
  const deleteHandler = () => {
    if (window.confirm("Delete this item?")) {
      setLoading(true);
      const desertRef = ref(storage, item.imageUrl);
      deleteObject(desertRef)
        .then(() => {
          console.log("strage deletesuccess");
        })
        .catch((error) => {
          setError(error);
        });
      axios
        .delete(
          `https://your-photo-album-default-rtdb.firebaseio.com/images/${uid}/${item.id}.json`
        )
        .then((res) => {
          onDelete();
          setShowModal(false);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  };
  return (
    <>
      <Modal
        show={showModal}
        onHide={hideModalHandler}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          {loading && <LoadingSpinner text="Deleting..." />}
          {error && <p className="error">{error}</p>}
        </Modal.Header>
        <Modal.Body>
          <Image src={item.imageUrl} fluid />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteHandler}>
            <BsFillTrashFill style={{ fontSize: "1.3rem" }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Col
        onClick={showModalHandler}
        lg={3}
        md={4}
        sm={6}
        xs={12}
        style={{ margin: "0.7rem 0" }}
      >
        <Card className="hover">
          <Card.Img
            src={item.imageUrl}
            style={{ height: "20rem", objectFit: "cover" }}
          />
        </Card>
      </Col>
    </>
  );
};

export default GalleryItem;
