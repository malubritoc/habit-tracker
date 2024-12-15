// Import the functions you need from the SDKs you need
// import { Habit } from "@/types/habit";
import { DayOfWeek } from "@/types/daysOfTheWeek";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQnaO4Yuf7Rf0t43__jv7URImmEq9gcrY",
  authDomain: "habittracker-b318f.firebaseapp.com",
  projectId: "habittracker-b318f",
  storageBucket: "habittracker-b318f.firebasestorage.app",
  messagingSenderId: "111936047606",
  appId: "1:111936047606:web:7a537fc47d8617dc115fd7",
  measurementId: "G-55HQZGQTGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
// console.log(db);
const habitsCollectionRef = collection(db, "habits");

export async function getAllHabits() {
    // console.log(db);
    return getDocs(habitsCollectionRef).then((querySnapshot) => {
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      let data = <any>[];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id: doc.id});
      });
      return data;
    });
  }

  export async function updateHabitStatusFB(collectionName: string, habitId: string, done: boolean) {
    try {
      const habitRef = doc(db, collectionName, habitId);
      await updateDoc(habitRef, { done });
    //   console.log(`Hábito ${habitId} atualizado com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar o hábito: ", error);
      throw error;
    }
  }

export async function createHabit(collectionName: string, habit: { name: string; frequency: number; days: DayOfWeek[]; done: boolean; }) {
    try {
      const docRef = await addDoc(collection(db, collectionName), habit);
      console.log(`Hábito criado com sucesso! ID: ${docRef.id}`);
      return docRef.id; 
    } catch (error) {
      console.error("Erro ao criar hábito: ", error);
      throw error;
    }
  }