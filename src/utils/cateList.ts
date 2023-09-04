/* eslint-disable prettier/prettier */
import Bangla from '../../assets/images/bangla.png';
import Bank from '../../assets/images/bank.png';
import Education from '../../assets/images/edu.png';
import English from '../../assets/images/english.png';
import Enjiyo from '../../assets/images/enjiyo.png';
import General from '../../assets/images/genarel.png';
import Govt from '../../assets/images/govt.png';
import Math from '../../assets/images/math.png';
import Notice from '../../assets/images/notice.png';
import Potrika from '../../assets/images/potrika.png';
import Private from '../../assets/images/private.png';
import Question from '../../assets/images/qa.png';
import Result from '../../assets/images/result.png';

const JobDATA = [
  {id: '3', name: 'সরকারি', image: Govt},
  {id: '4', name: 'বেসরকারি', image: Private},
  {id: '5', name: 'শিক্ষক নিয়োগ', image: Education},
  {id: '6', name: 'ব্যাংক', image: Bank},
  {id: '7', name: 'এনজিও', image: Enjiyo},
  {id: '8', name: 'চাকরির পত্রিকা', image: Potrika},
];
const NoticeDATA = [
  {id: '1', name: 'নোটিশ', image: Notice},
  {id: '2', name: 'ফলাফল', image: Result},
  {id: '3', name: 'প্রশ্ন ও উত্তর', image: Question},
];

const jobPreparetion = [
  {id: '1', name: 'বাংলা', image: Bangla},
  {id: '2', name: 'ইংরেজি', image: English},
  {id: '3', name: 'গণিত', image: Math},
  {id: '4', name: 'সাধারণ জ্ঞান', image: General},
];

export {JobDATA, NoticeDATA, jobPreparetion};
