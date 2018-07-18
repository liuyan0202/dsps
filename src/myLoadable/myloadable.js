import React, { Component } from 'react'
import Loading from '@/components/loading'
class Dynamic extends Component {
    constructor(){
        super()
        this.state={
            Comp:null
        }
    }
    render(){
        let { Comp } = this.state
        if(!this.state.Comp){
            return <Loading />
        } else {
            return <Comp />
        }
    }
    componentDidMount(){
        import(`@/pages/${this.props.path}/${this.props.path}`).then(comp=>{
            this.setState({
                Comp:comp.default
            })
        })
    }
}

function MyLoadable(path){
    return class extends Component{
        render(){
            return <Dynamic path={path}/>
        }
    }
}
export default MyLoadable