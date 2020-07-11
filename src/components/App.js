import React from 'react';
import Header from './Header';

class  App extends React.Component  {
    state={
        pageHeader:'This is the header '
    };
    render (){
        return ( 
            <div className="App"> 
                <Header message={this.state.pageHeader}></Header>
      
            </div>
       
        );
    }
}

export default App;
