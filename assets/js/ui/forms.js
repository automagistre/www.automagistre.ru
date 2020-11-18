import isEmail from 'is-email'
import IMask from 'imask'
import Flatpickr from 'flatpickr'
import '../../less/2_plugins/flatpickr_light.css'
import { Russian } from "flatpickr/dist/l10n/ru.js"


class Form {
  _formInputs = []

  constructor(type) {
    this._type = type
  }

  get type() {
    return this._type
  }

  get isValid() {
    let isValid = true
    const inputs = [...this._formInputs]
    for (let input of inputs) {
      if (input.isRequired) isValid = input.isValid && isValid
    }
    return  isValid
  }

  set isValid(value) {
    throw new Error('Cant set readonly property "isValid"' + value)
  }

  onChangeHandler() {
    this.inputChangeColor()
    this.onChange()
  }

  inputChangeColor(removeColors=false) {
    if (removeColors) {
      for (let input of this._formInputs) {
        input.inputNode.classList.remove('input-valid')
        input.inputNode.classList.remove('input-error')
      }
    }
    for (let input of this._formInputs) {
      if (input.isTouched) {
        input.inputNode.classList.toggle('input-valid', input.isValid)
        input.inputNode.classList.toggle('input-error', !input.isValid)
      }
    }
  }

  addInput(input) {
    this._formInputs.push(input)
  }

  get inputs() {
      return this._formInputs
  };

  clear() {
    Object.values(this._formInputs).forEach(input => input.clear())
  }

  onChange() {}
}


class FormInputs {

  _name = ''
  _valid = false
  _touched = false
  _value = ''
  _isRequired = true

  constructor(inputNode, callback = function() {
    throw new Error("You must set onChange callback")
  }) {
    this._inputNode = inputNode
    this._onChange = callback
  }

  get inputNode() {
    return this._inputNode
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

  set isRequired(value) {
    this._isRequired = Boolean(value);
  }

  get isRequired() {
    return this._isRequired
  }

  set value(value) {
    this._touched = true
    this._value = this._modifier(value)
    this._valid = this._validator(this._value)
    this.updateInputValue()
    this._onChange()
  }

  _modifier(value) {
    return value
  }

  _validator(value) {
    throw  new Error("Subclass must implement abstract method")
  }

  get value() {
    return this._value
  }

  updateInputValue() {}

  clear() {
    this.isTouched = false
    this.updateInputValue()
  }
}


class NameInput extends FormInputs {
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'name'
    this._value = ''
    inputNode.addEventListener('keyup', e => this.value = e.target.value)
  }

  _modifier(value) {
    return value.replace(/(?:^|\s)\S/g, l => l.toUpperCase())
  }

  _validator(value) {
    return value.toString().trim() !== ""
  }

  updateInputValue() {
    this._inputNode.value = this.value
  }

  clear() {
    this._value = ''
    this._valid = false
    super.clear()
  }
}


class TextInput extends FormInputs {
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'text'
    this._value = ''
    inputNode.addEventListener('keyup', e => this.value = e.target.value)
  }

  _validator(value) {
    return value.toString().trim() !== ""
  }

  updateInputValue() {
    this._inputNode.value = this.value
  }

  clear() {
    this._value = ''
    this._valid = false
    super.clear()
  }
}


class EmailInput extends FormInputs{
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'email'
    this._value = ''
    inputNode.addEventListener('keyup', e => this.value = e.target.value)
  }

  _validator(value) {
    return isEmail(value)
  }

  updateInputValue() {
    this._inputNode.value = this.value
  }
  clear() {
    this._value = ''
    this._valid = false
    super.clear()
  }
}


class LicenseInput extends FormInputs {
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'license'
    this._value = inputNode.checked;
    this._valid = true

    inputNode.addEventListener('click', e => this.value = e.target.checked)
    this._inputNode = inputNode.parentNode
    this._inputNode = inputNode
  }
  _validator(value) {
    return this._value;
  }

  updateInputValue() {
    this.inputNode.checked = this.value
  }

  clear() {
    this._value = true
    this._valid = true
    super.clear()
  }
}


class PhoneInput extends FormInputs {
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'phone'
    this._value = ''

    const phonePattern = '+{7}(000)000-00-00'
    this.phoneMask = new IMask(inputNode, {
      mask: phonePattern,
      lazy: true,
      placeholderChar: '_'
    })
    inputNode.addEventListener('keyup', () => this.value = this.phoneMask.value)
  }

  _validator(value) {
    return /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(value)
  }

  clear() {
    this.phoneMask.value = ''
    this._valid = false
    super.clear()
  }
}


class CalendarInput extends FormInputs {
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'calendar'
    this._value = ''
    const options = {
      locale: Russian,
      dateFormat: 'j F Y',
      minDate: "today",
      position: 'below',
      onChange: selectedDate => this.value = selectedDate[0]
    };
    this._calendar = new Flatpickr(inputNode, options)
  }

  _validator(value) {
     return value !== ''
  }

  getFormattedDate(format) {
    return this._calendar.formatDate(this.value, format)
  }

}

class CalendarInlineInput extends CalendarInput {
  constructor(inputNode, callback) {
    super(inputNode, callback)
    this.name = 'calendar-inline'
    this._value = ''
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
    return Boolean(value)
  }
}


class InputFactory {

  constructor() {

  }

  getInput(inputNode, inputName, callback) {
    if(!inputName) return null
    switch (inputName) {
      case 'name':
        return new NameInput(inputNode, callback)
      case 'phone':
        return new PhoneInput(inputNode, callback)
      case 'license':
        return new LicenseInput(inputNode, callback)
      case 'calendar':
        return new CalendarInput(inputNode, callback)
      case 'email':
        return new EmailInput(inputNode, callback)
      case 'text':
        return new TextInput(inputNode, callback)
      default:
        return null
    }
  }
}

export class SubscribeForm extends Form {
  constructor(formNode, type) {
    super(type);
    const inputFactory = new InputFactory()
    const inputsList = formNode.querySelectorAll('input, textarea')
    inputsList.forEach(inputNode => {
      const input = inputFactory.getInput(inputNode, inputNode.dataset.type, ()=>this.onChangeHandler())
      if (input) {
        input.isRequired = inputNode.dataset.required === 'true'
        this.addInput(input)
      }
    })
  }
}


export class CalculatorForm extends SubscribeForm {
  constructor(formNode, inputNode) {
    super(formNode, 'calculator');
    const calendarInlineNode = formNode.querySelector('[data-type=calendar-inline]')
    const inlineCalendar = new CalendarInlineInput(calendarInlineNode, () => {
      inputNode.innerHTML = inlineCalendar.getFormattedDate('d.m.y')
      this.onChangeHandler();
    })
    inlineCalendar.isRequired = calendarInlineNode.dataset.required === 'true'
    this.addInput(inlineCalendar)
  }
}
