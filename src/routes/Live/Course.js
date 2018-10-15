import React from 'react'
import {connect} from "dva";
import CSSModules from 'react-css-modules';
import styles from './Course.less';

function Course() {
  return (
    <div>
      <h3>Course</h3>
      <p className={styles.course}> Live Course</p>
    </div>
  )
}

Course.propTypes = {};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CSSModules(Course, styles));
