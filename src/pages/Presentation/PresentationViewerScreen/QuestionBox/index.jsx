/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from 'react';
import { SendSharp, ThumbUp } from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import { getChats, getQuestions } from '@services/presentation.service';
import { useParams } from 'react-router-dom';
import { ANONYMOUS_USER_ID } from '@constants/Presentation';

const sampleQuestionList = [
  {
    text: '',
    createdAt: '2021-01-01T10:10:10.000Z',
    username: 'trinhvnguyen',
    voteNumber: 20,
  },
];

const formattedTime = (time) => {
  const date = new Date(time);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor(diff / (1000 * 60 * 60));
  const minute = Math.floor(diff / (1000 * 60));
  const second = Math.floor(diff / 1000);
  return year > 0
    ? `${year} year${year > 1 ? 's' : ''} ago`
    : day > 0
    ? `${day} day${day > 1 ? 's' : ''} ago`
    : hour > 0
    ? `${hour} hour${hour > 1 ? 's' : ''} ago`
    : minute > 0
    ? `${minute} minute${minute > 1 ? 's' : ''} ago`
    : `${second} second${second > 1 ? 's' : ''} ago`;
};

const QuestionBox = ({ socket }) => {
  const profile = JSON.parse(localStorage.getItem('profile'));
  const { firstName: username } = profile || {
    username: 'Anonymous',
  };
  const param = useParams();
  const [questionList, setQuestionList] = useState([
    {
      id: '',
      presentationId: param.id,
      userId: ANONYMOUS_USER_ID,
      username: 'Anonymous',
      createdAt: Date.now(),
      text: '',
      voteNumber: 0,
    },
  ]);
  const [text, setText] = useState('');
  const divRef = useRef(null);
  const ref = useRef(null);
  const [fetching, setFetching] = useState(false);
  const [isVotedList, setIsVotedList] = useState(
    Array(questionList.length || 0).fill(false),
  );
  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim()) {
      const sentQuestion = {
        presentationId: param.id,
        userId: profile?.id || ANONYMOUS_USER_ID,
        username: profile?.firstName || 'Anonymous',
        createdAt: Date.now(),
        text,
        voteNumber: 0,
      };

      socket.emit('sendQuestion', {
        presentationId: param.id,
        question: sentQuestion,
      });
    }
    setText('');
  };
  const handleUpVote = async (idx) => {
    const isVotedYet = isVotedList[idx];
    const newQuestionList = [...questionList];
    const newResultQuestion = newQuestionList[idx];
    if (isVotedYet) {
      newResultQuestion.voteNumber -= 1;
    } else {
      newResultQuestion.voteNumber += 1;
    }
    const newIsVotedList = [...isVotedList];
    newIsVotedList[idx] = !isVotedYet;
    // setQuestionList(newQuestionList);
    setIsVotedList(newIsVotedList);
    await socket.emit('updateVoteQuestion', newResultQuestion);
  };
  useEffect(() => {
    socket.on('receiveQuestion', (data) => {
      const { presentationId } = data;
      const newQuestionList = [...questionList];
      newQuestionList.push(data);
      if (presentationId === param.id) {
        setQuestionList(newQuestionList);
      }
    });
  }, [socket, questionList]);
  useEffect(() => {
    setFetching(true);
    getQuestions(param.id).then((data) => {
      setQuestionList(data);
    });
    setFetching(false);
  }, [questionList]);

  return (
    <Box
      sx={{
        height: '60vh',
        width: '50vw',
        display: 'flex',
        backgroundColor: 'white',
        margin: 'auto',
        // marginTop: '1rem',
        borderRadius: '10px',
        // padding: '1rem',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div
        // ref={divRef}
        style={{
          overflowY: 'scroll',
          scrollBehavior: 'smooth',
          flexShrink: 0,
          height: '75%',
          width: '100%',
        }}
      >
        {questionList.length && !fetching ? (
          questionList.map((question, idx) => {
            return (
              <Box
                // ref={question.ref}
                key={idx}
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  padding: '.3rem',
                  width: '99%',
                  ':hover': {
                    backgroundColor: 'rgba(62, 67, 150,0.8);',
                    color: 'white',
                  },
                }}
              >
                <img
                  width={40}
                  height={40}
                  src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                  alt={question.username || 'Anonymous'}
                  style={{ borderRadius: '50%' }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      ':hover': {
                        color: 'white',
                      },
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: '600' }}>
                      {question.username || 'Anonymous'}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="black"
                      sx={{
                        ':hover': {
                          color: 'white',
                        },
                      }}
                    >
                      {formattedTime(question.createdAt || Date.now())}
                    </Typography>
                  </Box>
                  <p
                    style={{
                      width: '99%',
                      wordBreak: 'break-word',
                      fontWeight: 'lighter',
                    }}
                  >
                    {question.text}
                  </p>
                </Box>

                {/* <Avatar> */}
                <IconButton aria-label="cart" onClick={() => handleUpVote(idx)}>
                  <Badge
                    color="primary"
                    badgeContent={question.voteNumber}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <ThumbUp
                      sx={{
                        stroke: isVotedList[idx] ? 'green' : 'black',
                        color: isVotedList[idx] ? 'green' : 'white',
                        ':hover': {
                          color: 'white',
                        },
                      }}
                    />
                  </Badge>
                </IconButton>
                {/* </Avatar> */}
              </Box>
            );
          })
        ) : fetching ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  width: '100%',
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    justifyContent: 'flex-start',
                    width: '100%',
                  }}
                >
                  <Skeleton width={100} />
                  <Skeleton width={200} />
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography variant="body1" color="GrayText" sx={{ m: 2 }}>
            No questions yet
          </Typography>
        )}
        <TextField
          sx={{
            width: '94%',
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
          }}
          placeholder="Enter your question here"
          disabled={fetching && !questionList.length}
          autoComplete="off"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend(e);
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton
                disabled={fetching && !questionList.length}
                onClick={(e) => handleSend(e)}
              >
                <SendSharp />
              </IconButton>
            ),
          }}
        />
      </div>
    </Box>
  );
};

export default QuestionBox;
