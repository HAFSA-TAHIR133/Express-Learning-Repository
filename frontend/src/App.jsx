import { useEffect, useState } from 'react';
import StudentID from './components/studentID';
import Course from './components/Course';
import SearchQuery from './components/searchQuery';
import CombinedTask from './components/combinedTask';
import Authentication from './components/authenticateCheck';
function App() {

  const [students, setStudents] = useState([]);
  const [result,setResult]=useState([]);
  const[newStudent,setNewStudent]=useState('');

  useEffect(() => {
   
    fetch('http://localhost:8000/student')
      .then(response => response.json())
      .then(data => {
        setStudents(data);
      });

  }, [result]);

  const AddNewstudent= async()=>{
        const response = await fetch('http://localhost:8000/student',
            {
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({
                    name:newStudent}
                )
            }
        )
        const data = await response.json();
        setStudents(prev => [...prev, data]);
        setResult(data);
        setNewStudent('');
    }


  return (
    <div>
      <h1>Students</h1>

      {students.map(student => (
        <p key={student.id}>
          {student.name}
        </p>
      ))}

      <hr />
      <h2>Enter New Student Name</h2>
      <input type="text" placeholder="Enter name" value={newStudent} 
      onChange={(e)=>setNewStudent(e.target.value)} />
      <button onClick={AddNewstudent}>Click to add</button>


      <h2>Student ID</h2>
      <StudentID />
      <Course />
      <SearchQuery />
      <CombinedTask />
      <hr />
      <Authentication />
    </div>
  );
}

export default App;
