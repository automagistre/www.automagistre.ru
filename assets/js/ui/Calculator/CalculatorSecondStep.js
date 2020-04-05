import Work from './Work';
import Part from './Part';
import CalculatorSteps from './CalculatorSteps';

class CalculatorSecondStep extends CalculatorSteps {
  _works = [];
  range = undefined;

  constructor(node, equipment) {
    super(node);
    this.equipment = equipment;
    this.worksNode = node.querySelector('#costing-step_02_works');
    this.recommendationsNode = node.querySelector('#costing-step_02_recommendations');
    this.worksTotalNode = node.querySelector('#costing-step_02_works_total');
    this.totalNode = node.querySelector('#costing-step_02_total');
  }

  get isValid() {
    return Boolean(this.totalPrice);
  }

  get worksPrice() {
    return this._calculateTotalsPrices('work');
  }

  set worksPrice(value) {
    throw new Error('Read only property "worksPrice". Can`t set value:' + value)
  }

  get recommendationsPrice() {
    return this._calculateTotalsPrices('recommendation');
  }

  set recommendationsPrice(value) {
    throw new Error('Read only property "recommendationsPrice". Can`t set value:' + value)
  }

  get totalPrice() {
    return this.worksPrice + this.recommendationsPrice;
  }

  set totalPrice(value) {
    throw new Error('Read only property "totalPrice". Can`t set value:' + value)
  }


  get selectedWorks() {

  }

  set selectedWorks(value) {
    throw new Error('Can not set value read only property "selectedWorks":' + value)
  }

  addWork(work) {
    this._works.push(work);
  }

  _renderItems() {
    const worksNode = this.worksNode,
          recommendationsNode = this.recommendationsNode,
          works = this.equipment.works;
    const onChange = () => {
      this._renderTotalPrices();
      this.onChange()
    };

    if (works) {
      for (let [workID, work] of Object.entries(works)) {
        if (this.range % work.repeat === 0){
          const isSelect = work.type === 'work',
                workEntity = new Work(workID, work);
                workEntity.onChange = onChange;

          const parent = workEntity.type === 'work' ? worksNode : recommendationsNode,
                workNode = workEntity.render();

          this.addWork(workEntity);
          parent.append(workNode);

          if (work.parts) {
            const partsNode =  document.createElement('ul');
            partsNode.className = 'cg-price__list';

            for (let [partID, part] of Object.entries(work.parts)){
              const partEntity = new Part(partID, part);
              partEntity.onChange = onChange;

              const partNode = partEntity.render();
              workEntity.addPart(partEntity);
              partsNode.append(partNode);
            }
            workEntity.isSelected = isSelect;
            workNode.append(partsNode);
          }
        }
      }
    }
    this._renderTotalPrices();
  }

  _calculateTotalsPrices(type) {
    let total = 0;
    for (let work of this._works.filter( work => work.type === type)) {
      total += work.totalPrice;
      total += work.parts.reduce((acc, part) => acc + part.totalPrice, 0)
    }
    return total;
  }

  _renderTotalPrices() {
    const worksNode = this.worksTotalNode,
          recommendationsNode = this.totalNode;
    worksNode.innerHTML =
        `${this.worksPrice}<i class="icon-rub">a</i></div>`;
    recommendationsNode.innerHTML =
        `${this.totalPrice}<i class="icon-rub">a</i></div>`;
  }

  render (equipment, range) {
    this.equipment = equipment;
    this.range = range;
    this._renderItems()
  }

  clear () {
    const worksNode = this.worksNode,
          recommendationsNode = this.recommendationsNode;
    while (worksNode.firstChild) {
      worksNode.removeChild(worksNode.firstChild)
    }
    while (recommendationsNode.firstChild) {
      recommendationsNode.removeChild(recommendationsNode.firstChild)
    }
    this.equipment = undefined;
    this._works = [];
    this._renderTotalPrices();
  }

  showInvalidSelections(){
    const worksNode = this._node.querySelector('.costing__col-half').firstElementChild;
    console.log(worksNode);
    if (this.totalPrice === 0) {
      this.highlightNode(worksNode).then(() => {});
    }
  }

}

export default CalculatorSecondStep;
