import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import isEmail from 'is-email'

const Contacts = props => {
  const { name, surname, mobilePhone, email} = props.user
  const defaultValues = {
    name,
    surname,
    mobilePhone,
    email
  }
  const { register, handleSubmit, errors } = useForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const [readOnly, setReadOnly] = useState(true)
  const onSubmit = data => {
    if(!readOnly) {
      console.log(data, readOnly);
    }
    setReadOnly(!readOnly)
  };
  const onErrors = errors => console.log(errors);

  return (
      <form className="form" onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="form__line">
          <input className={"form__input" + (errors.name ? " input-error" : "")}
                 type="text"
                 name="name"
                 readOnly={readOnly}
                 placeholder="Имя"
                 ref={register({required: true, minLength: 1})}
          />
        </div>
        <div className="form__line">
          <input className={"form__input" + (errors.surname ? " input-error" : "")}
                 type="text"
                 name="surname"
                 readOnly={readOnly}
                 placeholder="Фамилия"
                 ref={register({required: true, minLength: 1})}
          />
        </div>
        <div className="form__line">
          <input className={"form__input" + (errors.mobilePhone ? " input-error" : "")}
                 type="phone"
                 readOnly
                 name="mobilePhone"
                 placeholder="Телефон"
                 ref={register({setValueAs: value=> value})}
          />
        </div>
        <div className="form__line">
          <input className={"form__input" + (errors.email ? " input-error" : "")}
                 type="text"
                 name="email"
                 readOnly={readOnly}
                 placeholder="E-mail"
                 ref={register({
                   required: false,
                   validate:{ isEmail: value => isEmail(value) || !value }})}
          />
        </div>
        <button type="submit" className="btn car-info__join-btn">
          {readOnly ? 'Изменить' : 'Сохранить'}
        </button>
      </form>
  )
}

export default Contacts;
