import isEmail from 'is-email'
import IMask from 'imask'
import Flatpickr from 'flatpickr'
import { Russian } from "flatpickr/dist/l10n/ru.js"


class Form {

  _formInputs = []
  _isSending = false

  constructor(type) {
    this._type = type
  }

  get isSending() {
    return this._isSending
  }

  set isSending(value) {
    this._isSending = Boolean(value)
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
        input.inputNode.classList.toggle('input-valid', input.isValid || !input.isRequired)
        input.inputNode.classList.toggle('input-error', !input.isValid && input.isRequired)
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
    this._formInputs.forEach(input => input.clear())
    this.inputChangeColor(true)
  }

  showInvalidInputs() {
    this.inputs.forEach(input => input.isTouched = true)
    this.inputChangeColor()
  }

  onChange() {}

}


export class FormInputs {

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
    this._valid = Boolean(value)
  }

  get isValid() {
    return this._valid;
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

  set disabled(value) {
    this._inputNode.disabled = value
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
      position: 'above left',
      positionElement: inputNode,
      monthSelectorType: 'static',
      clickOpens: false,
      // static: true,
      onChange: selectedDate => this.value = selectedDate[0],
      onReady: ()=> import('../../less/2_plugins/flatpickr_light.css')
    };
    this._calendar = new Flatpickr(inputNode, options)
    inputNode.addEventListener('click', this._calendar.open)
  }

  _validator(value) {
     return value !== ''
  }

  getFormattedDate(format) {
    return this.value ? this._calendar.formatDate(this.value, format) : ''
  }

}

class CalendarInlineInput extends FormInputs {
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
      monthSelectorType: 'static',
      onChange: selectedDate => this.value = selectedDate[0],
      onReady: ()=> import('../../less/2_plugins/flatpickr_light.css')
    };
    this._calendar = new Flatpickr(inputNode, options)
  }
  _validator(value) {
    return Boolean(value)
  }

  getFormattedDate(format) {
    return this.value ? this._calendar.formatDate(this.value, format) : ''
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
    this._submitButtonNode = formNode.querySelector('[data-type="submit"]')
  }

  set isSending (value) {
    super.isSending = value
    this._formInputs.forEach(input => input.disabled = this.isSending)
    if (this._submitButtonNode) {
      this._submitButtonNode.classList.toggle('running', this.isSending)
    }
  }

  get isSending() {
    return super.isSending
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

export class TireServiceForm extends SubscribeForm {
  constructor(formNode, tireSelector, carSelector, tireService) {
    super(formNode, 'tire-fitting')
    this.tireSelector = tireSelector
    this.carSelector = carSelector
    this.tireService = tireService
  }
}
