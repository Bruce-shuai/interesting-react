import React, { useState, useEffect } from 'react'
import SidebarItem from './SidebarItem';
import Slider from './Slider';
import defaultPhoto from '../../img/avatar.jpg';
// import anotherPhoto from '/static/media/avatar.c29a324f.jpg';
export default function PhotoEdit() {

  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  // const [photo, setPhoto] = useState(defaultPhoto);
  const [sidebarIndex, SetSidebarIndex] = useState(0);
  const checkedOption = options[sidebarIndex];     // 这里的用法比较有意思...


  /**
   * 将Photo Edit的数据存放在localStorage里的key值里去
   */
  const PHOTO__EDIT__DATA__KEY = 'photo-edit-data-key';
  useEffect(() => {
    localStorage.getItem(PHOTO__EDIT__DATA__KEY) && setOptions(JSON.parse(localStorage.getItem(PHOTO__EDIT__DATA__KEY)))
  }, [])
   
  useEffect(() => {
    const PHOTO__EDIT__DATA__VALUE = JSON.stringify(options)
    localStorage.setItem(PHOTO__EDIT__DATA__KEY,PHOTO__EDIT__DATA__VALUE)
  }, [options])
   

  // console.log('photo', photo);
  // 又是增删改查方法
  /**
   * 改
   * 改滑动器范围
   */
  function handleRangeChange(property, value) {
    // checkedOption.value = value;
    // const newOptions = options;
    // newOptions[]
    setOptions(prevOptions => prevOptions.map((option) => {
      if (option.property === property) {
        option.value = value;
      }
      return option;
    })
    )
  }

  /**
   * 查
   * 查找被选中的按钮
   */
  function handleSelected(index) {
    SetSidebarIndex(index);
  }

  /**
   * 利用filter起到模拟ps的效果
   */
  function handlePhotoStyle() {
    const filter = options.map(option => `${option.property}(${option.value}${option.unit}) `).join('');
    return {
      backgroundImage: `url(${defaultPhoto})`,
      // backgroundImage: import(photo),
      filter: filter,
    }
  }

  // 获取本地图片的功能目前还无法实现 

  // import('../../img/avatar.jpg').then(({default:file}) => {
  //   console.log('file', file);
  //   setPhoto(file);
  // })

  /**
   * 上传图片文件
   */
  // function handleFileUpload(photoUrl) {
  //   setPhoto(photoUrl);
  // }

  return (
    <div className="photo-edit-container-grid">
      <div className="photo-edit__title-container">
        <h1 className="photo-edit__title">Photo Edit</h1>
      </div>
      <div className="photo-edit__photo-container">
        <img className="photo-edit__photo" style={handlePhotoStyle()}/>
        {/* <div className="photo-edit__photo-choose">
          <label htmlFor="choose-photo" className="btn btn--primary">选择图片</label>
          <input id="choose-photo" className="photo-edit__photo-file" type="file" accept=".jpg, .jpeg, .png" 
            onChange={e => {
              handleFileUpload(e.target.value);
            }}
          />   
        </div> */}
      </div>
      <div className="photo-edit__side-bar">
        {
          options.map((option, index) => {
            return <SidebarItem key={option.name} option={option} index={index} handleSelected={handleSelected}/>
          })
        }
      </div>
      <div className="photo-edit__slider">
        <Slider option={checkedOption} handleRangeChange={handleRangeChange}/>
      </div>
    </div>
  )
}

const DEFAULT_OPTIONS = [
  {
    name: '亮度',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: '明暗对比度',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: '色饱和度',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: '灰度级',
    property: 'grayscale',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: "%"
  },
  {
    name: '老照片',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: "%"
  },
  {
    name: '色相旋转',
    property: 'hue-rotate',
    value:0,
    range: {
      min: 0,
      max: 360
    },
    unit: "deg"
  },
  {
    name: '模糊',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]