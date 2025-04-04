import { useContext } from "react";
import { Link } from "react-router-dom";
import { noteContext } from "../noteContext";
import "./notePreviewComponent.scss";
import "./notePreviewResponsiveComponent.scss";

export default function NotePreviewComponent() {
  const { noteFolderArray, noteTransmissionData, setNoteTransmissionData } =
    useContext(noteContext);

  function showNote(noteId: number) {
    setNoteTransmissionData({
      ...noteTransmissionData,
      selectedNoteId: noteId,
    });
  }

  function newNote() {
    setNoteTransmissionData({
      ...noteTransmissionData,
      newNote: true,
    });
  }

  return (
    <div className="note-preview-div">
      <h1 className="note-preview-div__headline">Note Scribe App</h1>
      <Link
        to="create-note-component"
        className="note-preview-div__create-note-link"
      >
        {" "}
        <button
          onClick={newNote}
          className="note-preview-div__create-note-link--create-note-button button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="note-preview-div__create-note-link--create-note-button--create-note-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </button>{" "}
      </Link>

      <div className="note-preview-div__note-container">
        {noteFolderArray.map((note) => {
          return (
            <Link to="create-note-component">
              <div
                onClick={() => {
                  showNote(note.id);
                }}
                className="note-preview-div__note-container--note-div"
              >
                <h2 className="note-preview-div__note-container--note-div--headline">
                  {note.headline}
                </h2>
                <p className="note-preview-div__note-container--note-div--main-text">
                  {note.mainText}
                </p>
                <p className="note-preview-div__note-container--note-div--date-and-time">
                  {note.date}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
