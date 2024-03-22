import dayjs from 'dayjs';
import { useRef, useState, useCallback, useMemo } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
// routes
 
 import {useNavigate} from "react-router-dom";
// hooks
import { useMockedUser } from '@/Core/hooks/use-mocked-user';
// utils
import uuidv4 from '@/Core/utils/uuidv4';
// api
import { sendMessage, createConversation } from '@/Core/api/chat';
// components
import Iconify from '@/Core/Iconify';
// types
import { IChatParticipant } from '@/Core/types/chat';

// ----------------------------------------------------------------------

type Props = {
  recipients: IChatParticipant[];
  onAddRecipients: (recipients: IChatParticipant[]) => void;
  //
  disabled: boolean;
  selectedConversationId: string;
};

export default function ChatMessageInput({
  recipients,
  onAddRecipients,
  //
  disabled,
  selectedConversationId,
}: Props) {
  const navigate = useNavigate();

  const { user } = useMockedUser();

  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const myContact = useMemo(
    () => ({
      id: user.id,
      role: user.role,
      email: user.email,
      address: user.address,
      name: user.displayName,
      lastActivity: new Date(),
      avatarUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
      status: 'online' as 'online' | 'offline' | 'alway' | 'busy',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: dayjs(new Date()).set("minutes", 0).set("seconds", 0).set("milliseconds", 0).toDate(),
      senderId: myContact.id,
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      name:messageData.body,
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      try {
        if (event.key === 'Enter') {
          if (message) {
            console.log('conversationData', conversationData)
            if (selectedConversationId) {
//@ts-ignore
              await sendMessage(selectedConversationId, messageData);
            } else {//@ts-ignore
              const res = await createConversation(conversationData);
              console.log('res', res)
              navigate(`/chat?id=${res}`);

              onAddRecipients([]);
            }
          }
          setMessage('');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [conversationData, message, messageData, onAddRecipients,  selectedConversationId]
  );

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}
