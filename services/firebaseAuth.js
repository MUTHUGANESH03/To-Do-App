// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {initializeAuth, getReactNativePersistence, getAuth} from "firebase/auth";
import ReactNativeAsyncStorge from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKslENH58rXu6tsxke_w9bK3MD5GQuFCg",
  authDomain: "react-native-auth-demo-95b66.firebaseapp.com",
  projectId: "react-native-auth-demo-95b66",
  storageBucket: "react-native-auth-demo-95b66.appspot.com",
  messagingSenderId: "189273018863",
  appId: "1:189273018863:web:8b0e3a31b94ce3029b261a"
};
let auth;
if (getApps().length == 0) {
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorge)
})

}else{
  auth = getAuth();
}



export default auth;
