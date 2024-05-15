import React from "react";
function SelectLimit(props){
    return (
        <select onChange={(e)=>props.onLimitChange(e.target.value)}className="form-select" aria-label="Default select example">
            <option value="6">6</option>
            <option value="12">12</option>
         
        </select>
    )
}
export default SelectLimit;