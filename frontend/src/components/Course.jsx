import { use } from "react";
import { useState,useEffect } from "react";

function Course(){
    const [course,setCourse]=useState('');
    const [level,setLevel]=useState('');
    const [result,setResult]=useState('');

    useEffect(()=>{
        const fetchCourseName = async()=>{
            try{
                const response = await fetch(`http://localhost:8000/course/${course}/${level}`);
                console.log('fetch data');
                const data = await response.json();
                setResult(data);

            }

            catch(error){
                console.log("error",error);
            }

        }
        if(course && level){
                fetchCourseName();
            }
    },[course,level])

    return(
        <>
            <div className="courses">
                <h3>Choose the course</h3>
                <select value={course} onChange={(e)=>setCourse(e.target.value)}>
                    <option value=''>Select an option</option>
                    <option value='Web Devlopment'>Web Devlopment</option>
                    <option value='Machine Learning'>Machine Learning</option>
                    <option value='Generative AI'>Generative AI</option>
                </select>

                <h3>Choose the level</h3>
                <select value={level} onChange={(e)=>setLevel(e.target.value)}>
                    <option value=''>Select an option</option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Advance'>Advance</option>
                </select>
                {result.CourseName && 
                <div>
                    <h3>You choose: </h3>
                    <p>Course Name: {result.CourseName}</p>
                    <p>Level: {result.Level}</p>
                </div>
                }
                
            </div>
        </>
    );
}
export default Course;