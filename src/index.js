const choreURL = "http://localhost:3000/chores"
let choreList = document.querySelector("#chore-list")
const choreForm = document.querySelector("#new-chore-form")


fetch(choreURL)
.then(res => res.json())
.then(chores => chores.forEach(displayChore))

function displayChore(chore) {
  console.log(chore)
  choreList.innerHTML += `
    <div class="chore-card" id="chore-${chore.id}">
        <button class="delete-button" data-id="${chore.id}">x</button>
        <h3>${chore.title}</title>
        <p>${chore.duration}</p>
        <input class="priority-input" data-id="${chore.id}" id="chore${chore.id}" value="${chore.priority}">
    </div>
  `
}

choreForm.addEventListener("submit", submitForm)

function submitForm(e){
  e.preventDefault()
  const priority = e.target.priority.value
  const title = e.target.title.value
  const duration = e.target.duration.value


  fetch(choreURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      priority: priority,
      title: title,
      duration: duration
    })
  })
    .then(resp => resp.json())
    // .then(displayChore)
    .then(data => displayChore(data))
    // .then(function(data) {
    //   displayChore(data)
    // })

  // const chore ={
  //   priority: e.target.priority.value,
  //   title: e.target.title.value,
  //   duration: e.target.duration.value
  // }
}

function patchChore(event) {
  if(event.target.classList.contains('priority-input')) {

     const priorityValue = event.target.value;
     const id = event.target.dataset.id;
     fetch(`${choreURL}/${id}`, {

       method: "PATCH",
       headers: {
         "Content-Type": "application/json"
       },

       body: JSON.stringify({
         priority: priorityValue
       })

     })
     .then(resp => resp.json())
     .then(console.log)
  }

}

choreList.addEventListener('focusout', patchChore);

choreList.addEventListener('click', deleteChore);

function deleteChore(event){

  if (event.target.classList.contains("delete-button")){
    const id = event.target.dataset.id;
    fetch(choreURL + '/' + id, {
      method: 'delete',
    })
    // event.target.parentElement.remove();
    const chore = choreList.querySelector(`#chore-${id}`)
    chore.remove();
  }

}
