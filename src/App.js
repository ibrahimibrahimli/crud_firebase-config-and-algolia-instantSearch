import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { async } from "@firebase/util";

const App = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const [name, setName] = useState("");
  const [age, setAge] = useState();

  const addUser = async () => {
    await addDoc(usersCollectionRef,{name,age: Number(age)})
    setAge("")
    setName("")
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id)
  
    await updateDoc(userDoc, {age : age + 1});
  };

  const deleteUser = async (id) => {
      await deleteDoc(doc(db, "users", id))
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);
  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
        value={age}
      />
      <button onClick={addUser}>Add</button>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1> Name : {user.name}</h1>
            <h1>Age : {user.age}</h1>
            <button onClick={() =>{updateUser(user.id, user.age)}}>Increase age</button>
            <button onClick={() =>{deleteUser(user.id)}} >Delete User</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
