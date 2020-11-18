const SERVER_URL = `${location.protocol}//msk.${location.host}`

class FormData {
  _data = {}
  _api_url = ''

  constructor(form) {

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
    email: '',
    date: ''
  }

  constructor(form) {
    super(form);
    for (let input of form.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value; break
        case 'email':
          this._data.email = input.value; break
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


class FormDataFactory {

  getFormData(form) {
    switch (form.type) {
      case 'cooperation':
        return new FormCooperationData(form)
      case 'question':
        return new FormQuestionData(form)
      case 'schedule':
        return new FormScheduleData(form)
      default:
        return null
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
    if (!form.isValid) return
    const formData = this._formFactory.getFormData(form)
    const response = await fetch(formData.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: formData.toJSON(),
      mode: 'no-cors'
    })
    if (response.ok) {
      const result = await response.json()
      this.onSuccess()
      return result
    } else {
      this.onError()
    }
  }
}

export default ServerDataSender
