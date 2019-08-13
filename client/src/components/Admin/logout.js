import React from 'react'
import axios from 'axios';

const logout = (props) => {
    axios.get(`/api/logout`)
                .then(request =>{
                    setTimeout(()=>{
                        props.history.push('/')
                    },2000)
                })


    return (
        <div className="logout_container">
            <h1>
                See you next time  
            </h1>
        </div>
    )
}

export default logout;