import { onSnapshot, collection, setDoc, addDoc,  doc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import db from './Firebase/Firebase';



function App() {

  const [theinfo, setTheInfo] = useState([{name: "Loading... Grab a coffee while yout wait...", id: 'qwe'}]);
  console.log(theinfo)

useEffect(() => {
   onSnapshot(collection(db,  'ninja-cafes' ), (snapshot) => { 
    console.log(snapshot.docs.map(single => single.data()))
    
    setTheInfo(snapshot.docs.map((single) => ({...single.data(), id: single.id})))

  });
},[])
//There are a number of sifferente ways to add data to firestore EG        

//SETDOC //SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC//SETDOC
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3 Arguments - inc documentid
//SETDOC OVERRIDES EXISITNG SAME NAMES IN DATABASE (OR CRETES NEW ENTRY) BASED ON  $$$$$$$-*** docuemtnid***-$$$$$$$$
//setDoc(docRef, payload)     doc(dbreference, collectioname, docuemntid  )           import setDoc, doc

                // const handleSubmit = async (e) => {
                //   e.preventDefault();
                //   const docRef = doc(db, 'ninja-cafes', 'madeupname' );
                //   const payload = {name: 'new cafe45', city: 'tokyo'} 
                //   await setDoc(docRef, payload);
                // }

//ADDDOC //ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC//ADDDOC
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2 Arguments - no document id
//ADDDOC AUTOGENERATES A NEW DOCUMENT ID
//addDoc (collectionref, payload)

const handleSubmit = async (e) => {
  e.preventDefault();

  const name = prompt('tell us the cafe name...');
  const city = prompt('Where is it located...');

  const collectionRef = collection(db, 'ninja-cafes')
  const payload = {name: name, city: city}
 const newInfo = await addDoc(collectionRef, payload)

 //toget id of new document assign wait to a const
console.log('the new cafe has an id of' + newInfo.id)

}

const handleEdit =async(id) => {
  const name = prompt('tell us the cafe name...');
  const city = prompt('Where is it located...');
  const docRef = doc(db, 'ninja-cafes', id );
  const payload = {name, city}
await setDoc(docRef, payload);
}
//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC//DELETEDOC
const handleDelete = async (id) => {
  const docRef = doc(db, 'ninja-cafes', id);
  await deleteDoc(docRef);
}
//GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS //GETDOCS 
const handleQueryDelete = async (id) => {
  const userInputName = prompt('what name');
  const collectionRef = collection(db, 'ninja-cafes')
  const q = query(collectionRef, where('name', '==', userInputName));
  const snapshot = await getDocs(q);
  console.log(snapshot);

  const results = snapshot.docs.map((singledoc) => ({...singledoc.data(), id: singledoc.id})
  );
  console.log(results);

  results.forEach(async (result) => {
    const docRef = doc(db, 'ninja-cafes', result.id);
    await deleteDoc(docRef);
  })

}

  return (
    <div className="App">
        <h1>Cloud Cafes</h1>
            <div className="content">

                  <form id='add-cafe-form' onSubmit={handleSubmit}>
                  <button style={{color: 'green', background: 'lightgrey'}}>add new cafe button</button>
                  </form>

                  <button style={{color: 'blue', background: 'red'}} onClick={handleQueryDelete}>***QUERY DELETE***</button>


                {theinfo.map(object=> {
                      return (<div style={{border: 'black solid 1px'}} className="all" key={object.id}>
                            <div className="header">CAFE</div>
                            <div className="name">{object.name}</div>
                            <div className="city">{object.city}</div>
                            <button style={{color: 'green', background: 'lightgrey'}} onClick={()=>handleEdit(object.id)}>edit me!</button>
                            <button onClick={()=>{handleDelete(object.id)}}>DELETE!!!</button>

                      </div>)
                })}

            


                <ul id="cafe-list"></ul>
            </div>
    </div>
  );
}

export default App;
