import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsProvider';

export default function OpenConversation() {
  const [text, setText] = useState('');
  const { sendMessage, selectedConversation } = useConversations();

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(
      selectedConversation.recipients.map(recipient => recipient.id),
      text
    );
    setText('');
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="h-100">

        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control 
              as="textarea" 
              required 
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Text>
              <Button variant="success" type="submit">Tweek</Button>
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
