import LocalStorageManager from './Local-storage-manager';
import {FormInputs} from '../ui/forms';

const SERVER_URL = API_URL

class FormData {
  _data = {}
  _api_url = ''
  inputs = {}

  constructor(form) {
    this.form = form
  }

  toJSON() {
    return JSON.stringify(this._data)
  }

  get url() {
    return SERVER_URL + this._api_url
  }

  showInvalidData(data) {
    let isInvalidFormInputs = false
    for (let item of data) {
      if (this.inputs[item.field] instanceof FormInputs) {
        this.inputs[item.field].isValid = false
        isInvalidFormInputs = true
      }
    }
    this.form.showInvalidInputs()
    return isInvalidFormInputs
  }
}

class FormScheduleData extends FormData {

  _api_url = '/appeal/schedule'
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
          this._data.name = input.value
          this.inputs['name'] = input
          break
        case 'phone':
          this._data.phone = `+${input.value.replace(/[^\d]/g, "")}`
          this.inputs['phone'] = input
          break
        case 'calendar':
          this._data.date = input.getFormattedDate('Y-m-d')
          this.inputs['date'] = input
          break
        case 'calendar-inline':
          this._data.date = input.getFormattedDate('Y-m-d')
          this.inputs['date'] = input
          break
      }
    }
  }
}


class FormQuestionData extends FormData {

  _api_url = '/appeal/question'
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
          this._data.name = input.value
          this.inputs['name'] = input
          break
        case 'email':
          this._data.email = input.value
          this.inputs['email'] = input
          break
        case 'text':
          this._data.question = input.value
          this.inputs['question'] = input
          break
      }
    }
  }
}


class FormCooperationData extends FormData {

  _api_url = '/appeal/cooperation'
  _data = {
    name: '',
    phone: ''
  }

  constructor (form) {
    super(form);
    for (let input of form.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value
          this.inputs['name'] = input
          break
        case 'phone':
          this._data.phone = `+${input.value.replace(/[^\d]/g, "")}`
          this.inputs['phone'] = input
          break
      }
    }
  }
}

class FormCalculatorData extends FormData {

  _api_url = '/appeal/calc'
  _data = {
    name: '',  // Name in form
    phone: '', // Phone in form
    note: '',  // Message from user
    date: '',  // date in form
    equipmentId: '', // id equipment
    mileage: 0, // mileage of selected TO
    total: 0, // Total cost of order
    works: [ ] // selected works and parts
  }

  constructor(calculator) {
    super(calculator.steps[3].form)
    for (let input of calculator.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value
          this.inputs['name'] = input
          break
        case 'phone':
          this._data.phone = `+${input.value.replace(/[^\d]/g, "")}`
          this.inputs['phone'] = input
          break
        case 'text':
          this._data.note = input.value
          this.inputs['note'] = input
          break
        case 'calendar-inline':
          this._data.date = input.getFormattedDate('Y-m-d')
          this.inputs['date'] = input
          break
      }
    }

    this._data.equipmentId = calculator.equipment.id
    this._data.mileage = calculator.mileage
    this._data.total = calculator.totalPrice

    for (let work of calculator.works) {
      const workData = {
        id: work.id,
        name: work.name,
        price: work.price * 100,
        type: work.type,
        isSelected: work.isSelected,
        parts: []
      }
      for (let part of work.parts) {
        const partData = {
          id: part.id,
          name: part.name,
          price: part.price * 100,
          count: part.count,
          isSelected: part.isSelected
        }
        workData.parts.push(partData)
      }
      this._data.works.push(workData)
    }
  }
}

class FormTireServiceData extends FormData {

  _api_url = '/appeal/tire-fitting'
  _data = {
    name: '',  // Name in form
    phone: '', // Phone in form
    modelId: '', // id model if available
    diameter: 0, // diameter of tires
    bodyType: '', // Selected car type
    total: 0, // Total cost of order
    works: [ ] // selected works
  }

  constructor(form) {
    super(form);
    for (let input of form.inputs) {
      switch (input.name) {
        case 'name':
          this._data.name = input.value
          this.inputs['name'] = input
          break
        case 'phone':
          this._data.phone = `+${input.value.replace(/[^\d]/g, "")}`
          this.inputs['phone'] = input
          break
      }
    }
    const localData = new LocalStorageManager()
    this._data.modelId = localData.caseID || ''
    this._data.diameter = form.tireSelector.currentSelect ? +form.tireSelector.currentSelect.value : 0
    this._data.bodyType = form.carSelector.currentSelect ? form.carSelector.currentSelect.name : ''
    this._data.total = form.tireService.totalCost * 100 || 0
    const works = []
    for (let work of form.tireService.getSelected()) {
      works.push({
        name: work.name,
        price: work.price * 100
      })
    }
    this._data.works = works
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
      case 'tire-fitting':
        return new FormTireServiceData(form)
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

    if (form.isSending) return

    const formData = this._formFactory.getFormData(form)
    form.isSending = true
    const response = await fetch(formData.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: formData.toJSON(),
    })
    form.isSending = false
    if (response.ok) {
      this.onSuccess()
      return
    }
    if (response.status === 400){
      const data = await response.json()
      if(!formData.showInvalidData(data)) this.onError()
    }
    else {
      this.onError()
    }
  }
}

export default ServerDataSender
