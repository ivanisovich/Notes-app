import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { TextField } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DeleteOutlined, Edit } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import { red, blue, green, pink, yellow } from "@material-ui/core/colors";
import { useHistory, useLocation } from "react-router-dom";
const flexCategoriesContainer = {
  display: "flex",
  flexDirection: "row",
  padding: 0,
  justifyContent: "center",
  flexWrap: "wrap",
  minHeight: "50px",
  maxHeight: "90px",
  overflow: "hidden",
};
const listItem = {
  backgroundColor: blue[500],
  color: "white",
  borderRadius: "2px",
  margin: "3px",
  width: "auto",
  border: "1px solid white",
  textTransform: "capitalize",
  textAlign: "left",
};
const cardDetails = {
  minHeight: "3vw",
  maxHeight: "3vw",
};
const styledCard = {
  margin: "1vw",
  width: "15vw",
};
const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category == "work") {
        return yellow[700];
      }
      if (note.category == "reminders") {
        return red[700];
      }
      if (note.category == "money") {
        return green[500];
      }
      if (note.category == "todos") {
        return pink[500];
      } else {
        return blue[500];
      }
    },
  },
});

export default function NoteCard({ note, handleDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles(note);
  const history = useHistory();


  return (
    <Card elevation={2} style={styledCard}>
      <List style={flexCategoriesContainer}>
        {note.category.map((item, index) => {
          return (
            
            <ListItem key={index} style={listItem}>
              {item}
            </ListItem>
          );
        })}
      </List>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category[0] ? note.category[0][0].toUpperCase() : ""}
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>

            <List>
              <ListItem
                onClick={() => {
                  history.push("/edit/" + note.id);
                }}
              >
                <Edit></Edit>
              </ListItem>
            </List>
          </>
        }
        title={note.title}
      />

      <CardContent>
        {isEditing ? (
          <TextField
            className={classes.field}
            label="Note Title"
            color="primary"
            variant="outlined"
            fullWidth
            required
          />
        ) : (
          ""
        )}
        <Typography
          style={cardDetails}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
}
