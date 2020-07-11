import React from 'react';

const userPreview =(users)=>(
    <div className="usersPreview">
        <div>
           userName: {users.username} 
        </div>

        <div>
            {users.password}
        </div>
        
        <div>
            {users.id}
        </div>
    </div>);
export default userPreview;