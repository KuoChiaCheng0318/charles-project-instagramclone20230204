import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCn1ctlXx8qQ1BVUWX5g7jVcRxvHTQ34Kg",

	authDomain: "charles-project20230204.firebaseapp.com",

	projectId: "charles-project20230204",

	storageBucket: "charles-project20230204.appspot.com",

	messagingSenderId: "456513113027",

	appId: "1:456513113027:web:4585dc391af4d51a4a8b76",

	measurementId: "G-JN0PVTLE3C" 

};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage=firebase.storage();
// const provider = new firebase.auth.GoogleAuthProvider();

// export default db;
export { db, auth, storage };
