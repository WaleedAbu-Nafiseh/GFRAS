import React from 'react';
import Header from './Header';
import UserPreview from './userPreview';
import axios from 'axios';

class  App extends React.Component  {
    state={
        pageHeader:'This is the header ',
        users:[]    
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



    render (){
        return ( 
            <div className="App"> 
                <Header message={this.state.pageHeader}></Header>
                <div>
                    {this.state.users.map(users =>
                        <UserPreview key={users.id} {...users}></UserPreview>
                    )}
               
                </div>
            </div>
        );
    }
}

export default App;
