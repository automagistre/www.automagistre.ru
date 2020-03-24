
class CalculatorSecondStep {
  constructor($el) {
    this.$stepBlock = $el;
    this.equipment = {};
    this.range = undefined;
  }

  renderItems() {
    const $worksBlock = this.$stepBlock.querySelector('#costing-step_02_works'),
          $recommendationsBlock = this.$stepBlock.querySelector('#costing-step_02_recommendations'),
          equipment = {...this.equipment};

    const renderItem = ($parent, id, item, isRecommendation = undefined, parentID= undefined,) => {
      const itemWrapper = document.createElement('li');
      const totalPrice = item.count ? +item.count * +item.price : +item.price;
      itemWrapper.className = 'cg-price__item';
      itemWrapper.innerHTML = ` <div class="cg-price__line">
                                    <label class="cg-price__check">
                                      <span>${item.name}</span>
                                    </label>
                                    <div class="cg-price__cost">
                                        ${+item.count > 1 ? item.count + (item.unit || 'шт') + ' - ' : ''}${totalPrice}
                                        <i class="icon-rub">a</i></div>
                                    <div class="cg-price__info">
                                        <span>${item.note || ''}</span>
                                    </div>
                                </div>`;
      const itemInput = document.createElement('input');
      itemInput.type = 'checkbox';
      itemInput.value = id;
      if (parentID) {
        itemInput.dataset.parent = parentID;
      }

      itemWrapper.querySelector('.cg-price__check').prepend(itemInput);
      itemInput.checked = !isRecommendation;

      if (!item.note) {
        itemWrapper.querySelector('.cg-price__info').style.visibility = 'hidden'
      }

      $parent.append(itemWrapper);
      itemInput.addEventListener('click', e => this._toggleItem(e));
      return itemWrapper;
    };


    if (equipment.works) {
      for (let [workID, work] of Object.entries(equipment.works)) {
        if (this.range % work.repeat === 0){
          const $parent = work.recommendation ? $recommendationsBlock : $worksBlock;
          const $workBlock = renderItem($parent, workID, work, work.recommendation);
          if (work.parts) {
            const $partsBlock =  document.createElement('ul');
            $partsBlock.className = 'cg-price__list';
            for (let [partID, part] of Object.entries(work.parts)){
              renderItem($partsBlock, partID, part, work.recommendation, workID);
            }
            $workBlock.append($partsBlock);
          }
        }
      }
    }
  }

  _changeItemStatus($el, status) {
    const parentID = $el.dataset.parent,
          id = $el.value;
    const item = parentID ? this.equipment.works[parentID].parts[id] :
        this.equipment[parentID];
    item.isSelected = status;
    console.log(item)
  }

  _toggleItem(e) {
    const item = e.target,
          status = item.checked || false,
          $parentLine = item.parentNode.parentNode.parentNode;
    $parentLine.querySelectorAll("input[data-parent]").forEach(input =>{
      input.checked = status;
      this._changeItemStatus(input, status);
      if (input !== item) {
        input.disabled = !status;
      }
    })
  }

  render (equipment, range) {
    this.equipment = equipment;
    this.range = range;
    this.renderItems()
  }

  clear () {
    const $worksBlock = this.$stepBlock.querySelector('#costing-step_02_works'),
          $recommendationsBlock = this.$stepBlock.querySelector('#costing-step_02_recommendations');
    while ($worksBlock.firstChild) {
      $worksBlock.removeChild($worksBlock.firstChild)
    }
    while ($recommendationsBlock.firstChild) {
      $recommendationsBlock.removeChild($recommendationsBlock.firstChild)
    }
  }
}

export default CalculatorSecondStep;
