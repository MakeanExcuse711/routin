const form = document.getElementById("form");
const input2 = document.getElementById("input2");
const ul = document.getElementById("ul");
const form2 = document.getElementById("form2");

let routin = JSON.parse(localStorage.getItem("routin"));

if (routin) {
  routin.forEach((routin) => {
    add(routin);
  });
}

//即時リロードされるのを防ぐ　addEventListener("いつ","何");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  add();
});

form2.addEventListener("submit",function(event){
  routin = JSON.parse(localStorage.getItem("routin"));
  event.preventDefault();
  console.log("実行");
  div.innerHTML = "実行";
  calc(routin);
});

function calc(){
  let i = 0;
  let j = 0;
  while(routin[i]){
    if(routin[i].completed==true){
      j = j + 1;
    } 
    i = i + 1;
  }
  let k = i - j;
  var ran = Math.floor(Math.random()*4-k) + 1; 
  div.innerHTML = ran;
}


function add(todo) {
  let todoText = input2.value;
  
  if (todo) {
    todoText = todo.text;
  }
  
  if (todoText) {
    const li = document.createElement("li");

    li.innerText = todoText;
    //li.classList.add('list-group-item')

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    // li.addEventListener("右クリック") →liに右クリックした時
    li.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("auxclick",function(){
      li.addEventListener("keydown",function(e){
      li.innerText = todoText + e.key;
      saveData();  
      })
    })
    li.addEventListener("click", function () {
    //重複線を引くやつ toggleは切り替え
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });
    
    //
    ul.appendChild(li);
    input2.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  const routin = [];

  lists.forEach((li) => {
    //オブジェクトの話
    routin.push({
      //ちょっと分からない
      text: li.innerText,
      completed: li.classList.contains("text-decoration-line-through"),
    });
  });

  localStorage.setItem("routin", JSON.stringify(routin));
}