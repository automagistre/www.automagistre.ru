class CalculatorSecondStep {
  constructor($el, equipment, range) {
    this.$stepBlock = $el;
    this.range = range;
    this.equipment = equipment;
    this.renderWorks()
  }

  renderWorks() {
    const $workBlock = this.$stepBlock.querySelector('#costing-step_02_works'),
          $recommendationsBlock = this.$stepBlock.querySelector('#costing-step_02_recommendations'),
          equipment = {...this.equipment};
    const renderWork = (id, work) => {
      const workWrapper = document.createElement('li'),
            workInput = document.createElement('input'),
            isRecommendation  = work.recommendation || false;
      workWrapper.className = 'cg-price__item';
      workWrapper.innerHTML = `<div class="cg-price__line">
                                 <label class="cg-price__check">
                                    <span class="cg-price__check_name">test</span>
                                 </label>
                                 <div class="cg-price__cost">
                                 </div>
                              </div>`;
      workInput.type = 'checkbox';
      workInput.value = id;
      workWrapper.querySelector('.cg-price__check_name').textContent = work.name;
      workWrapper.querySelector('.cg-price__check').prepend(workInput);
      workWrapper.querySelector('.cg-price__cost').innerHTML = `${work.price}<i class="icon-rub"></i>`;
      if (isRecommendation) {
         const workNote = document.createElement('div'),
               note = work.note || 'Уточняйте информацию по телефону';
         workNote.className = 'cg-price__info';
         workNote.innerHTML = `<span>${note}</span>`;
         workWrapper.firstChild.append(workNote);
      }
      const parent  = isRecommendation ? $recommendationsBlock : $workBlock;
      parent.append(workWrapper);
    };

    if (equipment.works) {
      for (let [workID, work] of Object.entries(equipment.works)) {
        renderWork(workID, work);
      }
    }
  }
}

export default CalculatorSecondStep;
