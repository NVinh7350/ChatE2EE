import { Alert } from "react-native";
import { keys, setAsyncStorage } from "../../asyncStorage";
import { database } from "../../firebase/config";

export const createChat = async (currentUserId, guestId ) => {
  try {
    const currentKey = database.ref('/chats/'+`${currentUserId}-${guestId}`);
    setAsyncStorage(keys.currentKey,currentKey.key);
    return await
        currentKey
        .set({
        members : [currentUserId, guestId]
      })
  } catch (error) {
    return error;
  }
};

export const getChatsByUid = async  (uid ) => {
    try {
        return await database.ref('users/'+uid+'/chats/').once('value', snapshot => {
            snapshot.val()
        })
    } catch (error) {
    return error;
  }
}

export const getUserByChatId = async ([...chatIds]) => {
    let users = [];
    try {
        console.log('chatIds'+chatIds)
            for(let id of chatIds){
                await database.ref('chats/'+id+'/members/').once('value', sn =>{
                    users = [...new Set(users.concat(sn.val()))]
                })
            }
            console.log('users'+users)
            return users;
    } catch (error) {
        return error;
    }
}