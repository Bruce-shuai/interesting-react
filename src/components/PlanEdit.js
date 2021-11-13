import React, {useState, useContext, useEffect} from 'react'
import { PlansContext } from './App'
export default function PlanEdit({plan}) {
  // const {
  //   title,
  //   startTime,
  //   endTime,
  //   instructions,
  //   specificItems
  // } = props;

  const [newPlan, setNewPlan] = useState(plan);
  const {handlePlanEdit} = useContext(PlansContext);

  useEffect(() => {
    handlePlanEdit(newPlan) 
  }, [newPlan])

  return (
    <div className="plan-edit"> 
      <div className="plan-edit__remove-edit-btn-container">
        <button className="btn btn--remove">&times;</button>
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
        <div className="plan-edit__specific-item">
          <input className="plan-edit__value plan-edit__specific-item-input" placeholder="添加亿点细节~"/>
          <button className="btn btn--remove-red">&times;</button>
        </div>
        <div className="plan-edit__specific-item">
          <input className="plan-edit__value plan-edit__specific-item-input" placeholder="添加亿点细节~"/>
          <button className="btn btn--remove-red">&times;</button>
        </div>
        <div className="plan-edit__add-item-btn-container">
          <button className="btn btn--add">添加新细节</button>
        </div>
      </div>
    </div>
  )
}
