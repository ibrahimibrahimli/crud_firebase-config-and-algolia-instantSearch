import React, { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import algoliasearch from "algoliasearch";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [region, setRegion] = useState("");

  const usersCollectionRef = collection(db, "users");
  const client = algoliasearch(
    "8TZ8IBLWCB",
    "eda98065419f76141f8d5e737e14ac7e"
  );
  const index = client.initIndex("users");

  const addUser = async () => {
    await addDoc(usersCollectionRef, { name, age: Number(age), region });

    setAge("");
    setName("");
    setRegion("");

    index
      .saveObject({
        name,
        age: Number(age),
        region,
        objectID: name,
      })
      .then(({ objectID }) => {
        console.log(objectID);
      });
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);

    await updateDoc(userDoc, { name, age: Number(age), region });
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const algoliaSearch = () => {
    index.search(search).then(({ hits }) => {
      setUsers(hits);
    });
  };
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

      <input
        type="text"
        placeholder="Region"
        onChange={(e) => setRegion(e.target.value)}
        value={region}
      />

      <button onClick={addUser}>Add</button>
      <div>
        <input
          onKeyUp={algoliaSearch}
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1> Name : {user.name}</h1>
            <h1>Region : {user.region}</h1>
            <h1>Age : {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
