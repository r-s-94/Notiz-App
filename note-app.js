let noteStorage = [];
let timeStorage = [];

loadNote();
loadTime();

function addValue() {
  const notes = document.getElementById("textarea");
  const getTime = new Date();
  const currentTime = getTime.toLocaleString();
  if (notes.value !== "") {
    noteStorage.push(notes.value);
    timeStorage.push(currentTime);
    console.log(noteStorage);
    createNotes();
    saveNotes();
    saveTime();
    notes.value = "";
  }
}

function createNotes() {
  document.getElementById("note-app-note-section-list").innerHTML = "";
  for (let index = 0; index < noteStorage.length; index++) {
    document.getElementById("note-app-note-section-list").innerHTML +=
      '<div class="note-app-note-list-container " >' +
      '<div class="note-app-framework" data-id="' +
      index +
      '" >' +
      '<p class="note-output ' +
      index +
      ' " >' +
      checkHTMLSign(noteStorage[index]) +
      "</p>" +
      "</div>" +
      '<div class="note-app-time-framework" >' +
      '<span class="note-app-time" >' +
      timeStorage[index] +
      "</span>" +
      "</div>" +
      '<div class="note-app-button-container" >' +
      '<button onclick="correctionNote(' +
      index +
      ')" class="note-app-options-button button correction-button" >Notiz bearbeiten</button>' +
      '<button onclick="updateNote(' +
      index +
      ')" class="update-button button note-app-options-button" >Notiz speichern</button>' +
      '<button onclick="deleteNote(' +
      index +
      ')" class="note-app-options-button button" >löschen</button>' +
      "</div>" +
      "</div>";
  }
}

function checkHTMLSign(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039");
}

function saveNotes() {
  const saveNote = JSON.stringify(noteStorage);
  localStorage.setItem("Note", saveNote);
}

function saveTime() {
  const saveTime = JSON.stringify(timeStorage);
  localStorage.setItem("Time", saveTime);
}

function loadNote() {
  const loadNote = localStorage.getItem("Note");
  if (loadNote.length >= 0) {
    noteStorage = JSON.parse(loadNote);
    console.log(noteStorage);
    createNotes(noteStorage);
  }
}

function loadTime() {
  const loadTime = localStorage.getItem("Time");
  if (loadTime.length >= 0) {
    timeStorage = JSON.parse(loadTime);
    createNotes();
  }
}

function deleteNote(index) {
  noteStorage.splice(index, 1);
  timeStorage.splice(index, 1);
  console.log(noteStorage);
  saveNotes();
  saveTime();
  createNotes();
}

function correctionNote(index) {
  changeCondition(index);
  removeElement(index);
  createTextareaElement(index);
  document.getElementsByClassName("note-app-time-framework")[
    index
  ].style.display = "none";
}

function changeCondition(index) {
  document.getElementsByClassName("update-button")[index].style.display =
    "block";
  document.getElementsByClassName("correction-button")[index].style.display =
    "none";
}

function createTextareaElement(index) {
  const createTextarea = document.createElement("textarea");
  createTextarea.textContent = noteStorage[index];
  createTextarea.classList.add("note-output");
  document.querySelector(`[data-id="${index}"]`).appendChild(createTextarea);
  console.log(noteStorage);
}

function updateNote(index) {
  changeConditionBack(index);
  createP_Element(index);
}

function changeConditionBack(index) {
  document.getElementsByClassName("update-button")[index].style.display =
    "none";
  document.getElementsByClassName("correction-button")[index].style.display =
    "block";
}

function createP_Element(index) {
  const updateNoteByTextarea =
    document.getElementsByClassName("note-output")[index];
  const createPElement = document.createElement("p");
  const getTime = new Date();
  const currentTime = getTime.toLocaleString();
  noteStorage[index] = updateNoteByTextarea.value;
  removeElement(index);
  console.log(noteStorage);
  createPElement.textContent = noteStorage[index];
  createPElement.classList.add("note-output");
  document.querySelector(`[data-id="${index}"]`).appendChild(createPElement);
  timeStorage.splice(index, 1);
  timeStorage.push(currentTime);
  saveNotes();
  saveTime();
  createNotes();
  document.getElementsByClassName("note-app-time-framework")[
    index
  ].style.display = "block";
}

function removeElement(index) {
  const noteList = document.querySelector(`[data-id="${index}"]`);
  noteList.removeChild(noteList.children[0]);
}
