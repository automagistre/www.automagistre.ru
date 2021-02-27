import React, { Component } from 'react';
import Contacts from './contacts';
import {compose, withGarageData} from '../hoc';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchContacts} from '../../actions';
import {ErrorIndicator, Loading} from '../server-indicators';

class ContactsGroup  extends Component {

  componentDidMount() {
    this.props.fetchContacts()
  }

  render() {
    let response;
    const {user, loading, error} = this.props;
    if (loading) {
      response =  <Loading/>
    } else if (error) {
      response =  <ErrorIndicator/>
    } else {
      response = <Contacts user={user} />
    }

    return (
        <section className="garage__group garage__contact">
          <h2 className="garage__title">Контактные данные</h2>
          {response}
        </section>
    )
  }
}

const mapStateToProps = ({userContacts: { user, loading, error }}) => {
  return {user, loading, error}
}

const mapDispatchToProps = (dispatch, { garageData }) => {
  return bindActionCreators(
      {fetchContacts: fetchContacts(garageData)}, dispatch
  )
}

export default compose(
    withGarageData(),
    connect(mapStateToProps, mapDispatchToProps)
)(ContactsGroup);

