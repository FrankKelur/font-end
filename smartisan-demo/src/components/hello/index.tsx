import * as React from 'react';

const style = require('./hello.css');
const imgX = require('../../assets/img/x.png');

export interface Props {
    name: string;
    enthusiasmLevel: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

export default class Hello extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {name, enthusiasmLevel = 1, onIncrement, onDecrement} = this.props;
        if (enthusiasmLevel <= 0) {
            throw new Error('enthusiasm 必须大于0')
        }
        return (
            <div className={style.hello}>
                <img src={imgX} alt="imgX" className={style.img}/>
                <div>
                    <button onClick={onDecrement}>-</button>
                    <button onClick={onIncrement}>+</button>
                </div>
                <div className={style.greeting}>
                    Hello {name + getExclamationMarks(enthusiasmLevel)}
                </div>
            </div>
        )
    }
}

function getExclamationMarks(numChars: number) {
    return new Array(numChars).join('!')
}