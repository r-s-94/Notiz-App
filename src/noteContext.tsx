import { createContext } from "react";

export interface NoteObject {
  headline: string;
  mainText: string;
  id: number;
  date: string;
}

export interface NoteTransmissionDatatype {
  selectedNoteId: number;
  inputField: string;
  textArea: string;
  newNote: boolean;
}

interface NoteFolderArrayDatatype {
  noteFolderArray: NoteObject[];
  setNoteFolderArray: (value: NoteObject[]) => void;
  loadNoteFromStorage: () => void;
  noteTransmissionData: NoteTransmissionDatatype;
  setNoteTransmissionData: (value: NoteTransmissionDatatype) => void;
}

export const noteContext = createContext<NoteFolderArrayDatatype>({
  noteFolderArray: [],
  setNoteFolderArray: () => {},
  loadNoteFromStorage: () => {},
  noteTransmissionData: {
    selectedNoteId: 0,
    inputField: "",
    textArea: "",
    newNote: false,
  },
  setNoteTransmissionData: () => {},
});
