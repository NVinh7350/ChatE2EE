import {auth} from "../../firebase/config";

const loginRequest = async (email, password) => {
  try {
    return await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    return error;
  }
};

export default loginRequest;