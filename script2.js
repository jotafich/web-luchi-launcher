const btnAddSticker = document.getElementById("btnAddSticker");
const formSticker = document.getElementById("formSticker");
const txtSticker = document.getElementById("txtSticker");
const btnSubmitSticker = document.getElementById("btnSubmitSticker");
const stickersContainer = document.getElementById("stickersContainer");

btnAddSticker.addEventListener("click", function() {
  formSticker.style.display = formSticker.style.display === "none" ? "block" : "none";
});

btnSubmitSticker.addEventListener("click", function(event) {
  event.preventDefault();
  const text = txtSticker.value;
  if (!text) {
    return;
  }

  const sticker = { text, completed: false };
  const divSticker = document.createElement("div");
  divSticker.classList.add("sticker");
  divSticker.innerHTML = sticker.text + " <button class='btnRemoveSticker'>-</button> <button class='btnCompleteSticker'>ok</button>";
  stickersContainer.appendChild(divSticker);

  txtSticker.value = "";
  formSticker.style.display = "none";

  const stickers = JSON.parse(localStorage.getItem("stickers")) || [];
  stickers.push(sticker);
  localStorage.setItem("stickers", JSON.stringify(stickers));
});

stickersContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("btnRemoveSticker")) {
    const divSticker = event.target.parentElement;
    stickersContainer.removeChild(divSticker);

    const text = divSticker.innerText;
    const stickers = JSON.parse(localStorage.getItem("stickers")) || [];
    const index = stickers.findIndex(sticker => sticker.text === text);
    stickers.splice(index, 1);
    localStorage.setItem("stickers", JSON.stringify(stickers));
  } else if (event.target.classList.contains("btnCompleteSticker")) {
    const divSticker = event.target.parentElement;
    divSticker.style.backgroundColor = "rgba(255, 70, 224, 0.801)";
    divSticker.removeChild(event.target);

    const text = divSticker.innerText;
    const stickers = JSON.parse(localStorage.getItem("stickers")) || [];
    const index = stickers.findIndex(sticker => sticker.text === text);
    stickers[index].completed = true;
    localStorage.setItem("stickers", JSON.stringify(stickers));
  }
});

const storedStickers = JSON.parse(localStorage.getItem("stickers")) || [];
storedStickers.forEach(function(sticker) {
  const divSticker = document.createElement("div");
  divSticker.classList.add("sticker");
  divSticker.innerHTML = sticker.text + " <button class='btnRemoveSticker'>-</button> <button class='btnCompleteSticker'>ok</button>";
  divSticker.style.backgroundColor = sticker.completed ? "rgba(255, 70, 224, 0.801)" : "";
  stickersContainer.appendChild(divSticker);
  });
  
  btnSubmitSticker.addEventListener("click", function(event) {
  event.preventDefault();
  const text = txtSticker.value;
  if (!text) {
  return;
  }
  
  const divSticker = document.createElement("div");
  divSticker.classList.add("sticker");
  divSticker.innerHTML = text + " <button class='btnRemoveSticker'>-</button> <button class='btnCompleteSticker'>ok</button>";
  stickersContainer.appendChild(divSticker);
  
  txtSticker.value = "";
  formSticker.style.display = "none";
  
  const stickers = JSON.parse(localStorage.getItem("stickers")) || [];
  stickers.push({ text, completed: false });
  localStorage.setItem("stickers", JSON.stringify(stickers));
  });
  
  stickersContainer.addEventListener("click", function(event) {
  if (event.target.classList.contains("btnRemoveSticker")) {
  const divSticker = event.target.parentElement;
  stickersContainer.removeChild(divSticker);

  const text = divSticker.innerText;
const stickers = JSON.parse(localStorage.getItem("stickers")) || [];
const index = stickers.findIndex(sticker => sticker.text === text);
stickers.splice(index, 1);
localStorage.setItem("stickers", JSON.stringify(stickers));

} else if (event.target.classList.contains("btnCompleteSticker")) {
  const divSticker = event.target.parentElement;
  divSticker.style.backgroundColor = "rgba(255, 70, 224, 0.801)";
  event.target.remove();

  const text = divSticker.innerText;
const stickers = JSON.parse(localStorage.getItem("stickers")) || [];
const sticker = stickers.find(sticker => sticker.text === text);
sticker.completed = true;
localStorage.setItem("stickers", JSON.stringify(stickers));

}
});