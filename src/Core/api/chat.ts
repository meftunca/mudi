import { useMemo } from "react";
import keyBy from "lodash/keyBy";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLiveQuery } from "dexie-react-hooks";
// utils
// types
import {
  IChatMessage,
  IChatParticipant,
  IChatConversations,
  IChatConversation,
} from "@/Core/types/chat";
import { useLocalStorage } from "../hooks/use-local-storage";
import { db } from "./db";

// ----------------------------------------------------------------------
const aiInstance = axios.create({
  baseURL: "https://api-inference.huggingface.co/models/google/gemma-7b-it",
  headers: {
    Authorization: "Bearer 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",
  },
});
const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetContacts() {
  const contact: IChatParticipant = {
    id: "1",
    name: "Gemma",
    role: "Gemma Chat Bot",
    email: "gemma@chat.ai",
    address: "",
    avatarUrl: "/gemma.svg",
    phoneNumber: "",
    lastActivity: new Date(),
    status: "online",
  };
  const contacts = [contact];
  return contacts;
}

// ----------------------------------------------------------------------

export function useGetConversations() {
  // const URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  // const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  // const memoizedValue = useMemo(() => {
  //   const byId = keyBy(conversations, 'id') || {};
  //   const allIds = Object.keys(byId) || [];

  //   return {
  //     conversations: {
  //       byId,
  //       allIds,
  //     } as IChatConversations,
  //     conversationsLoading: isLoading,
  //     conversationsError: error,
  //     conversationsValidating: isValidating,
  //     conversationsEmpty: !isLoading && !allIds.length,
  //   };
  // }, [conversations, error, isLoading, isValidating]);

  const [conversations] = useLocalStorage<IChatConversations>("conversations", {
    byId: {},
    allIds: [],
  });
  const memoizedValue = useMemo(
    () => ({
      conversations: conversations as IChatConversations,
      conversationsLoading: false,
      conversationsError: undefined,
      conversationsValidating: false,
      conversationsEmpty: !conversations.length,
    }),
    [conversations]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetConversation(conversationId: string) {
  const conversation = useLiveQuery(() =>
    db.conversation.where("conversationId").equals(conversationId).first()
  );
  return conversation;
}

// ----------------------------------------------------------------------

export async function sendMessage(
  conversationId: string,
  messageData: IChatMessage
) {
  return aiInstance.post("", { inputs: messageData.body }).then((res) => {
    // const data = { conversationId, messageData: {...messageData,content:res.data[0].generated_text} };
    let resp = Array.isArray(res.data)
      ? res.data[0].generated_text
      : res.data.generated_text;
    // localStorage.setItem(`conversation-${conversationId}`, JSON.stringify(data));
    db.messages.bulkAdd([
      { ...messageData,senderId:"2", conversationId },
      {  body: resp, conversationId,senderId:"1",createdAt:new Date(),contentType:"text",attachments:[],id:Date.now().toString(32)},
    ]);
  });

}

// ----------------------------------------------------------------------

export async function createConversation(conversationData: IChatConversation) {
  const conversationId = Date.now().toString(32);
  db.conversation.add({...conversationData,id:conversationId});
  db.messages.add(
    { id:Date.now().toString(32), body: conversationData.messages[0].body, conversationId,senderId:"2",createdAt:new Date(),contentType:"text",attachments:[]},
  );
  return aiInstance.post("", { inputs: conversationData.messages[0].body }).then((res) => {
    // const data = { conversationId, messageData: {...messageData,content:res.data[0].generated_text} };
    let resp = Array.isArray(res.data)
      ? res.data[0].generated_text
      : res.data.generated_text;
    // localStorage.setItem(`conversation-${conversationId}`, JSON.stringify(data));
    db.messages.add(
      { id:Date.now().toString(32), body: resp.replace(conversationData.messages[0].body,""), conversationId,senderId:"1",createdAt:new Date(),contentType:"text",attachments:[]},
    );
    return conversationId;
  });
 
}

// ----------------------------------------------------------------------

export async function clickConversation(conversationId: string) {

  const conversation =db.conversation.where("id").equals(conversationId)
  db.conversation.update(conversationId,{unreadCount:0});
}
