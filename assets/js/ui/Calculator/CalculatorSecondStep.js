class CalculatorSecondStep {
  equipment = {};
  range = undefined;
  _totalPrices = {
    works: 0,
    recommendations: 0
  };

  constructor($el) {
    this.$stepBlock = $el;
    this.$worksBlock = $el.querySelector('#costing-step_02_works');
    this.$recommendationsBlock = $el.querySelector('#costing-step_02_recommendations');
    this.$worksTotalBlock = $el.querySelector('#costing-step_02_works_total');
    this.$totalBlock = $el.querySelector('#costing-step_02_total');
  }

  get worksPrice() {
    return this._totalPrices.works;
  }

  set worksPrice(value) {
    throw new Error('Can not set value read only property')
  }

  get recommendationsPrice() {
    return this._totalPrices.recommendations;
  }

  set recommendationsPrice(value) {
    throw new Error('Can not set value read only property')
  }

  get totalPrice() {
    return this.worksPrice + this.recommendationsPrice;
  }

  set totalPrice(value) {
    throw new Error('Can not set value read only property')
  }


  get selectedWorks() {
    const works = JSON.parse(JSON.stringify(this.equipment.works));
    for(const workID in works) {
      if (!works[workID].isSelected) {
        delete works[workID];
        continue;
      }
      const work = works[workID];
      if (work.parts) {
        for (const partID in work.parts) {
          if (!work.parts[partID].isSelected){
            delete work.parts[partID]
          }
        }
      }
    }
    return works;
  }

  set selectedWorks(value) {
    throw new Error('Can not set value read only property')
  }


  _renderItems() {
    const $worksBlock = this.$worksBlock,
          $recommendationsBlock = this.$recommendationsBlock,
          equipment = {...this.equipment};

    this.$worksBlock = $worksBlock;
    this.$recommendationsBlock = $recommendationsBlock;

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
      this._changeItemStatus(itemInput, !isRecommendation);

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

  onChange() {}

  _changeItemStatus($el, status) {
    const parentID = $el.dataset.parent,
          id = $el.value;
    const item = parentID ? this.equipment.works[parentID].parts[id] :
        this.equipment.works[id];
    item.isSelected = status;
    this._totalPrices = this._calcTotalPrices();
    this._renderTotalPrices();
    this.onChange()
  }

  _toggleItem(e) {
    const item = e.target,
          status = item.checked || false,
          $parentLine = item.parentNode.parentNode.parentNode;
    this._changeItemStatus(item, status);
    $parentLine.querySelectorAll("input[data-parent]").forEach(input =>{
      input.checked = status;
      this._changeItemStatus(input, status);
      if (input !== item) {
        input.disabled = !status;
      }
    })
  }

  _calcTotalPrices() {
    let works = 0,
        recommendations = 0;
    for (const workID in this.equipment.works) {
      const work = this.equipment.works[workID],
            isRecommendation = work.recommendation;
      let total = 0;
      if (!work.isSelected) {
        continue;
      }
      total += +work.price;
      if (work.parts){
        for (const partID in work.parts){
          const part = work.parts[partID];
          let partTotalPrice = 0,
              count = +part.count,
              price = +part.price;
          partTotalPrice = count > 1 ? price * count : price;
          total += work.parts[partID].isSelected ?  partTotalPrice : 0;
        }
      }
      if (isRecommendation) {
        recommendations += total
      } else {
        works += total;
      }
    }
    return {works, recommendations};
  }

  _renderTotalPrices() {
    const $worksBlock = this.$worksTotalBlock,
          $recommendationsBlock = this.$totalBlock;
    $worksBlock.innerHTML =
        `${this.worksPrice}<i class="icon-rub">a</i></div>`;
    $recommendationsBlock.innerHTML =
        `${this.totalPrice}<i class="icon-rub">a</i></div>`;
  }

  render (equipment, range) {
    this.equipment = JSON.parse(JSON.stringify(equipment));
    this.range = range;
    this._renderItems()
  }

  clear () {
    const $worksBlock = this.$worksBlock,
          $recommendationsBlock = this.$recommendationsBlock;
    while ($worksBlock.firstChild) {
      $worksBlock.removeChild($worksBlock.firstChild)
    }
    while ($recommendationsBlock.firstChild) {
      $recommendationsBlock.removeChild($recommendationsBlock.firstChild)
    }
    this._totalPrices = {works: 0, recommendations: 0};
    this.equipment = {};
  }
}

export default CalculatorSecondStep;
