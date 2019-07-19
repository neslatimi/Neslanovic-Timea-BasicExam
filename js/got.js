const got = {
  actors: [],
  init() {
    this.findAll();
  },
  findAll() {
    fetch('/json/got.json')
      .then(response => response.json())
      .then((data) => {
        this.findAllFilterData(data);
      });
  },
  findAllFilterData(response) {
    this.actors = Array.from(response.filter(aliveActors => aliveActors.dead !== true)
      .sort((x, y) => {
        if (x.name === y.name) {
          return 0;
        } if (x.name > y.name) {
          return 1;
        } return -1;
      }));

    this.showAllInMain();
  },
  showAllInMain() {
    let gotTemplate = '';
    this.actors.forEach((element, i) => {
      gotTemplate += `<div class="main_container_dives">
              <img src="/${this.actors[i].portrait}" alt="${this.actors[i].name}">
              <div class="got_name" onclick="got.showDescription(${i})">${this.actors[i].name}</div>
              </div>`;
      document.querySelector('.main_container').innerHTML = gotTemplate;
    });
  },
  showDescription(gotTargetIndex) {
    // const gotTargetIndex = event.target.dataset.nameindex;
    const createDisriptionDiv = `<div class="aside_container">
         <div class="aside_container-picture"> <img src="/${this.actors[gotTargetIndex].picture}" 
          alt="${this.actors[gotTargetIndex].name} picture">
          <div class="aside_container-name">${this.actors[gotTargetIndex].name}${this.isLogoExist(gotTargetIndex)}</div>
          <div class="aside_container-description">${this.actors[gotTargetIndex].bio}</div>
    </div>`;
    document.querySelector('.main_container-description').innerHTML = createDisriptionDiv;
  },
  isLogoExist(index) {
    if (this.actors[index].house === undefined) {
      return '';
    }
    if (this.actors[index].house !== undefined) {
      return `<img src="/assets/houses/${this.actors[index].house}.png"
  alt="${this.actors[index].name} house">`;
    }
  },
  searchByName() {
    const inputValue = document.querySelector('.input_search');
    for (let i = 0; i < got.actors.length; i += 1) {
      if (got.actors[i].name.toLowerCase() === inputValue.value.toLowerCase()) {
        inputValue.value = '';
        return this.showDescription(i);
      }
    }
    inputValue.value = '';
    return this.showNotFound();
  },
  showNotFound() {
    const notFound = document.querySelector('.notFound--display-none');
    notFound.classList.remove('notFound--display-none');
    setTimeout(() => {
      notFound.classList.add('notFound--display-none');
    }, 5000);
  },
};
got.init();
