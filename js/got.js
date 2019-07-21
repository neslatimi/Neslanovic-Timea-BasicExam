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
      gotTemplate += `<div class="main_character_container">
                          <div class="character_portrait">
                            <img data-id="${i} "class="portrait" src="/${this.actors[i].portrait}" 
                            alt="${this.actors[i].name}"
                            onclick="got.showDescription(${i})">
                          </div>
                          <div class="character_name" 
                            onclick="got.showDescription(${i})">${this.actors[i].name.toUpperCase()}
                          </div>
                      </div>`;
      document.querySelector('.main_container').innerHTML = gotTemplate;
    });
  },
  showDescription(actorsIndex) {
    this.selectedCharacter(event.target);
    document.querySelector('.aside_button').classList.remove('shadow');
    document.querySelector('.input_search').classList.remove('shadow');
    const createDisriptionDiv = `<div class="description_container">
                                    <img class="description_picture"src="/${this.actors[actorsIndex].picture}" 
                                        alt="${this.actors[actorsIndex].name} picture">
                                    <div class="description_name">${this.actors[actorsIndex].name}</div>
                                    <div class="description_logo">${this.isLogoExist(actorsIndex)}</div>
                                    <div class="description_content">${this.actors[actorsIndex].bio}</div>
                                </div>`;
    document.querySelector('.aside_description_container').innerHTML = createDisriptionDiv;
    /* const dataid = document.querySelectorAll('[data-id]');

    const portrait = dataid.filter(item => item.dataset.id === actorsIndex);
    portrait.classList.add('shadowed'); */
  },
  selectedCharacter(target) {
    const allPortrait = document.querySelectorAll('.shadow');
    allPortrait.forEach((element) => {
      element.classList.remove('shadow');
    });
    target.classList.add('shadow');
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
  checkKeyPress(event) {
    const eventKeycode = event.keyCode;
    if (eventKeycode === 13) {
      this.searchByName();
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
    const notFound = document.querySelector('.display--none');
    notFound.classList.remove('display--none');
    setTimeout(() => {
      notFound.classList.add('display--none');
    }, 3000);
  },
};
got.init();
