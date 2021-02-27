import React, {Component} from 'react';
import {ErrorIndicator} from '../server-indicators';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorInfo: ''
  }

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true, errorInfo})
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator error={this.state.errorInfo} />
    }

    return  this.props.children
  }
}

export default ErrorBoundary
