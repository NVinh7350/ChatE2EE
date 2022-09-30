import Firebase from '@react-native-firebase/app'

const firebaseConfig = {
    apiKey: '',
    databaseURL: '',
    projectId: '',
    appId: '',
};

export default Firebase.initializeApp(firebaseConfig);