import React from 'react';
import Header from './Header';
import axios from 'axios';
import UserList from './userList';
import UserProfile from './userProfile';
import * as api from '../api';
const pushState= (obj,url)=>{
    window.history.pushState(obj,'',url);
};

class  App extends React.Component  {
    state={
        pageHeader:'This is the header ',
        users:[],
        userId:{},

    };

    componentDidMount(){
        axios.get('/api/users')
            .then(resp=>{
                console.log(resp);
                this.setState({
                    users:resp.data.users
                });
            })
            .catch(console.error);
    }
    fetchUser=(userID)=>{
        pushState(
            {currentUserID:userID},
            `/users/${userID}`
        );

        api.fetchUser(userID).then(user =>{
            this.setState({
                selectedID:userID,
                pageHeader:user.username,
                users:{ ...this.state.users,
                    [user.id]:user
                }    
            });
        });

        console.log(this.state.users[userID].username);
       
      
    };
    currentUser(){

        if(this.state.selectedID){
            console.log('Got in if');
            return(<UserProfile{... this.state.users[this.state.selectedID]}>

            </UserProfile>);
        }else{ 
            console.log('Got in else ');
            return( <UserList
                onUserClick={this.fetchUser}
                users={this.state.users}/>);}
       
    }
    render (){
        return ( 
            <div className="App"> 
                <Header message={this.state.pageHeader}></Header>
                {this.currentUser()}
            </div>
        );
    }
}

export default App;
