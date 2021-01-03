import {odometer, updateOdometerData} from '../lib';


const experienceSec = async () => {
  const experienceSecNode = document.querySelector('section.sec-experience')
  await updateOdometerData(experienceSecNode)
  odometer(experienceSecNode)
}

export default experienceSec;
