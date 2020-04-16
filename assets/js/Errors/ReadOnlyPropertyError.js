import CustomError from './CustomError';

class ReadOnlyPropertyError extends CustomError {
  /**
   * Custom Error for protect readonly properties
   * @param {String} property
   * @param {*} value
   */
  constructor(property, value) {
    let message = `Cant set readonly property ${property} value: ${value.toString()}`;
    super(message);
    this.message = message;
  }
}

export default ReadOnlyPropertyError;
