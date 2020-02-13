
const toggleService = (e) => {
    const newActiveService = e.currentTarget;
    if (newActiveService.classList.contains('is-active')) return false;

    const services = document.querySelectorAll(".js-services-kind"),
          serviceImg = document.querySelectorAll(".js-services-img"),
          serviceCount = document.querySelector('#services-count'),
          servicesMenu = document.querySelector('#services-menu');
    const newCount = newActiveService.dataset.kind;

    services.forEach(element => element.classList.remove("is-active"));
    newActiveService.classList.add("is-active");

    serviceImg.forEach(element => {element.dataset.kind === newCount ? element.classList.add("is-active") :
                                                                                element.classList.remove("is-active")});
    serviceCount.innerHTML = newCount;

    let servicesForRender =  Array.from(services);
    let key = servicesForRender.indexOf(newActiveService),
        length = servicesForRender.length;
    for (let i = key + 3; i < key + length + 3; i++){
        servicesMenu.append(servicesForRender[i % length])
    }
};

document.querySelectorAll(".js-services-kind").forEach( service => service.addEventListener('click', toggleService));

