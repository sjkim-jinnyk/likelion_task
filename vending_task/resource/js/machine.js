const drinkList = document.querySelector(".list-item");

getData();

function getData() {
  fetch("./resource/drink.json")
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      newList(jsonData);
      renderContent(jsonData);
    });
}

function newList(data) {
  for (let x = 0; x < data.length; x++) {
    const list = document.createElement("li");
    drinkList.append(list);
  }
}

function renderContent(data) {
  const colaList = document.querySelectorAll(".list-item li");

  colaList.forEach((element, index) => {
    const listString = `
      <button class="btn-item" data-item="${data[index].drink}">
      <img
        src="./resource/img/${data[index].drink}.png"
        alt="${data[index].drink}"
        class="img-item"
      />
      <strong class="tit-item">${data[index].drink}</strong>
      <span class="txt-item">${data[index].price}원</span>
    </button>
      `;
    element.innerHTML = listString;
    // drinkBtnClick(element, data, index);
  });
}
