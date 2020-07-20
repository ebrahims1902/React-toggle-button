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
constructor(props) {
  super(props);
  console.log('[App.js] constructor')
}
state = {
  persons: [
    { id: '121', name: 'Max', age: 30 },
    { id: '122', name: 'Bilal', age: 28 },
    { id: '123', name: 'Ebrahim', age: 25 }

  ],
  otherState: 'some other value',
  showPersons : false,
  showCockpit : true
  
}

  static getDerivedStateFromProps(props,state) {
    console.log('[App.js] getDerivedStateFromProps',props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps,nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
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
    console.log('[App.js] render')
    let persons = null;
    

    if ( this.state.showPersons ) {
      persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangeHandler} />;    
    }

    

    return (
      <div className={classes.App}>
        <button onClick={() => {
          this.setState({ showCockpit: false });
        }}>Remove Cockpit</button>
        { this.state.showCockpit ? ( <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.personsLength}
          clicked={this.togglePersonsHandler} />
        ) : null }
        { persons }
      </div>
    );
  }
}


export default App;
