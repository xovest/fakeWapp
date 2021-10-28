import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';
import { useConversations } from '../context/ConversationsProvider';

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    createConversation();
    closeModal();
  }

  function handleCheckboxChange(contactId) {
    setSelectedContactIds(prevSelelectedContactIds => {
      if (prevSelelectedContactIds.includes(contactId)) {
        return prevSelelectedContactIds.filter(prevId => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelelectedContactIds, contactId];
      }
    });
  }

  return (
    <>
      <Modal.Header closeButton>Add the convo</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
              <Form.Group controlId={contact.id} key={contact.id}>
                <Form.Check
                  type="checkbox"
                  value={selectedContactIds.includes(contact.id)}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact.id)}
                />
              </Form.Group>
          ))}
          <Button className="btn btn-success m-2" type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}