import LocalStorageManager from './Local-storage-manager';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
  createAppealCooperation,
  createAppealQuestion,
  createAppealSchedule, createAppealTireFitting,
} from './gql/mutations';

const SERVER_URL = APOLLO_URL

class FormData {

  query = undefined
  input = {}

  constructor(form) {
    this.form = form
  }

  init() {
    const API_KEYS = Object.keys(this.input)
    if (Object.keys(this.input).includes('date')) API_KEYS.push('calendar', 'calendar-inline')

    for (let input of this.form.inputs) {
      if (API_KEYS.includes(input.name))
        switch (input.name) {
          case 'name':
            this.input.name = input.value; break
          case 'phone':
            this.input.phone = input.value; break
          case 'email':
            this.input.email = input.value; break
          case 'calendar':
            this.input.date = input.getFormattedDate('Y-m-d'); break
          case 'calendar-inline':
            this.input.date = input.getFormattedDate('Y-m-d'); break
        }
    }
  }
}

class FormScheduleData extends FormData {

  query = createAppealSchedule
  input = {
    name: '',
    phone: '',
    date: ''
  }
}


class FormQuestionData extends FormData {

  query = createAppealQuestion
  input = {
    name: '',
    email: '',
    question: ''
  }

  constructor (form) {
    super(form);
    for (let input of form.inputs) {
      if (input.name === 'text') {
        this.input.question = input.value
        break
      }
    }
  }
}


class FormCooperationData extends FormData {

  query = createAppealCooperation
  input = {
    name: '',
    phone: ''
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
    this._data.total = calculator.totalPrice.toUnit() * 100

    for (let work of calculator.works) {
      const workData = {
        id: work.id,
        name: work.name,
        price: work.price.toUnit() * 100,
        type: work.type,
        isSelected: work.isSelected,
        parts: []
      }
      for (let part of work.parts) {
        const partData = {
          id: part.id,
          name: part.name,
          price: part.price.toUnit() * 100,
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

  query = createAppealTireFitting
  input = {
    name: '',  // Name in form
    phone: '', // Phone in form
    vehicleId: '', // id model if available
    diameter: 0, // diameter of tires
    category: 'unknown', // Selected car type
    total: 0, // Total cost of order
    works: [ ] // selected works
  }

  constructor(form) {
    super(form);
    const localData = new LocalStorageManager()
    this.input.vehicleId = localData.caseID || undefined
    this.input.diameter = form.tireSelector.currentSelect ? +form.tireSelector.currentSelect.value : 0
    this.input.category = form.carSelector.currentSelect ? form.carSelector.currentSelect.value : 'unknown'
    this.input.total = `${form.tireService.totalCost.getCurrency()} ${form.tireService.totalCost.getAmount()}`
    const works = []
    for (let {name, price} of form.tireService.getSelected()) {
      works.push({name, price: `${price.getCurrency()} ${price.getAmount()}`})
    }
    this.input.works = works
  }
}

class FormDataFactory {

  getFormData(form) {
    let formData
    switch (form.type) {
      case 'cooperation':
        formData = new FormCooperationData(form); break;
      case 'question':
        formData = new FormQuestionData(form); break;
      case 'schedule':
        formData = new FormScheduleData(form); break;
      case 'calculator':
        formData = new FormCalculatorData(form); break;
      case 'tire-fitting':
        formData = new FormTireServiceData(form); break;
      default:
        throw new Error('No API route')
    }
    formData.init()
    return formData
  }
}


class ServerDataSender {

  constructor() {
    this.client = new ApolloClient({
      uri: SERVER_URL,
      cache: new InMemoryCache()
    })

    this._formFactory = new FormDataFactory()
  }

  onError() {}

  onSuccess() {}

  async sendForm(form) {

    if (form.isSending) return

    const formData = this._formFactory.getFormData(form)
    try {
      form.isSending = true
      await this.client.mutate({
        mutation: formData.query,
        variables: {input: formData.input}})
      this.onSuccess()
    } catch (e) {
      this.onError()
      console.log(e, formData);
    }
    form.isSending = false
  }
}

export default ServerDataSender
