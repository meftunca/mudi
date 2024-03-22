import { useEffect, useState, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
 
import { useNavigate, useSearchParams } from 'react-router-dom';
// hooks
import { useMockedUser } from '@/Core/hooks/use-mocked-user';
// api
import { useGetContacts, useGetConversation, useGetConversations } from '@/Core/api/chat';
// components
import { useSettingsContext } from '@/Core/settings';
// types
import { IChatParticipant } from '@/Core/types/chat';
//
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatHeaderCompose from '../chat-header-compose';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/Core/api/db';

// ----------------------------------------------------------------------

export default function ChatView() {
  const navigate = useNavigate();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const [searchParams] = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState<IChatParticipant[]>([]);

  const contacts = useGetContacts();

  const { conversations, conversationsLoading } = useGetConversations();
 const messages = useLiveQuery(() => db.messages.where("conversationId").equals(selectedConversationId).sortBy("createdAt"), [selectedConversationId]);
  // const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);
  const conversation = useLiveQuery(() => db.conversation.where("id").equals(selectedConversationId).first(), [selectedConversationId]);
  const participants: IChatParticipant[] = conversation
    ? (conversation?.participants||[]).filter(
        (participant: IChatParticipant) => participant.id !== user.id
      )
    : [];

  useEffect(() => {
    if (!conversation || !selectedConversationId) {
      // navigate("/chat");
    }
  }, [conversation,  selectedConversationId]);

  const handleAddRecipients = useCallback((selected: IChatParticipant[]) => {
    
    setRecipients(selected);
  }, []);

  const details = !!conversation;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>{details && <ChatHeaderDetail participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      loading={conversationsLoading}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={messages||[]} participants={participants} />

      <ChatMessageInput
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients.length && !selectedConversationId}
      />
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Chat
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
