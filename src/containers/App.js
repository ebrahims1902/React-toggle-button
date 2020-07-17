import React, { Component } from 'react';
import classes from './App.module.css';
// import Person from '../components/Persons/Person/Person'
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';
// import Radium, {StyleRoot} from 'radium'
// import styled from 'styled-components'
  
// const StyleButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'};
//   color: white;
//   font: inherit;
//   padding: 8px;
//   cursor: pointer;
//   border: 1px solid blue;

//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;

class App extends Component {  

state = {
  persons: [
    { id: '121', name: 'Max', age: 30 },
    { id: '122', name: 'Bilal', age: 28 },
    { id: '123', name: 'Ebrahim', age: 25 }

  ],
  otherState: 'some other value',
  showPersons : false
  
}


// switchNameHandler = (newName) => {
//   this.setState({
//     persons:[
//       { name: newName, age: 30},      
//       { name: 'Mohammed Bilal', age: 28},
//       { name: 'Ebrahim', age: 26},

//     ]
//   })
// }

nameChangeHandler = (event, id) => {
  const personIndex =this.state.persons.findIndex(p => {
    return p.id === id;
  });

  const person = { 
    ...this.state.persons[personIndex]
  };

  person.name = event.target.value;

  const persons = [...this.state.persons];
  persons[personIndex] = person;

  this.setState({ persons: persons});
}

deletePersonHandler = (personIndex) => {
  // const  persons = this.state.persons;
  const persons = [...this.state.persons]
  persons.splice(personIndex, 1);
  this.setState({ persons:persons })
}

togglePersonsHandler = () => {
  const doesShow = this.state.showPersons
  this.setState({ showPersons: !doesShow })
}

  render(){
    
    let persons = null;
    

    if ( this.state.showPersons ) {
      persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler} />;    
    }

    

    return (
      <div className={classes.App}>
        <Cockpit 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        { persons }
      </div>
    );
  }
}


export default App;