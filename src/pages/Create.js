import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import { fetchEdit, fetchAdd } from "../fetch";
import TextField from "@material-ui/core/TextField";
import {
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  makeStyles,
  FormControlLabel,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
const resultWrapper = {
  position: "absolute",
  marginTop: "-114px",
  marginLeft: "17px",
};
const styledDetails = {
  textColor: "white",
};

export default function Create(edit) {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState([]);
  const [customCategory, setCustomCategory] = useState([]);
  const createCustomCategories = () => {};
  useEffect(() => {
    if (edit.edit === "edit") {
      let id = history.location.pathname.split("/edit/")[1];
      fetch("http://localhost:8000/notes/" + id)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDetails(data.details);
          setCategory(data.category);
        });
    }
  }, []);
  useEffect(() => {
    let customCategories = [];
    let newCategories = []
    details.split(" ").map((item) => {
      if (
        item.startsWith("#") &&
        customCategories.indexOf(item.split("#")[1]) == -1 &&
        item.split("#")[1] !== ""
      ) {
        let customCategory = item.split("#")[1];
        customCategories.push(customCategory);
        newCategories.push(customCategory)
        setCategory(newCategories);
        setCustomCategory(customCategories);
     
      }
      if (item.split("#")[1] === "") {
        setCustomCategory(customCategories);
      }
    });
  }, [details, setCustomCategory, setCategory]);

  const highlightCategories = () => {
    if (details && category) {
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
      console.log(titleError);
    }
    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      if (edit.edit === "edit") {
        let id = history.location.pathname.split("/edit/")[1];

        fetchEdit({
          title: title,
          details: details,
          category: category,
          id: id,
        }).then(() => history.push("/"));
      } else {
        fetchAdd({ title, details, category }).then(() => history.push("/"));
      }
    }
  };

  return (
    <Container>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Create a New Note
      </Typography>

      <form novalidate autocomplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note title"
          color="primary"
          variant="outlined"
          value={title}
          fullWidth
          required
          error={titleError}
        ></TextField>

        <TextField
          onChange={(e) => {
            highlightCategories();
            createCustomCategories();
            setDetails(e.target.value);
          }}
          className={classes.field}
          label="Details . You can create tags with # sign  (ex. #home)"
          color="primary"
          variant="outlined"
          multiline
          rows={4}
          style={styledDetails}
          value={details}
          fullWidth
          required
          error={detailsError}
        ></TextField>
        <div class="result__wrapper" style={resultWrapper}>
          {details.split(" ").map((item) => {
            return (
              <>
                {category.indexOf(item) != -1 ? (
                  <span className="highlight">{item}</span>
                ) : (
                  <span>{item}</span>
                )}
              </>
            );
          })}
        </div>

        <FormControl className={classes.field}>
          <FormLabel>Note tag</FormLabel>
          <RadioGroup onChange={(e) => setCategory([e.target.value])}>
            {customCategory.map((item) => {
              return (
                <FormControlLabel
                  value={item}
                  control={<Radio disabled checked />}
                  label={item}
                />
              );
            })}
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel
              value="reminders"
              control={<Radio />}
              label="Reminder"
            />
            <FormControlLabel
              value="money"
              control={
                category.indexOf("money") != -1 ? <Radio checked /> : <Radio />
              }
              label="Money"
            />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="Secondary"
          endIcon={<ChevronRightOutlinedIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
