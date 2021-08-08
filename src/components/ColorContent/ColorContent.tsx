import React from 'react'
import ColorBox from "../ColorBox/ColorBox"
import './styles.scss';

interface IColorContent {
  colorList: Array<string>
}

const ColorContent = (props: IColorContent) => {
  return (
    <div className="content" >
      {
        props.colorList.map((color: string) => <ColorBox key={color} color={color} isDelete={false} />)
      }
    </div>
  )
}

export default ColorContent
