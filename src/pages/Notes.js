import React, { useEffect } from "react";
import { useState } from "react";
import NoteCard from "../components/NoteCard";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { fetchDelete } from "../fetch";
import "../index.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const handleDelete = async (id) => {
    fetchDelete(id);
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
    setFilteredNotes(newNotes);
  };
  const filterCategories = (value) => {
    let filtered = [];
    notes.forEach((item) => {
      item.category.forEach((data) => {
        if (data.includes(value)) {
          filtered.push(item);
        }
      });
    });
    setFilteredNotes(filtered);
    filtered = [];
  };
  const handleSearchCategory = (value) => {
    setSearchActive(true);
    filterCategories(value);
  };

  const noteList = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  };
  return (
    <Container>
      <TextField
        onChange={(e) => handleSearchCategory(e.target.value)}
        label="search for tags"
        color="primary"
        variant="outlined"
      ></TextField>
      <div style={noteList}>
        {searchActive ? (
          <>
            {filteredNotes.map((note, index) => (
              <NoteCard key={index} note={note} handleDelete={handleDelete} />
            ))}
          </>
        ) : (
          <>
            {notes.map((note, index) => (
              <NoteCard key={index} note={note} handleDelete={handleDelete} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
}
