import { database } from "../../firebase/config";

export const AddMessage = async (chatId, sentBy, messageTime, messageContent) => {
  try {
    const refDatabase = database.ref("messages/" + chatId).push();
    return await
        refDatabase
        .set({
        sentBy: sentBy,
        messageTime: messageTime,
        messageContent: messageContent
      });
  } catch (error) {
    return error;
  }
};