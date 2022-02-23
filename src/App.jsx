import { useEffect, useState } from 'react';
import {firebase} from './firebase';

function App() {

  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState('');
  const [editionMode, setEditionMode] = useState(false);
  const [idTaskState, setIdTaskState] = useState('');

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

  const addTask = async (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      console.log('error, task is empty')
      return
    }

    try {
      const db = firebase.firestore()
      const newTask = {
        name: tarea,
        date: Date.now()
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

  const deleteData = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection('tasks').doc(id).delete();
      
      const arrayFilter = tareas.filter(item => item.id !== idTaskState);
      setTareas(arrayFilter);

    } catch (error) {
      console.log('error', error)
    }
  }

  const handleEditMode = item => {
    setEditionMode(true);
    setTarea(item.name);
    setIdTaskState(item.id);
    console.log('itemId',idTaskState)
  }

  const editTask = async (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      console.log('not add task')
      return
    }
    try {
      const db = firebase.firestore();
      await db.collection('tasks').doc(idTaskState).update({
        name:tarea
      });
      const arrayEdit = tareas.map(item => (
        item.id === idTaskState ? {id: item.id, date: item.date, name: tarea} : item
      ))
      setTareas(arrayEdit);
      setEditionMode(false);
      setTarea('')
      setIdTaskState('')
    } catch (error) {
      console.log('error', error)
    }
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
                    onClick={() => handleEditMode(item)}                  
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
          <h3>
            {
              editionMode ? "Edit Task" : "Add Task"
            }
          </h3>
          <form onSubmit={
            editionMode ? editTask : addTask
          }>
            <input 
              type="text" placeholder='add task' 
              className='form-control mb-2'
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            {
              editionMode ?<button
                  className='btn btn-warning w-100'
                  type='submit'
                >
                  Edit
                </button>
                
              :
                <button
                  className='btn btn-primary w-100'
                  type='submit'
                >
                  Add
                </button>
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

