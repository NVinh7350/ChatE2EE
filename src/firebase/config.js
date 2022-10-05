import Firebase from '@react-native-firebase/app'
import { firebase } from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB3Ov1y55Cx-cd0jQvHOW4Z68qb1NRz8CA',
    databaseURL: 'https://chate2ee-default-rtdb.firebaseio.com',
    projectId: 'chate2ee',
    appId: '1:850560919280:android:9cd9f042ed99117e168435',
    messagingSenderId: ''
};


// export default Firebase.app('Test');
// export default Firebase.initializeApp({
//     ...firebaseConfig,
//     "databaseURL": 'https://chate2ee-default-rtdb.firebaseio.com',
// }, 'Tets')

// export default Firebase.app().delete().then(
//     ()=>{
//         Firebase.initializeApp(firebaseConfig);
//         console.log("here\n\n");
//         console.log(Firebase.apps((e)=>{
//             console.log(e.options);
//         }))
//     }
// )
// .catch((error)=>{
//     console.log(error.message);
//     const options = {
//         ...Firebase.app().options,
//         databaseURL: 'https://chate2ee-default-rtdb.firebaseio.com'
//       };
// //     Firebase.initializeApp(firebaseConfig,'APPCHAT' );
//     Firebase.initializeApp(options, {
//         name: 'Firebase'
//       });
    // console.log(Firebase.app('can-be-any-name').options);
// })
// Firebase.app().options.databaseURL = 'https://chate2ee-default-rtdb.firebaseio.com';
console.log(Firebase.app('Firebase').options);
export default Firebase.app('Firebase');