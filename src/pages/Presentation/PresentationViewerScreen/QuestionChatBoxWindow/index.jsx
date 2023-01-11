/* eslint-disable no-sequences */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import { PsychologyAlt, QuestionAnswer } from '@mui/icons-material';
import { getChats } from '@services/presentation.service';
import { ANONYMOUS_USER_ID } from '@constants/Presentation';
import QuestionBox from '../QuestionBox';
import './QuestionChatBoxWindow.scss';

const QuestionChatBoxWindow = ({ socket }) => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const { firstName: username, id: profileId } = profile || {
    username: 'Anonymous',
    id: ANONYMOUS_USER_ID,
  };
  // eslint-disable-next-line prefer-template
  const param = useParams();
  const [openChat, setOpenChat] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getChats(param.id).then((data) => {
      const formattedData = data.map((item) => {
        const formattedMessage = {
          author: {
            username: item.username,
            id: item.user === profileId ? 1 : item.user,
            avatarUrl:
              item.user === profileId
                ? 'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png'
                : 'https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg',
          },
          text: item.text,
          type: 'text',
          timestamp: item.createdAt,
        };
        return formattedMessage;
      });
      setMessages(formattedData);
    });
  }, []);
  useEffect(() => {
    socket.on('messageResponse', (data) => {
      const { author, presentationId } = data;
      if (presentationId === param.id) {
        const renderData = { ...data };
        if (author.id === profileId) {
          renderData.author.username = 'me';
          renderData.author.id = 1;
        }
        setMessages([...messages, data]);
      }
    });
  }, [socket, messages]);

  const handleOnSendMessage = (message) => {
    if (message.trim()) {
      const sentMsg = {
        author: {
          username: username || 'Anonymous',
          id: profileId || ANONYMOUS_USER_ID,
          avatarUrl:
            'https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png',
        },
        text: message,
        type: 'text',
        timestamp: Date.now(),
        socketID: socket.id,
        presentationId: param.id,
      };
      socket.emit('message', { presentationId: param.id, message: sentMsg });
    }
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
      {openQuestion && <QuestionBox socket={socket} />}
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
