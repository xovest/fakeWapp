import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Conversations from './Conversations';
import Contacts from './Contacts';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const CONVERSATIONS_KEY = 'conversations';
const CONTACTS_KEY = 'contacts';

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
  const [openModal, setOpenModal] = useState(false); 
  const convoOpen = activeKey === CONVERSATIONS_KEY;

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link className="text-success" eventKey={CONVERSATIONS_KEY}>Convos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-success" eventKey={CONTACTS_KEY}>More douches</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-end overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-end small">
          Your ID: <span className="text muted">{id}</span>
        </div>
        <Button onClick={() => setOpenModal(true)} className="btn btn-success rounded-0">
          New {convoOpen ? 'Convo' : 'Douche'}
        </Button>
      </Tab.Container>

      <Modal show={openModal} onHide={closeModal}>
        {convoOpen ? 
        <NewConversationModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} />
        }
      </Modal>
    </div>
  );
}
