import React, { useState } from 'react';
import './App.scss';
import ColorContent from './components/ColorContent/ColorContent';
import { colorListDefault } from './constant/colorListDefault';
import { colorRegex } from './constant/colorRegex';

interface errorType {
  errorFunction: (value: string) => boolean;
  errorMessage: string;
}

const validatorList: Array<errorType> = [
  {
    errorFunction: (value) => value.length > 7,
    errorMessage: 'Too many characters'
  },
  {
    errorFunction: (value) => !colorRegex.test(value),
    errorMessage: 'Invalid hex color'
  }
]

const validatorChecking = (value: string) => {
  for (let i = 0; i < validatorList.length; i++) {
    if (validatorList[i].errorFunction(value)) {
      return validatorList[i].errorMessage
    }
  }
  return ''
}

const getLocalStorage = () => {
  let local = localStorage.getItem('colorList')
  return local ? JSON.parse(local) : colorListDefault
}

const App = () => {
  const [colorList, setColorList] = useState<Array<string>>(getLocalStorage());
  const [errorInput, setErrorInput] = useState<string>('')



  const addColor = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      color: { value: string };
    };

    let errorMessage: string = validatorChecking(target.color.value)

    if (errorMessage) {
      setErrorInput(errorMessage);
    } else {
      setColorList([...colorList, target.color.value])
      localStorage.setItem('colorList', JSON.stringify([...colorList, target.color.value]))
      setErrorInput('');
    }

  }



  return (
    <div>
      <div>
        <form onSubmit={addColor}>
          <label >Add new color :</label>
          <div className="input-wrapper" >
            <input name="color" />

            {<small className="text-error" >{errorInput}</small>}
          </div>

          <button>
            Add
          </button>
        </form>
      </div>
      <ColorContent colorList={colorList} />
    </div>
  );
}

export default App;
