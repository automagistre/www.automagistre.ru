import isEmail from 'is-email'
import IMask from 'imask';
import Flatpickr from 'flatpickr';
import '../../less/2_plugins/flatpickr_light.css'
import { Russian } from "flatpickr/dist/l10n/ru.js"
import SuccessFeedBackPopup from './Popups/SuccessFeedBackPopup';


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
    // throw "Subclass must implement abstract method";
  }

  onChangeHandler() {
    this.validateForm();
    this.inputChangeColor();
    this.onChange()
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

  getInputsStatus() {
    const status = { };

    for (let [inputName, input] of Object.entries(this.formInputs)) {
      status[inputName] = {
        value: input.value,
        isValid: input.isValid,
        isTouched: input.isTouched,
        isRequired: input.isRequired
      }
    }
    return status;
  };

  clear() {
    Object.values(this.formInputs).forEach(input => input.clear());
  }

  async send() {
    const serverImitation = () => new Promise(resolve => {
      setTimeout(() => {console.log('получено');
        resolve('OK')}, 5000);
    });
    if (this.isValid) {
      this.preparationData()
    } else {
      for (let inputName in this.formInputs) {
        this.formInputs[inputName].isTouched = true;
      }
      this.inputChangeColor();
      console.error('Invalid Form');
      return false;
    }
    try {
      this.isSending = true;
      const popup = new SuccessFeedBackPopup();
      await serverImitation();
      this.clear();
      this.validateForm();
      this.inputChangeColor(true);
      popup.message = 'Мы получили ваше сообщение';
      popup.open();
      setTimeout(()=> popup.close(), 3000);
      this.isSending = false;
    } catch (e) {
      console.log('Data send error', e);
      this.isSending = false;
    }
  }

  onChange() {}
}


class FormInputs {
  name = undefined;
  _valid = false;
  _touched = false;
  _value = '';
  isRequired = true;

  constructor($input, callback = function() {
    throw new Error("You must set onChange callback")
  }) {
    this.$inputElement = $input;
    this._onChange = callback;
  }

  set isValid(value) {
    throw new Error('Read only property, cant set "isValid":' + value )
  }

  get isValid() {
    return this._valid || !this.isRequired;
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
    this.isTouched = false;
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
    this._value = $input.checked;
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
    this._value = '';
    const options = {
      locale: Russian,
      dateFormat: 'j F Y',
      minDate: "today",
      position: 'below',
      onChange: selectedDate => this.value = selectedDate[0]
    };
    this._calendar = new Flatpickr($input, options)
  }

  _validator(value) {
     return value !== '';
  }

  getFormattedDate(format) {
    return this._calendar.formatDate(this.value, format)
  }

}

class CalendarInlineInput extends CalendarInput {
  constructor(inputNode, callback) {
    super(inputNode, callback);
    this.name = 'calendar-inline';
    this._value = '';
    const options ={
      locale: Russian,
      dateFormat: 'j F Y',
      minDate: "today",
      position: 'below',
      inline: true,
      defaultDate: this._value,
      onChange: selectedDate => this.value = selectedDate[0]
    };
    this._calendar = new Flatpickr(inputNode, options)
  }
  _validator(value) {
    return Boolean(value);
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
      $button.addEventListener('click', ()=>{
        if (!this.isSending) {
          $button.classList.add('running');
          this.send().then(()=> {$button.classList.remove('running')})
        }
      })
    }
  }
}


export class CalculatorForm extends SubscribeForm {
  constructor(node, inputNode) {
    super(node);
    const calendarInlineNode = node.querySelector('[data-formcontrol=calendar-inline]');
    const self = this;
    this.formInputs['text'].isRequired = false;
    this.formInputs['calendar'] = new CalendarInlineInput(calendarInlineNode, function() {
      inputNode.innerHTML = this.getFormattedDate('d.m.y');
      self.onChangeHandler();
    });
  }
}
