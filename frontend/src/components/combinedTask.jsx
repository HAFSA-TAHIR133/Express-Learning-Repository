import { useState,useEffect } from "react";

function CombinedTask(){
    const [ID,setID]=useState('');
    const[size,setSize]=useState('');
    const[color,setColor]=useState('');
    const[result,setResult]=useState('');

    useEffect(()=>{
        const handleFetch = async()=>{
            try{
                const response = await fetch(`http://localhost:8000/product/${ID}?color=${color}&size=${size}`);
                const data = await response.json();
                setResult(data);
            }
            catch(error){
                console.log("Error!!!",{error});
            }
            
        }
        if(color && size && ID){
            handleFetch();
        }
    },[color,size,ID])

    return(
        <>
            <div className="combinedTask">
                <hr />
                <h2>Combined Task</h2>
                <h3>Please enter the required fields</h3>
                <input type="number" placeholder="Enter ID" value={ID} onChange={(e)=> setID(e.target.value)} />
                <input type="text" placeholder="Enter Color" value={color} onChange={(e)=>setColor(e.target.value)} />
                <input type="text" placeholder="Enter Size" value={size} onChange={(e)=>setSize(e.target.value)} />
                {
                    result.Color && 
                    <div>
                        <hr />
                        <h4>Student ID: {result.id}</h4>
                        <h4 style={{color:result.Color}}>Selected Color: {result.Color}</h4>
                        <h4 style={{fontSize:`${result.Size}px`}}>Selected Size: {result.Size}</h4>
                    </div>
                }

            </div>
        </>
    );

}

export default CombinedTask;