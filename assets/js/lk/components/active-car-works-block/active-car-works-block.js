import React, {Component} from 'react';

import {withGarageData} from '../hoc';
import {connect} from 'react-redux';
import {compose, bindActionCreators} from 'redux';
import {fetchActiveCarWorks} from '../../actions';
import Works from './Works';

class ActiveCarWorksBlock extends Component {

  componentDidUpdate(prevProps) {
    const {fetchWorks, activeCarId} = this.props
    if (activeCarId !== prevProps.activeCarId) {
      fetchWorks(activeCarId)
    }
  }

  render() {
    const {activeCarId, works} = this.props

    if (!activeCarId || !works.length) {
      return <div/>
    }

    return (
        <section className="garage__block garage__works">
          <h2 className="garage__title">История ремонта и обслуживания</h2>
          <Works works={works}/>
        </section>
    )
  }
}

const mapStateToProps = ({activeCarId, activeCarWorks: {works}}) => {
  return {
    activeCarId,
    works
  }
}

const mapDispatchToProps = (dispatch, {garageData}) => {
  return bindActionCreators({
    fetchWorks: fetchActiveCarWorks(garageData)
  }, dispatch)
}

export default compose(
    withGarageData(),
    connect(mapStateToProps, mapDispatchToProps)
)(ActiveCarWorksBlock);
