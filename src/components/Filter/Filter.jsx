import PropTypes from 'prop-types';
import styles from './Filter.module.css';

export default function Filter({ searchContact, filterValue }) {
  return (
    <>
      <h2 className={styles.title}>Contacts</h2>

      <label className={styles.label}>
        Enter search query
        <input
          className={styles.input}
          type="text"
          name="filter"
          onChange={e => searchContact(e)}
          value={filterValue}
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
  searchContact: PropTypes.func.isRequired,
};
