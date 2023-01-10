import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import { Avatar } from '@mui/material';
import { PsychologyAlt, QuestionAnswer } from '@mui/icons-material';
import QuestionBox from '../QuestionBox';
import './QuestionChatBoxWindow.scss';

const QuestionChatBoxWindow = () => {
  const [openChat, setOpenChat] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'user2 has joined the conversation',
      timestamp: 1578366389250,
      type: 'notification',
    },
    {
      author: {
        username: 'me',
        id: 1,
        avatarUrl:
          'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
      },
      text: 'Hi',
      type: 'text',
      timestamp: 1578366393250,
    },
    {
      author: {
        username: 'user2',
        id: 2,
        avatarUrl:
          'https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg',
      },
      text: 'Show two buttons',
      type: 'text',
      timestamp: 1578366425250,
      buttons: [
        {
          type: 'URL',
          title: 'Create a question poll',
          payload: 'http://www.yahoo.com',
        },
        {
          type: 'URL',
          title: 'Vote for a question poll',
          payload: 'http://www.example.com',
        },
      ],
    },
    {
      author: {
        username: 'me',
        id: 1,
        avatarUrl:
          'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
      },
      text: "What's up?",
      type: 'text',
      timestamp: 1578366425250,
      hasError: true,
    },
  ]);

  const handleOnSendMessage = (message) => {
    setMessages(
      messages.concat({
        author: {
          username: 'me',
          id: 1,
          avatarUrl:
            'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
        },
        text: message,
        timestamp: +new Date(),
        type: 'text',
      }),
    );
  };

  return (
    <div className="chat">
      {openChat && (
        <ChatBox
          className="chat__box"
          messages={messages}
          userId={1}
          onSendMessage={handleOnSendMessage}
          width="30vw"
          minHeight="30vh"
        />
      )}
      {openQuestion && <QuestionBox />}
      <div className="chat__icon-container">
        <Avatar
          sx={{ backgroundColor: 'red' }}
          onClick={() => {
            setOpenChat(false);
            setOpenQuestion(!openQuestion);
          }}
          className="chat__icon"
        >
          <PsychologyAlt />
        </Avatar>
        <Avatar
          sx={{ backgroundColor: 'green' }}
          onClick={() => {
            setOpenQuestion(false);
            setOpenChat(!openChat);
          }}
          className="chat__icon"
        >
          <QuestionAnswer />
        </Avatar>
      </div>
    </div>
  );
};

export default QuestionChatBoxWindow;
