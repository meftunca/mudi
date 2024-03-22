import { useCallback } from 'react';
import dayjs from 'dayjs';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// routes
 
 import {useNavigate} from "react-router-dom";
// hooks
import { useMockedUser } from '@/Core/hooks/use-mocked-user';
import { useResponsive } from '@/Core/hooks/use-responsive';
// api
import { clickConversation } from '@/Core/api/chat';
// types
import { IChatConversation } from '@/Core/types/chat';
//
import { useGetNavItem } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  collapse: boolean;
  onCloseMobile: VoidFunction;
  conversation: IChatConversation;
};

export default function ChatNavItem({ selected, collapse, conversation, onCloseMobile }: Props) {
  const { user } = useMockedUser();
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();

  const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } =
    useGetNavItem({
      conversation,
      currentUserId: user.id,
    });

  const singleParticipant = participants[0];

  const { name, avatarUrl, status } = singleParticipant;

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

      await clickConversation(conversation.id);

      navigate(`/chat?id=${conversation.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [conversation.id, mdUp, onCloseMobile]);

  const renderGroup = (
    <Badge
      variant={hasOnlineInGroup ? 'online' : 'invisible'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
        {participants.slice(0, 2).map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
        ))}
      </AvatarGroup>
    </Badge>
  );

  const renderSingle = (
    <Badge key={status} variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge
        color="error"
        overlap="circular"
        badgeContent={collapse ? conversation.unreadCount : 0}
      >
        {group ? renderGroup : renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={displayName}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={displayText}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: conversation.unreadCount ? 'subtitle2' : 'body2',
              color: conversation.unreadCount ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {dayjs(new Date(lastActivity) ).fromNow()}
            </Typography>

            {!!conversation.unreadCount && (
              <Box sx={{ width: 8, height: 8, bgcolor: 'info.main', borderRadius: '50%' }} />
            )}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}
