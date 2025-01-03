import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { addMember } from '../services/api';

const AddMemberModal = ({ show, onHide, reload }) => {
  const [formData, setFormData] = useState({
    name: '',
    Email: '',
    age: '',
    parent_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.Email || !formData.age || !formData.parent_id) {
      alert("All fields are required!");
      return;
    }
    try {
      await addMember(formData);
      reload();
      onHide();
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter member name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              placeholder="Enter member email"
              value={formData.Email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Enter member age"
              value={formData.age}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Parent ID</Form.Label>
            <Form.Control
              type="text"
              name="parent_id"
              placeholder="Enter parent ID"
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
          Add Member
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMemberModal;
