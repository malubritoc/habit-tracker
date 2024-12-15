// Import the functions you need from the SDKs you need
// import { Habit } from "@/types/habit";
import { DayOfWeek } from "@/types/daysOfTheWeek";
import { Habit } from "@/types/habit";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";

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
const recordsCollectionRef = collection(db, "records");

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

  export async function createDailyRecordIfNotExists(
    habit: Habit, // Hábito que será avaliado
    recordsCollectionName: string // Nome da coleção de registros
  ) {
    try {
        // console.log("aqui", habit);
      // Obtém o dia atual
      const daysOfWeek: DayOfWeek[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const today: DayOfWeek = daysOfWeek[new Date().getDay()];
  
      // Verifica se o hábito está ativo no dia atual
      if (!habit.days.includes(today)) {
        console.log(`O hábito "${habit.name}" não está configurado para o dia de hoje (${today}).`);
        return;
      }
  
      // Verifica se já existe um registro para o hábito no dia atual
      const recordsRef = collection(db, recordsCollectionName);
      const todayDate = new Date().toISOString().split("T")[0]; // Data no formato YYYY-MM-DD
      const q = query(
        recordsRef,
        where("habit_id", "==", habit.id),
        where("created_at", "==", todayDate)
      );
  
      const querySnapshot = await getDocs(q);

      console.log(querySnapshot);
  
      if (!querySnapshot.empty) {
        console.log(`Já existe um registro para o hábito "${habit.name}" no dia de hoje (${today}).`);
        return;
      }
  
      // Cria um novo registro
      const newRecord = {
        habit: {
            id: habit.id,
            name: habit.name,
            frequency: habit.frequency,
            days: habit.days,
        },
        created_at: todayDate, // Formato YYYY-MM-DD
        done: false,
        habit_id: habit.id,
      };
  
      const docRef = await addDoc(collection(db, "records"), newRecord)
      console.log(`Registro criado com sucesso para o hábito "${habit.name}" no dia ${today}.`);
      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar registro diário: ", error);
      throw error;
    }
  }

  export async function getTodayRecords() {
    // console.log(db);
    return getDocs(recordsCollectionRef).then((querySnapshot) => {
      // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
      let data = <any>[];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id: doc.id});
      });
      return data;
    });
  }

  export async function updateHabitRecordStatusFB(collectionName: string, habitRecordId: string, done: boolean) {
    try {
      const habitRecordRef = doc(db, collectionName, habitRecordId);
      await updateDoc(habitRecordRef, { done });
    //   console.log(`Hábito ${habitId} atualizado com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar o hábito: ", error);
      throw error;
    }
  }