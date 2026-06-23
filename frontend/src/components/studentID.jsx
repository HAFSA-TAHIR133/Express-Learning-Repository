import { useState,useEffect } from "react";

function StudentID(){
    const [studentID,setStudentID]=useState('');
    const [result,setResult]=useState('');

    useEffect(() => {
    const fetchStudent = async () => {
        try {
            const response = await fetch(`http://localhost:8000/student/${studentID}`);
            const data = await response.json();
            setResult(data);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    if (studentID) {
        fetchStudent();
    }
}, [studentID]);

    


    return(
        <>
            <input type="number" placeholder="Enter student id: " value={studentID} 
            onChange={(e)=> setStudentID(e.target.value)} />
            {result && <div>
                <h2>Student ID:{result.id}</h2>
                
            </div>}
         
            
        </>
    );
}
export default StudentID;