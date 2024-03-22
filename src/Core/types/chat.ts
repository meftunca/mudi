// ----------------------------------------------------------------------

export type IChatAttachment = {
  name: string;
  size: number;
  type: string;
  path: string;
  preview: string;
  createdAt: Date;
  modifiedAt: Date;
};
export const IChatAttachmentDexieFields = "name, size, type, path, preview, createdAt, modifiedAt";
export type IChatMessage = {
  id: string;
  conversationId: string;
  body: string;
  createdAt: Date;
  senderId: string;
  contentType: string;
  attachments: IChatAttachment[];
};
export const IChatMessageDexieFields = "id, body, createdAt,conversationId, senderId, contentType, attachments";

export type IChatParticipant = {
  id: string;
  name: string;
  role: string;
  email: string;
  address: string;
  avatarUrl: string;
  phoneNumber: string;
  lastActivity: Date;
  status: 'online' | 'offline' | 'alway' | 'busy';
};
export const IChatParticipantDexieFields = "id, name, role, email, address, avatarUrl, phoneNumber, lastActivity, status";

export type IChatConversation = {
  id: string;
  type: string;
  name: string;
  unreadCount: number;
  messages: IChatMessage[];
  participants: IChatParticipant[];
};
export const IChatConversationDexieFields = "id, type, unreadCount, name, participants";

export type IChatConversations = {
  byId: Record<string, IChatConversation>;
  allIds: string[];
};
export const IChatConversationsDexieFields = "byId, allIds";
