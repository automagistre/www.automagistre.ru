import React, {Component} from 'react';
import {ErrorIndicator} from '../server-indicators';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }

    return  this.props.children
  }
}

export default ErrorBoundary
