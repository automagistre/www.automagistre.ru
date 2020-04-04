class CalculatorSteps {
  constructor() {
  }

  get isValid() {
    return true;
  }

  set isValid(value) {
    throw new Error('Read only property "isValid". Can`t set value:' + value)
  }

  async highlightNode(node) {
    node.classList.add('input-error');
    await setTimeout(() => node.classList.remove('input-error'), 800);
  }

  showInvalidSelections() {}

}

export default CalculatorSteps;
