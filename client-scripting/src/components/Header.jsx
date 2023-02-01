import React from "react";


const Header = ({}) => {
    return (
        <header>
            <h1>Customer management</h1>
            <div style={{marginTop: '30px', marginBottom: '18px'}}>
                <button onClick={() => setIsAdding(true)}>Add Employee</button>
                <Logout setIsAuthenticated={setIsAuthenticated} />
            </div>
        </header>
    )
}

