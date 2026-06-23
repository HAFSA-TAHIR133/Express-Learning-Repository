import { useState,useEffect } from "react";

function SearchQuery(){
    const [phone,setPhone]=useState('');
    const [price,setPrice]=useState('');
    const [result,setResult]=useState('');
    useEffect(()=>{
        const QueryData = async()=>{
            try{
                const response = await fetch(`http://localhost:8000/search?phone=${phone}&price=${price}`)
                const data =await  response.json();
                setResult(data);
            }
            catch(error){
                console.log("error in fetaching data",{error});
            }
            
        }
        if(phone && price){
            QueryData();
        }
    },[phone,price])

    return(
        <>
            <div className="searchQuery">
                <h3>Enter phone name</h3>
                <input type="text" placeholder="Enter Name" value={phone} 
                 onChange={(e) =>setPhone(e.target.value)}  />
                <h3>Enter phone Price</h3>
                <input type="text" placeholder="Enter Price" value={price} 
                 onChange={(e) =>setPrice(e.target.value)}  />
                 {
                    result.recievedPhone && 
                    <div>   
                        <hr />
                        <h3>Phone Name: {result.recievedPhone}</h3>
                        <h3>Phone Price: {result.recievedPrice}</h3>
                    </div>
                 }
            </div>
        </>
    )
}

export default SearchQuery;