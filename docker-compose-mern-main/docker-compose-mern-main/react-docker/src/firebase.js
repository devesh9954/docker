
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEG7iamfmzq-0b9vKbDYqnKvE7KjNx6GI",
  authDomain: "devesh-project1.firebaseapp.com",
  projectId: "devesh-project1",
  storageBucket: "devesh-project1.appspot.com",
  messagingSenderId: "302053526707",
  appId: "1:302053526707:web:f70e7f4871ba3a752a74c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);