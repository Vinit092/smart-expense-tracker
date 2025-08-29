import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext=createContext(); 

const UserProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(true);

    // function to update user data
    const updateUser=(userData)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Load user from localStorage on initial render
     useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
     setLoading(false);
  }, []);


    // Update user and persist to localStorage
//   const updateUser = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };


    // function to clear user data

    const clearUser=()=>{
        setUser(null);
        localStorage.removeItem("user");
    }; 

    return(
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
            loading,
        }}
        >

        {loading 
        ?(
        <div className="animate-pulse">Loading...</div>
          ) 
          : (<><div className="">{children}</div></>)}
        </UserContext.Provider>
    )
};

export default UserProvider;