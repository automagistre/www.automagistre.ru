import isEmail from 'is-email'
import IMask from 'imask';
import flatpickr from 'flatpickr';
import '../../less/2_plugins/flatpickr_light.css'
import { Russian } from "flatpickr/dist/l10n/ru.js"


const FORM_CONTROLS_TEMPLATE = {
  name: {
    value: '',
    isTouched:false,
    isValid: false,
    validation: {
      required:true,
    }
  },
  text: {
    value: '',
    isTouched:false,
    isValid: false,
    validation: {
      required:true,
    }
  },
  email:{
    value:'',
    isTouched:false,
    isValid: false,
    validation: {
      required: true,
      email: true
    }
  },
  phone: {
    value: '',
    isTouched:false,
    isValid: false,
    validation: {
      required: true,
      phone: true
    }
  },
  license:{
    value: true,
    isValid: true,
    validation: {
      checked: true,
    }
  },
  calendar: {
    value: '',
    isTouched: false,
    isValid: false,
    validation: {
      required: true,
    }
  }
};

class Form {
  isValid = false;
  formControls = {};

  validateForm = (controls) => {
    let isValid = true;
    for (let control in controls) {
      try { isValid = isValid && this.formControls[control].isValid; }
      catch (e) { console.error('Invalid property', control); }
    }
    return isValid
  };

  controlModifier(control, controlName, event) {
    throw "Subclass must implement abstract method";
  };

  validateControl(value, validation){
    throw "Subclass must implement abstract method";
  };

  preparationData() {
    throw "Subclass must implement abstract method";
  }

  onChangeHandler = (event, controlName) => {
    let formControls = {...this.formControls};
    let control = {...formControls[controlName]};
    control.isTouched = true;
    this.controlModifier(control, controlName, event);
    control.isValid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;
    this.formControls[controlName] = {...control};
    this.isValid = this.validateForm(formControls);
    this.controlChangeColor();
  };

  controlChangeColor() {
    for (let controlName in this.formControls) {
      let control = this.formControls[controlName];
      if (control.isTouched) {
        control.node.classList.toggle('input-valid', control.isValid);
        control.node.classList.toggle('input-error', !control.isValid);
      }
    }
  }

  async send() {
    console.log(this);
    if (this.isValid) {
      // this.preparationData()
    } else {
      for (let controlName in this.formControls) {
        this.formControls[controlName].isTouched = true;
      }
      this.controlChangeColor();
      console.error('Invalid Form');
      return false;
    }
    try {
      await setTimeout(() => console.log("data send"), 5000);
      return true;
    } catch (e) {
      console.log('Data send error', e)
    }
  }
}


export class SubscribeForm extends Form {

  constructor($el, options={}) {
    super();
    const DEFAULT_OPTIONS = {
      name: FORM_CONTROLS_TEMPLATE.name,
      phone: FORM_CONTROLS_TEMPLATE.phone,
      license: FORM_CONTROLS_TEMPLATE.license,
      calendar: FORM_CONTROLS_TEMPLATE.calendar,
      email: FORM_CONTROLS_TEMPLATE.email,
      text: FORM_CONTROLS_TEMPLATE.text
    };
    const formControls = options ?
        Object.assign(DEFAULT_OPTIONS, options) :
        DEFAULT_OPTIONS;

    for (let controlName in formControls) {
      const $control = $el.querySelector(`[data-formcontrol=${controlName}]`);
      if ($control) {
        formControls[controlName].node  = controlName === 'license' ? $control.parentElement :
                                                                      $control;
        this.formControls[controlName] = {...formControls[controlName]};
        switch (controlName) {
          case 'name':
            this._activateNameInput($control);
            break;
          case 'phone':
            this._activatePhoneInput($control);
            break;
          case 'license':
            this._activeLicenseInput($control);
            break;
          case 'calendar':
            this._activeCalendarInput($control);
            break;
          case 'email':
            this._activeEmailInput($control);
            break;
          case 'text':
            this._activeTextInput($control);
        }
      }
    }

    const $button = $el.querySelector('a[data-formcontrol=submit]');
    if ($button){
      $button.addEventListener('click', ()=>this.send())
    }
  }

  controlModifier(control, controlName, event) {
    if (controlName === 'name') {
      control.value = event.target.value.replace(/(?:^|\s)\S/g, l => l.toUpperCase());
      event.target.value = control.value;
    }
    if (controlName === 'license') {
      control.value = event.target.checked;
    }
    if (controlName === 'phone') {
      control.value = event.target.value;
    }
    if (controlName === 'calendar') {
      control.value = event;
    }
    if (controlName === 'text') {
      control.value = event.target.value;
    }
    if (controlName === 'email') {
      control.value = event.target.value.toLowerCase();
      event.target.value = control.value
    }
  }

  validateControl(value, validation) {
    let isValid = true;
    if (validation.required) {
      isValid = value.toString().trim() !== "" && isValid
    }
    if (validation.email) {
      isValid = isEmail(value) && isValid
    }
    if (validation.phone) {
      isValid = /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(value) && isValid
    }
    if (validation.checked) {
      isValid = value === validation.checked
    }
    return isValid;
  };

  _activateNameInput($control) {
    $control.addEventListener('keyup',
        e => this.onChangeHandler(e, 'name'));
  }

  _activeLicenseInput($control) {
    $control.addEventListener('click',
        e => this.onChangeHandler(e, 'license'));
  }

  _activeTextInput($control) {
    $control.addEventListener('keyup',
        e => this.onChangeHandler(e, 'text'));
  }

  _activeEmailInput($control) {
    $control.addEventListener('keyup',
        e => this.onChangeHandler(e, 'email'));
  }

  _activatePhoneInput($control) {
    const phonePattern = '+{7}(000)000-00-00';
    const phoneMask = new IMask($control, {
      mask: phonePattern,
      lazy: true,
      placeholderChar: '_'
    });

    $control.addEventListener('focus', () => {
      phoneMask.updateOptions({ lazy: false });
    });
    $control.addEventListener('blur', () => {
      if (phoneMask.unmaskedValue === '7') {
        phoneMask.updateOptions({ mask: '', lazy: true });
        phoneMask.updateOptions({ mask: phonePattern});
      }
    });
    $control.addEventListener('keyup',e => this.onChangeHandler(e, 'phone'));
  }

  _activeCalendarInput($control) {
    const options = {
      locale: Russian,
      dateFormat: 'j F Y',
      minDate: "today",
      position: 'below',
      onClose: selectedDate => this.onChangeHandler(selectedDate[0], 'calendar')
    };
    flatpickr($control, options)
  }
}
