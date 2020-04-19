import React from "react";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatUnderlined from "@material-ui/icons/FormatUnderlined";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import FormatItalic from "@material-ui/icons/FormatItalic";


const inlineStyles = [
    {
        label:"bold",
        style:"BOLD",
        icon: <FormatBold/>,
    },
    {
        label:"italic",
        style:"ITALIC",
        icon: <FormatItalic/>,
    },
    {
        label:"underline",
        style:"UNDERLINE",
        icon: <FormatUnderlined/>,
    },
    
]

export {inlineStyles}