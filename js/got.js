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
      gotTemplate += `<div data-id="${i}" classs="main_container_dives">
              <img src="/${this.actors[i].portrait}" alt="${this.actors[i].name}">
              <div class="got_name" onclick="got.showDescription()" data-nameIndex="${i}">${this.actors[i].name}</div>
              </div>`;
      document.querySelector('.main_container').innerHTML = gotTemplate;
    });
  },
  showDescription() {
    const gotTargetIndex = event.target.dataset.nameindex;
    /*
    console.log(gotTargetIndex);
    console.log(this.actors[gotTargetIndex].bio);
    */
  },

};
got.init();
