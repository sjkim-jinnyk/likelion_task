const drinkList = document.querySelector(".list-item");
let totalSum = 0;
let totalPrice = document.querySelector(".txt-price");
let myMoney = document.querySelector(".txt-mymoney");
const moneyInput = document.querySelector(".btn-pay");

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
    drinkBtnClick(element, data, index);
  });
}

function drinkBtnClick(element, data, index) {
  element.addEventListener("click", (e) => {
    let clickList = e.currentTarget;
    clickList.classList.toggle("list-click");

    if (clickList.className === "list-click") totalSum += data[index].price;
    else totalSum -= data[index].price;

    totalPrice.innerText = `${totalSum.toLocaleString()}원`;
  });
}

function moneyInputClick() {
  moneyInput.addEventListener("click", () => {
    let money = document.querySelector(".inp-put").value;
    myMoney.innerText = `${money.toLocaleString()}원`;
  });
}

moneyInputClick();
