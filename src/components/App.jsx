import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import './App.css'


export default class App extends Component {

  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  handleChangeForm = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(contact => {
        return contact.name === name || contact.number === number;
      })
    ) {
      return alert(`${name}: is already in contacts`);
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, {id: nanoid(), name, number }],
    }));
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    if (filter.length === 0) return contacts;
    const foundContacts = contacts.filter(el =>
      el.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
    return foundContacts;
  };

  removeContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };


  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts){this.setState({contacts: parsedContacts})}
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }


  render() {
    return (
      <div className='section'>
        <h1 className='section__title'>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2 className='section__title-secondary'>Contacts</h2>
        <Filter
          handleChangeForm={this.handleChangeForm}
          value={this.state.filter}
        />
        <ContactList
          filterContact={this.filterContact()}
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}