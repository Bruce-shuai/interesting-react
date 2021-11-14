import React, {useState, useContext, useEffect, useMemo} from 'react'
import { PlansContext } from './Index'
import PlanSpecificList from './PlanSpecificList';


export default function PlanEdit({plan}) {

  const [newPlan, setNewPlan] = useState(plan);
  const {handlePlanEdit, handlePlanSelect} = useContext(PlansContext);
  const changePlan = useMemo(() => {
    return {...plan}
  }, [plan?.id])
 
  // 用于每次plan变化，需要让edit页面有对应的内容
  useEffect(() => {
    setNewPlan(changePlan) 
  }, [changePlan])

  useEffect(() => {
    handlePlanEdit(newPlan) 
  }, [newPlan])

  return (
    <div className="plan-edit"> 
      <div className="plan-edit__remove-edit-btn-container">
        <button className="btn btn--remove"
          onClick={() => {handlePlanSelect(undefined)}}
        >&times;</button>
      </div>
      
      <div className="plan-edit__details-grid">
        <label htmlFor="title" className="plan-edit__label">计划</label>
        <input id="title" className="plan-edit__value" placeholder="写下今天的计划吧~" value={newPlan.title} 
        onChange={(e) => { 
            setNewPlan((prevPlan) =>  ({...prevPlan, title: e.target.value}))
        }}/>
        <label htmlFor="startTime" className="plan-edit__label">开始时间</label>
        <input id="startTime" type="time" className="plan-edit__value" value={newPlan.startTime} 
          onChange={(e) => { 
            setNewPlan((prevPlan) => ({...prevPlan, startTime: e.target.value}))
          }}/>
        <label htmlFor="endTime" className="plan-edit__label">结束时间</label>
        <input id="endTime" type="time" className="plan-edit__value" value={newPlan.endTime} 
          onChange={(e) => { 
            setNewPlan((prevPlan) => ({...prevPlan, endTime: e.target.value}))
        }}/>
        <label htmlFor="instructions" className="plan-edit__label">备忘录</label>
        <textarea id="instructions" className="plan-edit__value plan-edit__value--special" value={newPlan.instructions} 
          onChange={(e) => { 
            setNewPlan((prevPlan) => ({...prevPlan, instructions: e.target.value}))
          }}/>
      </div>
      <br />
      <div htmlFor="specificItems" className="specific-items">
        <div className="plan-edit__specific-items-title">
          计划细节
        </div>
        {plan && <PlanSpecificList plan={plan} setNewPlan={setNewPlan}/>}
      </div>
    </div>
  )
}
