//import { borderBottom } from "@material-ui/system";
import { blue } from "@material-ui/core/colors";

export default {
  toolBar:{
    buttonC: {
      "border-radius": "10%",
      "padding":"5px"
    },
  },
  palette: {
    primary: {
      light: "#6573c3",
      main: "#2c387e",
      dark: "#3f51b5",
      contrastText: "#fff"
    },
    secondary: {
     /* light: "#637bfe",
      main: "#2a3eb1",
      dark: "#3d5afe",
      contrastText: "#fff" */
      light: "#ff4569",
      main: "#b2102f",
      dark: "#ff1744",
      contrastText: "#fff"

    }
  },
  spreadThis: {
    buttonC: {
      "border-radius": "10%",
      "padding":"5px"
    },
    typography: {
      userNextVariants: true
    },
    form: {
      textAlign: "center"
    },
    image: {
      margin: "20px auto 20px auto"
    },
    pageTitle: {
      margin: "10px auto 10px auto"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      marginTop: "5px",
      position: "relative"
    },
    customErrors: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10"
    },
    progress: {
      position: "absolute"
    },
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    visibleSeparator:{
      width: '100%',
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    },
    card:{
      display:'flex',
      marginBottom: 20,
  },
  cardContent:{
      width:"100%",
      flexDirection: 'column',
      padding : 25
  },
  cover:{
      minWidth: 200,
      objectFit: 'cover'
  },
  handle:{
      width:60,
      height: 18,
      backgroundColor: "#2c387e",
      marginBottom: 7
  },
  date:{
      height:14,
      width: 100,
      backgroundColor: 'rgba(0,0,0,0.3)',
      marginBottom: 10
  },
  fullLine:{
      height: 15,
      width: '90%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      marginBottom: 10
  },
  halfLine:{
      height: 15,
      width: '50%',
      backgroundColor: 'rgba(0,0,0,0.4)',
      marginBottom: 10
  },
  gridMargin:{
    "margin-left":"150px"
  },

  root: {
    maxWidth: 700,
    //margin: "auto",
    "margin-bottom" : "30px"
  },
  media: {
    height: 0,
    margin: "auto",
    //width:'500px',
    //margin:"10%",
    paddingTop: "30%"
  },
  avatar: {
    //color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: blue[500]
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  },
  
  },
  profile: {
    paper: {
      padding: 20
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%"
        }
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%"
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle"
        },
        "& a": {
          color: "#00bcd4"
        }
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0"
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer"
        }
      }
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px"
      }
    }
  }
};
