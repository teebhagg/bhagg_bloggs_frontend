import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CustomModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>{props.message}</Modal.Body> */}
      <Modal.Footer>
        <Button variant="outline-danger" onClick={props.action} >Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>
  );
}
