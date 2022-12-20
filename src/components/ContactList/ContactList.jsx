import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export default function ContactList({ contacts, deleteContact }) {
  return (
    <>
      <ul className={styles.list}>
        {contacts.map(({ id, name, number }) => (
          <li className={styles.item} key={id}>
            {name}, {number}
            <button
              className={styles.button}
              onClick={() => deleteContact(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
