import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
import Radium from 'radium'


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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      padding: '8px',
      cursor: 'pointer',
      border: '1px solid blue',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }
    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <div>
          { this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id} 
            changed={(event) => this.nameChangeHandler(event, person.id)} />
          }) }  

        </div>
      );
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      } 
    }

    const classes = [];
    
    if(this.state.persons.length <= 2) {
      classes.push('red')
    }

    if(this.state.persons.length <= 1) {
      classes.push('bold')
    }

    return (
      <div className="App">
        <h1>Hi , I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working</p>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        { persons }
      </div>
    );
  }
}


export default Radium( App );
