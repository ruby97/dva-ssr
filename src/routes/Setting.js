import React, {Component} from 'react'
import {connect} from "dva";

class Setting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Setting</div>
    );
  }
}

Setting.propTypes = {};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Setting);

