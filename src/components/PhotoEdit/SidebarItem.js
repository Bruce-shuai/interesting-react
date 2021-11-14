import React from 'react'

export default function SidebarItem({option, index, handleSelected}) {
  return (
    <div className="photo-edit-item">
      <button 
        className="photo-edit-item-btn"
        onClick={() => {
          handleSelected(index)
        }}
      >
        {option.name}
      </button>
    </div>
  )
}
