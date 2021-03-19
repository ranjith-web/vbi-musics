import React from 'react';
import './styles.css';

class Search extends React.Component {
  constructor (props) {
    super(props)

    this.state = { query: "" };
    this.clearQuery = this.clearQuery.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  updateQuery (e) {
    this.setState({ query: e.target.value }, () => {
        this.props.onChange(e.target.value);
    });
  }

  clearQuery () {
    this.setState({ query: "" });
  }


  render () {
    return (
        <li className="search-container">
            <label className="search">
            <input
            id="search"
            type="text"
            placeholder="Search"
            value={ this.state.query }
            onChange={ this.updateQuery }/>
            <i className="fa fa-search" aria-hidden="true"/>
            </label>
        </li>
    );
  }
}

export default Search;
