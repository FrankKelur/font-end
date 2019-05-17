import React, { Component } from 'react'
import { connect } from 'dva'
import styles from './index.less'
class Counter extends Component {

    async syncAdd () {
      this.props.dispatch({ type: 'count/add' })
      // await this.props.dispatch({ type: 'count/add' })
      console.log('sync add after');
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.current}>
                    {this.props.current}
                </div>
                <div className={styles.button}>
                    <button onClick={() => this.syncAdd()}>+</button>
                </div>
            </div>
        )
    }
}
export default connect(
    state => state.count
)(Counter)