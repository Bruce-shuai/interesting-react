import React from 'react'

export default function PlanSpecificItem({specificItem, handleItemDelete, handleItemChange}) {

  return (
    <div>
      <div className="plan-specific-item">
        <input className="plan-specific__value" placeholder="添加亿点细节~" 
          value={specificItem.describe}
          onChange={(e) => {
            const newSpecificItem = {...specificItem, describe: e.target.value}
            handleItemChange(specificItem.id, newSpecificItem)
          }}
        />
        <button 
          className="btn btn--remove-red"
          onClick={() => {handleItemDelete(specificItem.id)}}
        >&times;</button>
      </div>
    </div>
  )
}
