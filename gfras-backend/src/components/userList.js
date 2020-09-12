import React from 'react';
import PropTypes from 'prop-types';
import UserPreview from './userPreview';

const UserList =({users,onUserClick})=>(
    <div>
        {users.map(user =>
            <UserPreview
                onUserClick={onUserClick}
                key={user.id} {...user}></UserPreview>
        )}
    </div>
);

UserList.propTypes={
    users: PropTypes.array,
    onUserClick:PropTypes.func
};
export default UserList;