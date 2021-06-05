import React, { useState, useEffect } from 'react'
import axios from 'axios';

const AuthContext = React.createContext({
    userData: [],
    isLoading: false
})

export const AuthContextProvider = props => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://intense-tor-76305.herokuapp.com/merchants`).then(response => {
            setIsLoading(false)
            setData(response.data)
        }).catch(error => {
            setIsLoading(false)
            setData([])
        });
    }, []);


    return <AuthContext.Provider value={{
        userData: data,
        isLoading: isLoading
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;