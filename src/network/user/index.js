import { database } from "../../firebase/config";

export const AddUser = async (name, email, uid, profileImg) => {
  try {
    return await
        database
        .ref("users/" + uid)
        .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    return error;
  }
};

export const JoinChat = async (uid,chatId) => {
    try {
      return await
          database
          .ref("users/" + uid+"/chats/").update({
            [chatId]:true
          })
    } catch (error) {
      return error;
    }
};

export const getUserById = async ([...uids]) => {
    let user = [];
    try {
        for(let uid of uids){
            await
            database
            .ref("users/" + uid).once("value", sn => {
                user = [...new Set(user.concat(sn.val()))]
            })
        }
        return user;
        return 
    } catch (error) {
        return error;
    }
}

