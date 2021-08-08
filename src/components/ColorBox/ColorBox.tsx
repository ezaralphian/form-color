import React from 'react'
import './styles.scss';

interface IcolorBox {
  color: string, isDelete: boolean
}

const ColorBox = (props: IcolorBox) => {


  return (<div className="box-wrapper" >
    <div className="color-box" style={{ backgroundColor: props.color }} >

    </div>
    <label >{props.color}</label>
  </div>)
}

export default ColorBox