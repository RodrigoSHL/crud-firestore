import { useEffect, useState } from 'react';
import {firebase} from './firebase';

function App() {

  const [tareas, setTareas] = useState([])
  const [tarea, setTarea] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection('tasks').get();
        const arrayData = await data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setTareas(arrayData);
      } catch (error) {
        console.log('error', error)
      }
    }
    getData();
  }, [])

  const add = async (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      console.log('error, task is empty')
      return
    }

    try {
      const db = firebase.firestore()
      const newTask = {
        name: tarea,
        fecha: Date.now()
      }

      const data = await db.collection('tasks').add(newTask);
      setTarea('');
      setTareas([
        ...tareas,
        {...newTask, id: data.id}
      ])
    } catch (error) {
      console.log('error', error)
    }
  }

  const deleteData = async (idTask) => {
    try {
      const db = firebase.firestore();
      await db.collection('tasks').doc(idTask).delete();
      
      const arrayFilter = tareas.filter(item => item.id !== idTask);
      setTareas(arrayFilter);

    } catch (error) {
      console.log('error', error)
    }
  }

  const editData = item => {
    
  }

  return (
    <div className="container mt-3">
       <div className="row">
        <div className="col-md-6">
        <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="group-item mt-2">
                  No pending tasks
                </li>

              ) : (
                tareas.map((item) => (
                <li key={item.id} className="group-item mt-2">
                  <span className="lead">{item.name}</span>
                  <button className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => deleteData(item.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-warning btn-sm float-end"
                    onClick={() => editData(item)}                  
                  >
                    Edit
                  </button>
                </li>
              ))
              )
              
            }
            
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Form</h3>
          <form onSubmit={add}>
            <input 
              type="text" placeholder='add task' 
              className='form-control mb-2'
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <button
              className='btn btn-primary w-100'
              type='submit'
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

