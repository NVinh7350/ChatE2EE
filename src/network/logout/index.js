import firebase from '../../firebase/config'

const logOutRequest =async () => {
    try {
        return await firebase.auth().signOut();
    } catch (error) {
        return error;
    }
};

export default logOutRequest;