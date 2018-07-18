import React, { Component } from 'react'
import './loading.css'
class Loading extends Component {
    render(){
        return (
            <div className="loading">
                <img src={require('@/assets/img/car.gif')} alt=""/>
            </div>
        )
    }
}
export default Loading