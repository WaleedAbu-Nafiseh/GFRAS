import React from 'react';
import PropTypes from 'prop-types';

class UserPreview extends React.Component{
   handleClick=()=>{
       this.props.onUserClick(this.props.id);
   };
   
   render(){
       return(
           <div className="UserPreview link" onClick={this.handleClick}>
               <div>
                userName: {this.props.username} 
               </div>

               <div>
                   {this.props.password}
               </div>
                
               <div>
                   {this.props.id}
               </div>
           </div>
       );
   }
}


UserPreview.propTypes={
    username:PropTypes.string,
    password:PropTypes.string,
    id:PropTypes.string,
    onUserClick:PropTypes.func
};


export default UserPreview;