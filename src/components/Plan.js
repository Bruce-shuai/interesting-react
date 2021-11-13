import React, {useContext} from 'react'
import { PlansContext } from './App.js'

export default function Plan(props) {
  const {
    id,
    title,
    startTime,
    endTime,
    instructions,
    specificItems
  } = props;

  const { handlePlanDelete, handlePlanSelect } = useContext(PlansContext);
  return (
    <div className="plan">
      <div className="plan__header">
        <div className="plan__title">
          {title}
        </div>
        {/* 注意，不是每一个div标签后面都需要 className */}
        <div>
          <button 
            className="btn btn--primary mr-1"
            onClick={() => handlePlanSelect(id)}
          >编辑</button>
          <button 
            className="btn btn--danger"
            onClick={() => handlePlanDelete(id)}
          >删除</button>
        </div>
      </div>
      <div className="plan__row">   {/* 这种row的格式非常不错！*/}
        <span className="plan__label">开始时间：</span>
        <span className="plan__value">{startTime}</span>
      </div>
      <div className="plan__row">   
        <span className="plan__label">结束时间：</span>
        <span className="plan__value">{endTime}</span>
      </div>
      <div className="plan__row">   
        <span className="plan__label plan__label--special">备忘录：</span>
        <div className="plan__value plan__value--special">{instructions}</div>
      </div>
      <div className="plan__row">   
        <span className="plan__label plan__label--special">计划细节</span>
        <div className="plan__value plan__value--special">{specificItems.map((item, index) => {
          return <div key={item.id}>△{item.describe}</div>
        })}</div>
      </div>
    </div>
  )
}
