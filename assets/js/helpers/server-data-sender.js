const SERVER_URL = `${location.protocol}//msk.${location.host}`

class FormData {
  _data = {}
  _api_url = ''

  constructor() {

  }

  toJSON() {
    return JSON.stringify(this._data)
  }

  get url() {
    return SERVER_URL + this._api_url
  }
}

class FormScheduleData extends FormData {

  _api_url = '/api/v1/appeal/schedule'
  _data = {
    name: '',
    phone: '',
    date: ''
  }

  constructor(form) {
    super(form);
    for (let input of form.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value; break
        case 'phone':
          this._data.phone = input.value; break
        case 'calendar':
          this._data.date = input.getFormattedDate('Y-m-d'); break
        case 'calendar-inline':
          this._data.date = input.getFormattedDate('Y-m-d'); break
      }
    }
  }
}


class FormQuestionData extends FormData {

  _api_url = '/api/v1/appeal/question'
  _data = {
    name: '',
    email: '',
    question: ''
  }

  constructor (form) {
    super(form);
    for (let input of form.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value; break
        case 'email':
          this._data.email = input.value; break
        case 'text':
          this._data.question = input.value; break
      }
    }
  }
}


class FormCooperationData extends FormData {

  _api_url = '/api/v1/appeal/cooperation'
  _data = {
    name: '',
    phone: ''
  }

  constructor (form) {
    super(form);
    for (let input of form.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value; break
        case 'phone':
          this._data.phone = input.value; break
      }
    }
  }
}

class FormCalculatorData extends FormData {

  _api_url = '/api/v1/appeal/calc'
  _data = {
    name: '',  // Name in form
    phone: '', // Phone in form
    note: '',  // Message from user
    date: '',  // date in form
    equipment: '', // id equipment
    mileage: 0, // mileage of selected TO
    total: 0, // Total cost of order
    works: [ ] // selected works and parts
  }

  constructor(calculator) {
    super()
    this._data.name = calculator.name
    this._data.phone = calculator.phone
    this._data.note = calculator.note
    this._data.date = calculator.getFormattedDate('Y-m-d')
    this._data.equipment = calculator.equipment.id
    this._data.mileage = calculator.mileage
    this._data.total = calculator.totalPrice
  }
}

class FormDataFactory {

  getFormData(form) {
    switch (form.type) {
      case 'cooperation':
        return new FormCooperationData(form)
      case 'question':
        return new FormQuestionData(form)
      case 'schedule':
        return new FormScheduleData(form)
      case 'calculator':
        return new FormCalculatorData(form)
      default:
        throw new Error('No API route')
    }
  }
}


class ServerDataSender {

  constructor() {
    this._formFactory = new FormDataFactory()
  }

  onError() {}

  onSuccess() {}

  async sendForm(form) {
    try {
      const formData = this._formFactory.getFormData(form)
      console.log(formData)
      await fetch(formData.url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: formData.toJSON(),
        mode: 'no-cors'
      })
      this.onSuccess()
    } catch (e) {
      this.onError()
      console.log(e)
    }
  }
}

export default ServerDataSender
