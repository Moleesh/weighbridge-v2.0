import React, { Component } from "react";

import PageNotFound from '../assets/images/pageNotFound.png';


class NotFound extends Component {

  render() {
    return (
      <div className="pageNotFound">
        <img src={PageNotFound} alt='' />
      </div>
    );
  }
}



export default NotFound;
