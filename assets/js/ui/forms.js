import isEmail from 'is-email'
import IMask from 'imask';
import Flatpickr from 'flatpickr';
import '../../less/2_plugins/flatpickr_light.css'
import { Russian } from "flatpickr/dist/l10n/ru.js"


class Form {
  isValid = false;
  formInputs = {};

  validateForm() {
    let isValid = true;
    const inputs = {...this.formInputs};
    for (let input of Object.values(inputs)) {
      isValid = input.isValid && isValid;
    }
    this.isValid = isValid
  };

  preparationData() {
    throw "Subclass must implement abstract method";
  }

  onChangeHandler () {
    this.validateForm();
    this.inputChangeColor();
  };

  inputChangeColor(removeColors=false) {
    if (removeColors) {
      for (let input of Object.values(this.formInputs)) {
        input.$inputElement.classList.remove('input-valid');
        input.$inputElement.classList.remove('input-error');
      }
    }
    for (let input of Object.values(this.formInputs)) {
      if (input.isTouched) {
        input.$inputElement.classList.toggle('input-valid', input.isValid);
        input.$inputElement.classList.toggle('input-error', !input.isValid);
      }
    }
  }

  async send() {
    console.log(this);
    if (this.isValid) {
      // this.preparationData()
    } else {
      for (let inputName in this.formInputs) {
        this.formInputs[inputName].isTouched = true;
      }
      this.inputChangeColor();
      console.error('Invalid Form');
      return false;
    }
    try {
      await setTimeout(() => {
        console.log("data send");
        Object.values(this.formInputs).forEach(input => input.clear());
        this.validateForm();
        this.inputChangeColor(true);
        console.log(this);
      }, 3000);
      return true;
    } catch (e) {
      console.log('Data send error', e)
    }
  }
}


class FormInputs {
  name = undefined;
  _valid = false;
  _touched = false;
  _value = '';

  constructor($input, callback = function() {
    throw new Error("You must set onChange callback")
  }) {
    this.$inputElement = $input;
    this._onChange = callback;
  }

  set isValid(value) {
    throw new Error('Read only property')
  }

  get isValid() {
    return this._valid
  }

  set isTouched(value) {
    this._touched = Boolean(value);
  }

  get isTouched() {
    return this._touched
  }

  set value(value) {
    this._touched = true;
    this._value = this._modifier(value);
    this._valid = this._validator(this._value);
    this.updateInputValue();
    this._onChange();
  }

  _modifier(value) {
    return value;
  }

  _validator(value) {
    throw  new Error("Subclass must implement abstract method");
  }

  get value(){
    return this._value;
  }

  updateInputValue() {};

  clear() {
    this._touched = false;
    this.updateInputValue();
  }
}


class NameInput extends FormInputs {
  constructor($input, callback) {
    super($input, callback);
    this.name = 'name';
    this._value = '';
    $input.addEventListener('keyup', e => this.value = e.target.value)
  }

  _modifier(value) {
    return value.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
  }

  _validator(value) {
    return value.toString().trim() !== ""
  }

  updateInputValue() {
    this.$inputElement.value = this.value
  }

  clear() {
    this._value = '';
    this._valid = false;
    super.clear();
  }
}


class TextInput extends FormInputs {
  constructor($input, callback) {
    super($input, callback);
    this.name = 'text';
    this._value = '';
    $input.addEventListener('keyup', e => this.value = e.target.value)
  }

  _validator(value) {
    return value.toString().trim() !== ""
  }

  updateInputValue() {
    this.$inputElement.value = this.value
  }

  clear() {
    this._value = '';
    this._valid = false;
    super.clear();
  }
}


class EmailInput extends FormInputs{
  constructor($input, callback) {
    super($input, callback);
    this.name = 'email';
    this._value = '';
    $input.addEventListener('keyup', e => this.value = e.target.value)
  }

  _validator(value) {
    return isEmail(value);
  }

  updateInputValue() {
    this.$inputElement.value = this.value
  }
  clear() {
    this._value = '';
    this._valid = false;
    super.clear();
  }
}


class LicenseInput extends FormInputs {
  constructor($input, callback) {
    super($input, callback);
    this.name = 'license';
    this._value = true;
    this._valid = true;

    $input.addEventListener('click', e => this.value = e.target.checked);
    this.$inputElement = $input.parentNode;
    this.$valueElement = $input
  }
  _validator(value) {
    return this._value;
  }

  updateInputValue() {
    this.$valueElement.checked = this.value;
  }

  clear() {
    this._value = true;
    this._valid = true;
    super.clear();
  }
}


class PhoneInput extends FormInputs {
  constructor($input, callback) {
    super($input, callback);
    this.name = 'phone';
    this._value = '';

    const phonePattern = '+{7}(000)000-00-00';
    this.phoneMask = new IMask($input, {
      mask: phonePattern,
      lazy: true,
      placeholderChar: '_'
    });
    $input.addEventListener('keyup', () => this.value = this.phoneMask.value);
  }

  _validator(value) {
    return /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(value)
  }

  clear() {
    this.phoneMask.value = '';
    this._valid = false;
    super.clear();
  }
}


class CalendarInput extends FormInputs {
  constructor($input, callback) {
    super($input, callback);
    this.name = 'calendar';
    this.value = '';
    const options = {
      locale: Russian,
      dateFormat: 'j F Y',
      minDate: "today",
      position: 'below',
      onClose: selectedDate => this.value = selectedDate
    };
    new Flatpickr($input, options)
  }

  _validator(value) {
     return value !== '';
  }
}

const FORM_DEFAULT_INPUTS = {
  'name': NameInput,
  'phone': PhoneInput,
  'license': LicenseInput,
  'calendar': CalendarInput,
  'email': EmailInput,
  'text': TextInput
};

export class SubscribeForm extends Form {
  constructor($form) {
    super();
    for (let [inputName, inputClass] of Object.entries(FORM_DEFAULT_INPUTS)) {
      const $input = $form.querySelector(`[data-formcontrol=${inputName}]`);
      if ($input) {
        this.formInputs[inputName] = new inputClass($input, () => this.onChangeHandler())
      }
    }

    const $button = $form.querySelector('a[data-formcontrol=submit]');
    if ($button){
      $button.addEventListener('click', ()=>this.send())
    }
  }
}


export class CalculatorForm extends SubscribeForm {
  constructor($el) {
    super($el);
  }
}
