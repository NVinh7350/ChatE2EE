import { auth } from '../../firebase/config'

const logOutRequest =async () => {
    try {
        return await auth.signOut();
    } catch (error) {
        return error;
    }
};

export default logOutRequest;