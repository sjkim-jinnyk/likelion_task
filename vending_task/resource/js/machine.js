const drinkList = document.querySelector(".vending-machine .list-item");
const drinkSelectList = document.querySelector(
  ".vending-machine .list-getItem"
);
const drinkBuyListParent = document.querySelector(".my-info .cont-getItem");
const drinkBuyList = document.querySelector(".my-info .list-getItem");
let totalPrice = document.querySelector(".txt-price");
let myMoney = document.querySelector(".txt-mymoney");
const extraMoneyParent = document.querySelector(".my-info .info-totalmoney");
let extraMoney = document.querySelector(".txt-totalmoney");
const moneyInputBtn = document.querySelector(".btn-pay");
const buyBtn = document.querySelector(".btn-getItem");

let totalSum = 0;
let moneyInput;
let select = new Map();

init();

function init() {
  getData();
}

function getData() {
  fetch("./resource/drink.json")
    .then((res) => {
      return res.json();
    })
    .then((jsonData) => {
      newList(jsonData);
      renderNewList(jsonData);
    });
}

function newList(data) {
  for (let x = 0; x < data.length; x++) {
    const list = document.createElement("li");
    drinkList.append(list);
  }
}

function renderNewList(data) {
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

    clickList.classList.add("list-click");
    totalSum += data[index].price;
    totalPrice.innerText = `${totalSum.toLocaleString()}원`;

    let drinkName = data[index].drink;

    if (select.has(drinkName)) select.set(drinkName, select.get(drinkName) + 1);
    else select.set(drinkName, 1);

    drinkSelect(select);
  });
}

function moneyInputClick() {
  moneyInput = parseInt(document.querySelector(".inp-put").value);

  if (!moneyInput) alert("입금액을 입력해주세요.");
  else if (!totalSum) alert("음료를 선택해주세요.");

  if (totalSum > moneyInput)
    alert("금액이 부족합니다. 음료 값을 확인하고 입금해주세요.");
  else myMoney.innerText = `${moneyInput.toLocaleString()}원`;
}

function drinkSelect(data) {
  if (drinkSelectList.children.length < data.size) {
    const list = document.createElement("li");
    for (let x of data) {
      const str = `                
      <img
      src="./resource/img/${x[0]}.png"
      alt=""
      class="img-item"
      />
      <strong class="txt-item">${x[0]}</strong>
      <span class="num-counter">${x[1]}</span>
      `;
      list.innerHTML = str;
    }
    drinkSelectList.append(list);
  } else if (drinkSelectList.children.length === data.size) {
    const num = document.querySelectorAll(".vending-machine .num-counter");
    let drinkNum = [];
    for (let x of data) {
      drinkNum.push(x[1]);
    }
    num.forEach((e, i) => {
      e.innerText = drinkNum[i];
    });
  }
}

function buyDrink() {
  let extra = moneyInput - totalSum;
  extraMoney.innerText = `${extra.toLocaleString()}원`;
}

buyBtn.addEventListener("click", () => {
  if (!moneyInput) alert("입금액을 입력해주세요.");
  else {
    buyDrink();
    const copySelectDrink = drinkSelectList.cloneNode(true);

    drinkBuyListParent.removeChild(drinkBuyList);
    drinkBuyListParent.insertBefore(copySelectDrink, extraMoneyParent);
  }
});

moneyInputBtn.addEventListener("click", () => {
  moneyInputClick();
});
