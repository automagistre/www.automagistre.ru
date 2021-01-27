const toggleService = (e) => {
  const newActiveService = e.currentTarget;
  if (newActiveService.classList.contains('is-active')) {
    return false;
  }

  const services = document.querySelectorAll('.js-services-kind');
  const serviceImg = document.querySelectorAll('.js-services-img');
  const serviceCount = document.querySelector('#services-count');
  const servicesMenu = document.querySelector('#services-menu');
  const newCount = newActiveService.dataset.kind;

  services.forEach((element) => element.classList.remove('is-active'));
  newActiveService.classList.add('is-active');

  serviceImg.forEach((element) => {
    element.dataset.kind === newCount ? element.classList.add('is-active')
      : element.classList.remove('is-active');
  });
  serviceCount.innerHTML = newCount;

  const servicesForRender = Array.from(services);
  const key = servicesForRender.indexOf(newActiveService);
  const { length } = servicesForRender;
  for (let i = key + 3; i < key + length + 3; i++) {
    servicesMenu.append(servicesForRender[i % length]);
  }
};

const servicesSec = () => {
  document.querySelectorAll('.js-services-kind').forEach((service) => service.addEventListener('click', toggleService));
};

export default servicesSec;
