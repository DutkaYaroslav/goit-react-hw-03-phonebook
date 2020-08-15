import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactsList from './components/ContactList/ContactList';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    // name: "",
    // number: "",
  };

  componentDidMount() {
    const persistedTasks = localStorage.getItem('contacts');
    if (persistedTasks) {
      this.setState({
        contacts: JSON.parse(persistedTasks),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getVisibleTasks() {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  addTask = (nameResult, numberResult) => {
    const { contacts } = this.state;
    const info = {
      id: uuidv4(),
      name: nameResult,
      number: numberResult,
    };

    if (
      contacts.find(contact =>
        contact.name.toLowerCase().includes(nameResult.toLowerCase()),
      )
    ) {
      alert('this user name already in your contact list');
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, info],
        };
      });
    }
  };

  removeTask = taskId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== taskId),
      };
    });
  };

  render() {
    // const { contacts } = this.state;
    const visibleTasks = this.getVisibleTasks();

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onAddTask={this.addTask} />

        <h2>Contacts</h2>
        <ContactsList
          onChange={this.handleChange}
          onVisible={visibleTasks}
          onRemove={this.removeTask}
        />
      </div>
    );
  }
}
