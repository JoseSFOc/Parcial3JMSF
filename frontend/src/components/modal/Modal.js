import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const ModalTemplate = ({ modalContent, closeModal }) => {
  const [smShow, setSmShow] = useState(true);

  const close = () => {
    setSmShow(false);
    closeModal();
  };

  return (
    <Modal
      size="sm"
      show={smShow}
      onHide={() => close()}
      aria-labelledby="smallModal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="smallModal">Attention!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => close()}>
          Close
        </Button>
        <Button variant="primary">
          <Link to="/" style={{ color: "inherit", textDecoration: "inherit" }}>
            Return home
          </Link>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTemplate;
