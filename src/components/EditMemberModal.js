import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateMember } from '../services/api';

const EditMemberModal = ({ show, onHide, member, reload }) => {
  const [formData, setFormData] = useState({ ...member });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { _id, ...updateData } = formData; // Exclude _id from the request payload

    try {
      await updateMember(member._id, updateData); // Send only editable fields
      reload();
      onHide();
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member. Please try again.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Parent ID</Form.Label>
            <Form.Control
              type="text"
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMemberModal;
