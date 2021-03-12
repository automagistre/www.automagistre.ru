import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import isEmail from 'is-email'
import {useMutation} from '@apollo/client';
import {UPDATE_USER_CONTACTS} from '../../gql/queries';

const Contacts = props => {
  const [isReadOnly, setReadOnly ] = useState(true);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { ...props.user },
    mode: 'onChange',
    reValidateMode: 'onBlur'
  });

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_CONTACTS, {
    update(cache, { data:{ updateUser } }) {
      cache.modify({
        id: cache.identify(updateUser),
        fields:{ updateUser }
      })
    }
  })

  const onSubmit = ({name, surname, email}) => {

    if (loading) {
      return;
    }
    if (isReadOnly) {
      setReadOnly(false);
      return;
    }

    setReadOnly(true)
    updateUser({variables:{
        userContacts: {name, surname, email}
      }})
    .then(()=> setReadOnly(true))
  }

  const onErrors = () => setReadOnly(false);

  return (
      <form className="form" onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="form__line">
          <input className={"form__input" + (errors.name ? " input-error" : "")}
                 type="text"
                 name="name"
                 readOnly={isReadOnly}
                 placeholder="Имя"
                 ref={register({required: true, minLength: 1})}
          />
        </div>
        <div className="form__line">
          <input className={"form__input" + (errors.surname ? " input-error" : "")}
                 type="text"
                 name="surname"
                 readOnly={isReadOnly}
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
                 readOnly={isReadOnly}
                 placeholder="E-mail"
                 ref={register({
                   required: false,
                   validate:{ isEmail: value => isEmail(value) || !value }})}
          />
        </div>
        { error && <div style={{color: 'red'}}>Не удалось сохранить</div>}
        { errors?.name && <div style={{color: 'red'}}>Имя не может быть пустым</div>}
        { errors?.email && <div style={{color: 'red'}}>Неверный e- mail</div>}
        <button type="submit" className="btn garage__join-btn">
          {loading ? "Сохраняем..." :
              isReadOnly ?
              "Изменить" : "Сохранить"
          }
        </button>

      </form>
  )
}

export default Contacts;
