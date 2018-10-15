import React from 'react'
import {connect} from "dva";

function Home () {
  return (
    <div>
      <h3>Live</h3>
      <p> Live Home</p>
    </div>
  )
}

Home.propTypes = {
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Home);
