import Firebase from '@react-native-firebase/app'
// import { firebase } from '@react-native-firebase/auth';
import FirebaseAuthen from '@react-native-firebase/auth'
import FirebaseDatabase from '@react-native-firebase/database'
const config = {
    apiKey: 'AIzaSyB3Ov1y55Cx-cd0jQvHOW4Z68qb1NRz8CA',
    databaseURL: 'https://chate2ee-default-rtdb.firebaseio.com',
    projectId: 'chate2ee',
    appId: '1:850560919280:android:9cd9f042ed99117e168435',
    messagingSenderId: '850560919280',
    storageBucket: 'chate2ee.appspot.com'
    
};
let firebase = Firebase.apps.length == 2 ? Firebase.app('Firebase') : Firebase.initializeApp({...config}, {name: 'Firebase'});
// let firebase = Firebase.initializeApp({...config}, {name: 'FirebaseV2'});
// Firebase.initializeApp({...config}, {name: 'Firebase'}).then(
//         () => {
//             firebase = Firebase.app('Firebase');
//             console.log(firebase.options)
//         }
//     ).catch((err)=>{firebase = Firebase.app('Firebase');} )
// console.log(Firebase.app('FirebaseV2'));
const auth = FirebaseAuthen();
const database = FirebaseDatabase();
export {
    auth, 
    database
}