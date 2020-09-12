import React from 'react';
import PropTypes from 'prop-types';
class UserProfile extends React.Component{
    render(){
        return(    
            <div className="userProfile">
                {this.props.id}
            </div>
        );
    }
}
UserProfile.propTypes={
    id:PropTypes.string
};
export default UserProfile;