import {odometer} from '../lib';
import '../../less/4_sections/sec_experience.less'
import '../../less/3_blocks/block_facts.less'

const experienceSec = () => {
  import('../../less/2_plugins/odometer.less').then(() => odometer('js-odometer'))
};

export default experienceSec;
