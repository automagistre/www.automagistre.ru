import React, {Component} from 'react';
import { connect } from 'react-redux';

import {userLoaded} from '../../actions';
import {withGarageData, compose} from '../hoc';

class Contacts extends Component {

  componentDidMount() {
    const {garageData, userUuid, userLoaded} = this.props
    garageData.getUser(userUuid).then((data) => userLoaded(data))
  }

  render() {
    const {
      name,
      surname,
      phone,
      email
    } = this.props.userData

    return (
        <form className="form">
          <div className="form__line">
            <input className="form__input" type="text" name="name"
                   value={ name || '' } readOnly disabled placeholder="Имя"/>
          </div>
          <div className="form__line">
            <input className="form__input" type="text" name="name"
                   value={ surname || '' } readOnly disabled placeholder="Фамилия" />
          </div>
          <div className="form__line">
            <input className="form__input js-phone-mask" type="phone" name="numb"
                   value={ phone || '' } readOnly disabled placeholder="Телефон"/>
          </div>
          <div className="form__line">
            <input className="form__input" type="text" name="mail"
                   value={ email || '' } readOnly
                   disabled placeholder="E-mail" />
          </div>
        </form>
    )
  }
}


const mapStateToProps = ({userUuid, userData}) => {
  return {userUuid, userData}
}

const mapDispatchToProps = {
  userLoaded
}

export default compose(
    withGarageData(),
    connect(mapStateToProps, mapDispatchToProps)
)(Contacts);
