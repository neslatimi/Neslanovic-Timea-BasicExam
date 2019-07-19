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
    this.data = Array.from(response.filter(aliveActors => aliveActors.dead !== true)
      .sort((x, y) => {
        if (x.name === y.name) {
          return 0;
        } if (x.name > y.name) {
          return 1;
        } return -1;
      }));

    console.log(this.data);
  },

};
got.init();
