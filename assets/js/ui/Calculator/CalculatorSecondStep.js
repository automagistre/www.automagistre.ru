import Dinero from 'dinero.js/src/dinero';
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

  get recommendationsPrice() {
    return this._calculateTotalsPrices('recommendation');
  }

  get totalPrice() {
    return this.worksPrice.add(this.recommendationsPrice);
  }

  get works() {
    return this._works;
  }

  addWork(work) {
    this._works.push(work);
  }

  _renderItems() {
    const { worksNode } = this;
    const { recommendationsNode } = this;
    const { works } = this.equipment;
    const onChange = () => {
      this._renderTotalPrices();
      this.onChange();
    };

    if (works.length) {
      const sortedWorks = works.sort((w1, w2) => +w1.position - +w2.position);
      for (const work of sortedWorks) {
        if (this.range % work.repeat === 0) {
          const isSelect = work.type === 'work';
          const workEntity = new Work(work);
          workEntity.onChange = onChange;

          const parent = workEntity.type === 'work' ? worksNode : recommendationsNode;
          const workNode = workEntity.render();

          this.addWork(workEntity);
          parent.append(workNode);

          if (work.parts.length) {
            const partsNode = document.createElement('ul');
            partsNode.className = 'cg-price__list';

            const parts = work.parts.map((part) => {
              const partEntity = new Part(part, workEntity);
              partEntity.onChange = onChange;
              return partEntity;
            }).sort((p1, p2) => p2.totalPrice.subtract(p1.totalPrice).getAmount());

            for (const part of parts) {
              const partNode = part.render();
              workEntity.addPart(part);
              partsNode.append(partNode);
            }
            workNode.append(partsNode);
          }
          workEntity.isSelected = isSelect;
        }
      }
    }
    this._renderTotalPrices();
  }

  _calculateTotalsPrices(type) {
    let total = Dinero({ amount: 0 });
    for (const work of this._works.filter((work) => work.type === type)) {
      total = total.add(work.totalPrice).add(work.parts.reduce((acc, part) => acc.add(part.totalPrice), Dinero({ amount: 0 })));
    }
    return total;
  }

  _renderTotalPrices() {
    const worksNode = this.worksTotalNode;
    const recommendationsNode = this.totalNode;
    worksNode.innerHTML = `${this.worksPrice.toFormat()}<i class="icon-rub">a</i></div>`;
    recommendationsNode.innerHTML = `${this.totalPrice.toFormat()}<i class="icon-rub">a</i></div>`;
  }

  render(equipment, range) {
    this.equipment = equipment;
    this.range = range;
    this._renderItems();
  }

  clear() {
    const { worksNode } = this;
    const { recommendationsNode } = this;
    while (worksNode.firstChild) {
      worksNode.removeChild(worksNode.firstChild);
    }
    while (recommendationsNode.firstChild) {
      recommendationsNode.removeChild(recommendationsNode.firstChild);
    }
    this.equipment = undefined;
    this._works = [];
    this._renderTotalPrices();
  }

  showInvalidSelections() {
    const worksNode = this._node.querySelector('.js-costing_works_unit');
    if (this.totalPrice === 0) {
      this.highlightNode(worksNode).then(() => {});
    }
  }
}

export default CalculatorSecondStep;
