import '../css/app.css';   // 导入css模块  不再使用CSS-in-JS了 使用BEM命名方式
import PlanList from './PlanList';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const PlansContext = React.createContext();

function App() {

  const [plans, setPlans] = useState(SAMPLE_PLANS);
  // console.log('plans', plans);

  // 将数据存入 localStorage 防止页面刷新的时候，数据凉凉(一个关键点，存放在localStorage里的数据应该是JSON字符串类型)
  // 但好像JSON字符串不能存放函数...这可能会是一个问题！
  /**
   * 将plans的数据存放在localStorage里的key值
   */
  const PLANS__DATA__KEY = 'plans-data-key';   
  useEffect(() => {
    // 如果没有locaStorage里没有plans的value值，一切无事发生，如果有，则需要从localstorage里获取到最新值
    localStorage.getItem(PLANS__DATA__KEY) && setPlans(JSON.parse(localStorage.getItem(PLANS__DATA__KEY)))
  }, [])

  useEffect(() => {
    // 让localStorage里实时能够获取到plan的最新值
    const JSON_PALNS_VALUE = JSON.stringify(plans)
    localStorage.setItem(PLANS__DATA__KEY, JSON_PALNS_VALUE)
  }, [plans])
  // 日常增删改查数据...

  /**
   * 增
   * 增添计划
   */
  function handlePlanAdd() {
    const newPlan = {
      id: uuidv4(),
      title: '测试',
      startTime: '00:00',
      endTime: '00:01',
      instructions:'依旧测试',
      specificItems: []
    }
    setPlans([...plans, newPlan])
  }

  const plansContextValue = {
    handlePlanAdd,
  }
  return (
    <PlansContext.Provider value={plansContextValue}>
      <PlanList plans={plans}/>
    </PlansContext.Provider>
  );
}


const SAMPLE_PLANS = [
  {
    id: uuidv4(),
    title: '今天准备写一篇博客',
    startTime: '12:00',
    endTime: '14:00',
    // \n是换行的意思
    instructions: '1.今天的博客是关于react方面的\n2.尽量把文章写得简单易理解',
    specificItems: [
      {
        id: uuidv4(),
        describe: '重点：React hooks常出现的错误',
      }, 
      {
        id: uuidv4(),
        describe: '举一些具体的代码示例'
      }
    ]
  },
  {
    id: uuidv4(),
    title: '记得把最新一集的《斗破苍穹》看完',
    startTime: '14:30',
    endTime: '14:50',
    instructions: '1.记得看完后，给阿七打一个电话哦!\n2.好好生活呀~',
    specificItems: [
      {
        id: uuidv4(),
        describe: '尽量用校园网~'
      }
    ]
  },
  {
    id: uuidv4(),
    title: '今天晚上要跑五公里哦',
    startTime: '21:00',
    endTime: '22:00',
    instructions: 
    '1.记得跑前也喝口水\n2.跑完多喝点水然后痛痛快快的洗个热水澡',
    specificItems: []
  }
]

export default App;
