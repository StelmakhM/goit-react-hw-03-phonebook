import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

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
