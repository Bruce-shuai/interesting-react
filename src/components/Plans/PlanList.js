import React, {useContext} from 'react';
import Plan from './Plan';
import { PlansContext } from './Index';
import {Link} from 'react-router-dom';
export default function PlanList({plans}) {

  const { handlePlanAdd } = useContext(PlansContext);
  return (
    <div className="plan-list">
      <div className="cancel tl-1">
        <button className="btn btn--remove"><Link to="/">&times;</Link></button>
      </div>
      <div className="plan-list__title">
        计划列表
      </div>
      <div>
        {
          plans.map((plan) => {
            return <Plan key={plan.id} {...plan}/> // 这里是用的 {...plan} 解构哦~
          })
        }
      </div>
      <div className="plan-list__add-plan-btn-container">   {/* 这种命名才霸道嘛~ */}
        <button 
          className="btn btn--add"
          onClick={() => handlePlanAdd()}
        >增添新的计划</button>
      </div>
    </div>
  )
}
