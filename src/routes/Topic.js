import React from 'react'
import {connect} from "dva";

function Topic () {
    return (
        <div>
          <h3>Topic</h3>
           <p> React Server Side Rendering Demo (Support DVA)</p>
        </div>
    )
}

Topic.propTypes = {
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Topic);
