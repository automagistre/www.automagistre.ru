import {odometer, updateOdometerData} from '../lib';
import {SubscribeForm} from '../ui/forms';
import ServerDataSender from '../helpers/server-data-sender';
import SuccessFeedBackPopup from '../ui/Popups/SuccessFeedBackPopup';
import ErrorFeedBackPopup from '../ui/Popups/ErrorFeedBackPopup';

const happenSec = async () => {
  const happenSecNode = document.querySelector('section.sec-happen')
  const formNode  = happenSecNode.querySelector('.sec-happen__form')

  if (!formNode) return

  const scheduleForm = new SubscribeForm(formNode, formNode.dataset.formType || 'schedule');
  const dataSender = new ServerDataSender()
  dataSender.onSuccess = () => {
    (new SuccessFeedBackPopup('Мы получили ваш запрос')).open()
    scheduleForm.clear()
  }
  dataSender.onError = () => {
    (new ErrorFeedBackPopup('Ошибка соединения, повторите попытку')).open()
  }
  formNode.querySelector('a[data-type="submit"]').addEventListener('click', async ()=>{
    if (scheduleForm.isValid) await dataSender.sendForm(scheduleForm)
  })
  await updateOdometerData(happenSecNode)
  odometer(happenSecNode)
}

export default happenSec
