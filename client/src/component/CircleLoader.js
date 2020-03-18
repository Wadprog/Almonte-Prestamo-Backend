import React , {Component} from "react"
import "./CircleLoader.css"

class CircleLoader extends Component{

    static defaultProps={
        completed: 3,
        toComplete:5
    }
    
    render(){

        var percentage= this.props.completed!==0?this.props.completed/this.props.toComplete*100:0;
        var completionLevel=0; 
        if(percentage>24&& percentage<49)
        completionLevel=25;
        else if(percentage>49 && percentage<74) 
        completionLevel=50;
        else if(percentage>74 && percentage<99) 
        completionLevel=75;
        else if(percentage=>100) 
        completionLevel=100;
        else 
        completionLevel=0;
        console.log("percentage" + percentage + " level "+ completionLevel)


        return(
         <div className={`circle-loader border-${completionLevel}`}>
            <h4> {`${percentage} %`} </h4> 
        </div>
        );  
    }
}
export default CircleLoader;