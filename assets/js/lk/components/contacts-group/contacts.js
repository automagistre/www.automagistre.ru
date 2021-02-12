import React, {Component} from 'react';
import { WithData, WithServerData, compose } from '../hoc';

class Contacts extends Component {

  render() {
    const {
      name,
      surname,
      mobilePhone,
      email
    } = this.props.data

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
                   value={ mobilePhone || '' } readOnly disabled placeholder="Телефон"/>
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


const mapMethodsToProps = (serverData) => {
  return {
    getData: serverData.getUser,
  }
};

export default compose(
    WithServerData(mapMethodsToProps),
    WithData,
)(Contacts);
