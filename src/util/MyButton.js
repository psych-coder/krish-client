import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";


export default ({children, onClick, tip, btnClassName, tipClassName, size,color,id}) => (
    <Tooltip title={tip} className={tipClassName} placement="top" >
        <IconButton onClick={onClick} className={btnClassName} size={size} color={color} id={id}>
            {children}
        </IconButton>
    </Tooltip> 
    
);