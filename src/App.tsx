import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import CreateNoteComponent from "./componentFolder/createNoteComponent";
import NotePreviewComponent from "./componentFolder/notePreviewComponent";
import { NoteObject } from "./noteContext";
import { useEffect, useState } from "react";
import { noteContext } from "./noteContext";
import { NoteTransmissionDatatype } from "./noteContext";

export const LOCAL_STORAGE_KEY: string = "Note";

function App() {
  const [noteFolderArray, setNoteFolderArray] = useState<NoteObject[]>([]);
  const [noteTransmissionData, setNoteTransmissionData] =
    useState<NoteTransmissionDatatype>({
      selectedNoteId: 0,
      inputField: "",
      textArea: "",
      newNote: false,
    });

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <NotePreviewComponent />,
      },

      {
        path: "create-note-component",
        element: <CreateNoteComponent />,
      },
    ],
    {
      basename: "/Notiz-App/",
    }
  );

  useEffect(() => {
    loadNoteFromStorage();
  }, []);

  function loadNoteFromStorage() {
    const getNoteFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (getNoteFromStorage !== null) {
      setNoteFolderArray([
        ...noteFolderArray,
        ...JSON.parse(getNoteFromStorage),
      ]);
    }
  }

  return (
    <div className="app-div">
      <noteContext.Provider
        value={{
          noteFolderArray,
          setNoteFolderArray,
          loadNoteFromStorage,
          noteTransmissionData,
          setNoteTransmissionData,
        }}
      >
        <RouterProvider router={router} />
      </noteContext.Provider>
    </div>
  );
  //
}

export default App;
