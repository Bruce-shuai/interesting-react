import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import PlanSpecificItem from './PlanSpecificItem';
export default function PlanSpecificList({plan, setNewPlan}) {
  const {specificItems} = plan;
  function handleSpecificItemAdd() {
    const newItem = {
      id: uuidv4(),
      describe: ''
    }
    const newSpecificList = [...specificItems, newItem];
    setNewPlan((prevPlan) => ({...prevPlan, specificItems: newSpecificList}))
  }

  function handleSpecificItemDelete(id) {
    const newSpecificList = specificItems.filter(item => {
      return item.id !== id;
    });
    setNewPlan((prevPlan) => ({...prevPlan, specificItems: newSpecificList}))
  }

  function handleSpecificItemChange(id, SpecificItem) {
    const index = specificItems.findIndex(item => item.id === id);
    const newSpecificList = [...specificItems];
    newSpecificList[index] = SpecificItem;
    setNewPlan((prevPlan) => ({...prevPlan, specificItems: newSpecificList}))
  }
  return (
    <div>
      {
        specificItems.map((specificItem) => (
          <PlanSpecificItem 
            specificItem={specificItem} 
            handleItemDelete={handleSpecificItemDelete} 
            handleItemChange={handleSpecificItemChange}
            key={specificItem.id}
          />
        ))
      }
      <div className="plan-specific__add-item-btn-container">
        <button 
          className="btn btn--add"
          onClick={() => {handleSpecificItemAdd()}}
        >添加新细节</button>
      </div>
    </div>
  )
}
