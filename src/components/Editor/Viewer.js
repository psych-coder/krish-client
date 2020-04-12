import renderHTML from 'react-render-html';
import React from 'react';
class Viewer extends React.Component {
    
    render() {
        //const renderHTML = require('react-render-html');

      return (
        <div>
          renderHTML('<li>hello</li><li>world</li>');

        </div>
      );
    }
  }
  export default Viewer;