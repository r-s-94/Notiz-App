import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { noteContext, NoteObject } from "../noteContext";
import { LOCAL_STORAGE_KEY } from "../App";
import "./createNoteComponent.scss";
import "./createNoteResponsiveComponent.scss";

export default function CreateNoteComponent() {
  const {
    noteFolderArray,
    setNoteFolderArray,
    loadNoteFromStorage,
    noteTransmissionData,
    setNoteTransmissionData,
  } = useContext(noteContext);

  const [correctNoteId, setCorrectNoteId] = useState<number>(0);
  const [noteInfoPopUp, setNoteInfoPopUp] = useState<boolean>(false);
  const [deleteNotePopUp, setDeleteNotePopUp] = useState<boolean>(false);

  useEffect(() => {
    showNote();
  }, [noteTransmissionData.selectedNoteId]);

  if (noteTransmissionData.newNote === true) {
    newNote();
  }

  function newNote() {
    setNoteTransmissionData({
      ...noteTransmissionData,
      inputField: "",
      textArea: "",
      newNote: false,
    });
  }

  function checkNote() {
    const selectedNote = noteFolderArray.find((note) => {
      return note.id === noteTransmissionData.selectedNoteId;
    });

    console.log(selectedNote);

    if (
      noteTransmissionData.inputField !== "" &&
      noteTransmissionData.textArea !== ""
    ) {
      if (selectedNote) {
        updateNote(selectedNote);
        setCorrectNoteId(selectedNote.id);
      } else {
        createNote();
      }
    } else {
      setNoteInfoPopUp(true);
    }
  }

  function closeNoteInfoPopUp() {
    setNoteInfoPopUp(false);
  }

  function createNote() {
    const currentDate = new Date().getTime();
    const dayAndTime = new Date().toLocaleString();

    const newNoteObject: NoteObject = {
      headline: noteTransmissionData.inputField,
      mainText: noteTransmissionData.textArea,
      id: currentDate,
      date: dayAndTime,
    };

    console.log(newNoteObject);

    const newNoteArray = [newNoteObject, ...noteFolderArray];

    setNoteInStorage(newNoteArray);
    loadNoteFromStorage();
    setNoteFolderArray(newNoteArray);
    console.log(noteFolderArray);

    setNoteTransmissionData({
      ...noteTransmissionData,
      inputField: "",
      textArea: "",
    });
  }

  function updateNote(selectedNoteArray: NoteObject) {
    const updateDayAndTime = new Date().toLocaleString();
    const selectedNote = selectedNoteArray;

    console.log(selectedNote);

    const filteredNoteArray = noteFolderArray.filter((noteObject) => {
      return noteObject.id !== noteTransmissionData.selectedNoteId;
    });

    console.log(filteredNoteArray);

    const updateNoteObject: NoteObject = {
      headline: noteTransmissionData.inputField,
      mainText: noteTransmissionData.textArea,
      id: correctNoteId,
      date: updateDayAndTime,
    };

    const updateNoteArray = [updateNoteObject, ...filteredNoteArray];
    console.log(updateNoteArray);

    setNoteInStorage(updateNoteArray);
    loadNoteFromStorage();
    setNoteFolderArray(updateNoteArray);
    setNoteTransmissionData({
      ...noteTransmissionData,
      inputField: "",
      textArea: "",
    });
    setCorrectNoteId(0);
  }

  function setNoteInStorage(noteArray: NoteObject[]) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(noteArray));
  }

  function showNote() {
    const selectedNote = noteFolderArray.find((note) => {
      return note.id === noteTransmissionData.selectedNoteId;
    });

    if (selectedNote) {
      setNoteTransmissionData({
        ...noteTransmissionData,
        inputField: selectedNote.headline,
        textArea: selectedNote.mainText,
      });

      setCorrectNoteId(selectedNote.id);
    }
  }

  function openDeleteNotePopUp() {
    setDeleteNotePopUp(true);
  }

  function deleteNote(noteId: number) {
    const filteredNoteArray = noteFolderArray.filter((note) => {
      return note.id !== noteId;
    });

    const newArray = [...filteredNoteArray];

    setNoteInStorage(filteredNoteArray);
    loadNoteFromStorage();
    setNoteFolderArray(newArray);
    setNoteTransmissionData({
      ...noteTransmissionData,
      inputField: "",
      textArea: "",
    });
    setCorrectNoteId(0);

    setDeleteNotePopUp(false);
  }

  function closeDeleteNotePopUp() {
    setDeleteNotePopUp(false);
  }

  return (
    <div className="create-note-div">
      {noteInfoPopUp && (
        <div className="create-note-div__popup-main-window">
          <div className="create-note-div__popup-main-window--popup-message-window">
            <p className="create-note-div__popup-main-window--popup-message-window--message">
              Bitte beide Felder ausfüllen.
            </p>
            <button
              onClick={closeNoteInfoPopUp}
              className="create-note-div__popup-main-window--popup-message-window--info-button"
            >
              Okay, Fenster schliessen{" "}
            </button>
          </div>
        </div>
      )}

      {deleteNotePopUp && (
        <div className="create-note-div__popup-main-window">
          <div className="create-note-div__popup-main-window--popup-message-window">
            <p className="create-note-div__popup-main-window--popup-message-window--message">
              Möchtest du die Notiz wircklich löschen?
            </p>
            <div className="create-note-div__popup-main-window--popup-message-window--button-div">
              <button
                onClick={() => {
                  deleteNote(noteTransmissionData.selectedNoteId);
                }}
                className="create-note-div__popup-main-window--popup-message-window--button-div--delete-note-button button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="create-note-div__popup-main-window--popup-message-window--button-div--delete-note-button--delete-note-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                onClick={closeDeleteNotePopUp}
                className="create-note-div__popup-main-window--popup-message-window--button-div--close-popup-button button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="create-note-div__popup-main-window--popup-message-window--button-div--close-popup-button--close-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="create-note-div__button-div">
        {" "}
        <Link to="/" className="create-note-div__button-div--back-link">
          {" "}
          <button className="create-note-div__button-div--back-link--back-button button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="create-note-div__button-div--back-link--back-button--back-button-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>{" "}
        </Link>{" "}
        <div className="create-note-div__button-div--focus-button-div ">
          <button
            onClick={checkNote}
            className="create-note-div__button-div--focus-button-div--check-note-button button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="create-note-div__button-div--focus-button-div--check-note-button--check-note-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
              />
            </svg>
          </button>{" "}
          <button
            onClick={openDeleteNotePopUp}
            className="create-note-div__button-div--focus-button-div--delete-note-button button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="create-note-div__button-div--focus-button-div--delete-note-button--delete-note-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>{" "}
        </div>
      </div>
      <div className="create-note-div__input-div">
        <input
          type="text"
          value={noteTransmissionData.inputField}
          onChange={(event) => {
            setNoteTransmissionData({
              ...noteTransmissionData,
              inputField: event.target.value,
            });
          }}
          className="create-note-div__input-div--input-field"
          placeholder="Überschrift..."
        />
        <textarea
          value={noteTransmissionData.textArea}
          onChange={(event) => {
            setNoteTransmissionData({
              ...noteTransmissionData,
              textArea: event.target.value,
            });
          }}
          className="create-note-div__input-div--textarea"
          placeholder="Haupttext..."
        ></textarea>
      </div>
    </div>
  );
}
