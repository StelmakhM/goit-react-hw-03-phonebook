import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  normalizeValue = value => value.toLowerCase().trim();

  searchContact = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addNewContact = newContact => {
    const { contacts } = this.state;
    const exist = contacts.some(
      contact =>
        this.normalizeValue(contact.name) ===
        this.normalizeValue(newContact.name)
    );
    if (exist) {
      alert('Already in list');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      this.normalizeValue(contact.name).includes(this.normalizeValue(filter))
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(contact => contact.id !== id);
    this.setState({ contacts: newContacts });
  };

  render() {
    const filteredContacts = this.filterContacts();
    return (
      <div className={styles.container}>
        <ContactForm onSubmit={this.addNewContact} />
        <Filter
          searchContact={this.searchContact}
          filterValue={this.state.filter}
        />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
