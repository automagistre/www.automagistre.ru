
class CalculatorSecondStep {
  constructor($el, equipment, range) {
    this.$stepBlock = $el;
    this.range = range;
    this.equipment = equipment;
    this.renderWorks()
  }

  renderWorks() {
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
      return itemWrapper;
    };


    if (equipment.works) {
      for (let [workID, work] of Object.entries(equipment.works)) {
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

export default CalculatorSecondStep;
