import React from 'react'

export default function Slider({option, handleRangeChange}) {
  return (
    <div className="photo-edit-slider__container">
      <div className="photo-edit-slider__value">
        <div>{`${option.range.min}${option.unit}`}</div>
        <input type="range" className="photo-edit-slider__range" min={option.range.min} max={option.range.max} value={option.value} 
          onChange={(e) => {
            handleRangeChange(option.property, e.target.value)
          }}
        />
        <div>{`${option.range.max}${option.unit}`}</div>
      </div>
      <div>当前值：{`${option.value}${option.unit}`}</div>
    </div>
  )
}
