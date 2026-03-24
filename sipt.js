let open = document.querySelector("#openForm");
let modal = document.querySelector(".modal");
let close = document.querySelector("#closeForm");
let form = document.querySelector("form");
let stack = document.querySelector(".card-stack");
let upBtn=document.querySelector("#up");
let dnBtn=document.querySelector("#down");

//for create button
open.addEventListener("click", function() {
  modal.style.display = "flex";  // Show the modal
});

//for close button    
close.addEventListener("click", function() {
  modal.style.display = "none";  // Close the modal
});

//saving the values of form
function save(obj){
if(localStorage.getItem("task")===null){
 let oldtask=[];
 oldtask.push(obj);
 localStorage.setItem("task",JSON.stringify(oldtask));
}else{
  let oldtask=localStorage.getItem("task");
  oldtask=JSON.parse(oldtask);
  oldtask.push(obj);
  localStorage.setItem("task",JSON.stringify(oldtask));
}
}

document.addEventListener("DOMContentLoaded", Cards);

//Form 
form.addEventListener("submit", function(e) {
  e.preventDefault();  // Prevent the form from submitting

  // Get form values
  const imageUrl = form.querySelector('input[placeholder^="https"]').value.trim();
  const fullName = form.querySelector('input[placeholder="Enter full name"]').value.trim();
  const homeTown = form.querySelector('input[placeholder="Enter home town"]').value.trim();
  const purpose = form.querySelector('input[placeholder="e.g. Quick appointment note"]').value.trim();
  const category = form.querySelector('input[name="category"]:checked');

  // Validation checks
  if (imageUrl === "") {
    alert("Please enter a valid image URL.");
    return;
  }

  if (fullName === "") {
    alert("Please enter your full name.");
    return;
  }

  if (homeTown === "") {
    alert("Please enter your hometown.");
    return;
  }

  if (purpose === "") {
    alert("Please enter a purpose.");
    return;
  }

  if (!category) {
    alert("Please select a category.");
    return;
  }

  // Save task to localStorage
  save({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    category: category.value
  });

  
  // Clear the form and hide the modal
  form.reset();
  modal.style.display = "none";
  Cards();
});



//Cards 
function Cards() {
  const allTasks = JSON.parse(localStorage.getItem("task")) || [];
  const cardStack = document.querySelector(".card-stack");

  // Clear the current stack before adding new cards
  cardStack.innerHTML = "";

  allTasks.forEach(function(tsk) {
    // Create and append new cards as you did in the existing code
    const activeCard = document.createElement("div");
    activeCard.classList.add("card", "active");

    const avatar = document.createElement("div");
    avatar.classList.add("avatar");

    const img = document.createElement("img");
    img.src = tsk.imageUrl;
    img.alt = "";

    avatar.appendChild(img);

    const details = document.createElement("div");
    details.classList.add("details");

    const h2 = document.createElement("h2");
    h2.textContent = tsk.fullName;

    const homeRow = document.createElement("div");
    homeRow.classList.add("row");

    const homeLabel = document.createElement("span");
    homeLabel.classList.add("label");
    homeLabel.textContent = "Home town";

    const homeValue = document.createElement("span");
    homeValue.classList.add("value");
    homeValue.textContent = tsk.homeTown;

    homeRow.appendChild(homeLabel);
    homeRow.appendChild(homeValue);

    const purposeRow = document.createElement("div");
    purposeRow.classList.add("row");

    const purposeLabel = document.createElement("span");
    purposeLabel.classList.add("label");
    purposeLabel.textContent = "Purpose";

    const purposeValue = document.createElement("span");
    purposeValue.classList.add("value");
    purposeValue.textContent = tsk.purpose;

    purposeRow.appendChild(purposeLabel);
    purposeRow.appendChild(purposeValue);

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.textContent = "📞 Call";

    const msgBtn = document.createElement("button");
    msgBtn.classList.add("message");
    msgBtn.textContent = "Message";

    actions.appendChild(callBtn);
    actions.appendChild(msgBtn);

    details.appendChild(h2);
    details.appendChild(homeRow);
    details.appendChild(purposeRow);
    details.appendChild(actions);

    activeCard.appendChild(avatar);
    activeCard.appendChild(details);

    cardStack.appendChild(activeCard);
  });
}



//for changing the card
function updateCards() {
  const cards = document.querySelectorAll(".card-stack .card");

  cards.forEach(function(card) {
    card.style.transform = `translateY(0) scale(1)`; // no offset, no scale
    card.style.opacity = `1`;                        // fully visible
  });
}



//up button
upBtn.addEventListener("click",function(){
  let LastChild=stack.lastElementChild;
  if(LastChild){
    stack.insertBefore(LastChild,stack.firstElementChild);
    updateCards();
  }

});

//down button
dnBtn.addEventListener("click",function(){
  let Firstchild=stack.firstElementChild;
  if(Firstchild){
    stack.appendChild(Firstchild);
    updateCards();
  }
})





//card color
// Select all color dots
const colorDots = document.querySelectorAll(".colors .dot");

// Map dot class to actual color
const colorMap = {
  black: "#000",
  purple: "#6a00ff",
  brown: "#7a4a2e",
  teal: "#00c2a8"
};

// Add click event to each dot
colorDots.forEach(dot => {
  dot.addEventListener("click", function() {
    // The top card in the stack is the current visible card
    const cards = document.querySelectorAll(".card-stack .card");
    if (cards.length === 0) return;

    const activeCard = cards[cards.length - 1]; // topmost card visually
    if (!activeCard) return;

    // Get the color from the clicked dot
    const dotClass = dot.classList[1]; // "black", "purple", etc.
    const color = colorMap[dotClass];

    // Apply the new background color to the top card
    activeCard.style.backgroundColor = color;
  });
});


