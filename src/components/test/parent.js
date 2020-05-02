import React from "react";
import Child from './child'
class Parent extends React.Component {

    state = { language: '' }
   
    handleLanguage = (langValue) => {
        console.log(langValue)
        this.setState({language: langValue});
    }

    render() {
         return (
                <div className="col-sm-9">
                    <Child onSelectLanguage={this.handleLanguage} /> 
                </div>
        )
     }
}

export default Parent