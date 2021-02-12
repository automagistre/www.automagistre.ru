import React, { Component } from 'react';

const WithData = (View) => {
  return class extends Component {

    state = {
      data: {},
      loading: false,
      error: false
    };

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    componentDidMount() {
      this.update();
    }

    update() {
      this.setState( {
        loading: false,
        error: false
      });

      setTimeout(()=>{
        const data  = this.props.getData()
        this.setState({data})
      }, 1000)

      // .then((data) => {
      //   this.setState({
      //     data,
      //     loading: false
      //   });
      // })
      // .catch(() => {
      //   this.setState({
      //     error: true,
      //     loading: false
      //   });
      // });
    }


    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <div>Загрузка</div>;
      }

      if (error) {
        return <div>Ошибка</div>;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

export default WithData;
