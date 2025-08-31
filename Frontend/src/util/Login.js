

const Handlelogin=async (email,password)=>{
try{
    const res=await fetch("http://localhost:3001/api/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({email,password})
    })
    const data = await res.json();
    return data
}catch(error){
    console.error("Error logging in:", error);
}
}

export default Handlelogin;
