import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectConversationIndex, setSelectConversationIndex] = useState(0);
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }]
    });
  }

  function addMessageToConversation({ recipients, text, sender }) {
    setConversations(prevConversations => {
      let madeChange = false;
      const newMessage = { sender, text };
      const newConversations = prevConversations.map(convo => {
        if (arrayEquality(convo.recipients, recipients)) {
          madeChange = true;
          return { 
            ...convo, 
            messages: [...convo.messages, newMessage]
          };
        }

        return convo;
      });

      if (madeChange) {
        return newConversations;
      } else {
        return [
          prevConversations, 
          { recipients, messages: [newMessage] }
        ];
      }
    });
  }

  function sendMessage(recipients, text) {
    addMessageToConversation({recipients, text, sender: id})
  }

  const formattedConversations = conversations != null && conversations.map((conversation, index) => {
    const recipients = Array.from(conversation.recipients != null && conversation.recipients).map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = Array.from(conversation != null && conversation.messages).map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    }); //TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))

    const selected = index === selectConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectConversationIndex,
    createConversation
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if ((a !== undefined && a.length) && (b !== undefined && b.length)) {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((e, i) => {
      return e === b[i];
    });
  }
}