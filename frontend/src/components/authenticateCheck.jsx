import { useState,useEffect} from "react";

function Authentication(){
    const [loggedIN,setLoggedIn] = useState('true');
    const [result,setResult] =useState('');
    useEffect(()=>{
        const AuthenticateUser = async()=>{
            try{
                const response = await fetch(`http://localhost:8000/dashboard?loggedIn=${loggedIN}`);
                const data = await response.json();
                setResult(data);
            }
            catch(error){
                console.log("Error in fetching the data. ",{error});
            }
        }
        AuthenticateUser();
    },[]);
    return(
        <>
            <h2>{result.message}</h2>
        </>
    );
};
export default Authentication;