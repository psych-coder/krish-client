import React, { Component } from "react";

class AdSense extends Component {


    componentDidMount = () => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }


    render() {


        return (
            <div className='ad'>
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-3937016446555715"
                    data-ad-slot="8962552382"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        );
    }
}

export default AdSense;