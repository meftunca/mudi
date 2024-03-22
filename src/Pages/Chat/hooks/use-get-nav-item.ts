// types
import { db } from '@/Core/api/db';
import { IChatConversation } from '@/Core/types/chat';
import { useLiveQuery } from 'dexie-react-hooks';

// ----------------------------------------------------------------------

type Props = {
  currentUserId: string;
  conversation: IChatConversation;
};

export default function useGetNavItem({ currentUserId, conversation }: Props) {
  const {participants } = conversation;
  const messages = useLiveQuery(() => db.messages.where('conversationId').equals(conversation.id).toArray(), [conversation.id])||[];
  const participantsInConversation = participants.filter(
    (participant) => participant.id !== currentUserId
  );

  const lastMessage = messages[messages.length - 1];

  const group = participantsInConversation.length > 1;

  const displayName = participantsInConversation.map((participant) => participant.name).join(', ');

  const hasOnlineInGroup = group
    ? participantsInConversation.map((item) => item.status).includes('online')
    : false;

  let displayText = '';

  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';

    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;

    displayText = `${sender}${message}`;
  }

  return {
    group,
    displayName,
    displayText,
    participants: participantsInConversation,
    lastActivity: lastMessage?.createdAt,
    hasOnlineInGroup,
  };
}
