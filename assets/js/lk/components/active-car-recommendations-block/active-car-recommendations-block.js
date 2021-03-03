import React, {Component} from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {withGarageData} from '../hoc';
import {fetchActiveCarRecommendations} from '../../actions';
import Recommendations from './recommendations';

class ActiveCarRecommendationsBlock extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.carId !== this.props.carId) {
      this.props.fetchRecommendations(this.props.carId)
    }
  }

  render() {
    return <section className="garage__block garage__contact">
      <h2 className="garage__title">Рекомендации по автомобилю</h2>
      <Recommendations recommendations={this.props.recommendations}/>
    </section>
  }
}

const mapStateToProps = ({activeCarId: carId,
                          activeCarRecommendations: {
                            loading,
                            error,
                            recommendations }}) => {
  return {
    carId,
    loading,
    error,
    recommendations}
}

const mapDispatchToProps = (dispatch, {garageData}) => {
  return bindActionCreators({
    fetchRecommendations: fetchActiveCarRecommendations(garageData)
  }, dispatch)
}

export default compose(
    withGarageData(),
    connect(mapStateToProps, mapDispatchToProps)
)(ActiveCarRecommendationsBlock)
