import Dexie, { Table } from "dexie";
import {
  IChatMessage,
  IChatParticipant,
  IChatConversations,
  IChatConversation,
  IChatAttachmentDexieFields,
  IChatMessageDexieFields,
  IChatParticipantDexieFields,
  IChatConversationDexieFields,
  IChatConversationsDexieFields,
} from "@/Core/types/chat";

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  attachments!: Table<IChatMessage, string>;
  messages!: Table<IChatMessage, string>;
  participants!: Table<IChatParticipant, string>;
  conversation!: Table<IChatConversation, string>;
  conversations!: Table<IChatConversations, string>;
  contacts!: Table<IChatParticipant, string>;
  constructor() {
    super("AIDB");
    this.version(2).stores({
      attachments: IChatAttachmentDexieFields,
      messages: IChatMessageDexieFields,
      participants: IChatParticipantDexieFields,
      conversation: IChatConversationDexieFields,
      conversations: IChatConversationsDexieFields,
      contacts: IChatParticipantDexieFields,
    });
  }
}

export const db = new MySubClassedDexie();
