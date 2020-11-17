import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  addDataToAPI,
  deleteDataFromAPI,
  getDataFromAPI,
  updateDataFromAPI,
} from "../../../config/redux/action";
import "./Dashboard.scss";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Simpan",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getDataFromAPI(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { addDataToAPI, user, updateDataFromAPI } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      // uid: user.uid,
      uid: userData.uid,
    };
    if (textButton === "Simpan") {
      addDataToAPI(data);
    } else {
      data.noteId = noteId;
      updateDataFromAPI(data);
    }
    console.log(data);
    this.setState({
      title: "",
      content: "",
      date: "",
      textButton: "Simpan",
      noteId: "",
    });
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      date: new Date().getDate(),
      textButton: "Update",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      date: "",
      textButton: "SIMPAN",
      noteId: "",
    });
  };

  deleteNote = (e, note) => {
    const { deleteDataFromAPI } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    e.stopPropagation();
    const data = {
      uid: userData.uid,
      noteId: note.id,
    };
    deleteDataFromAPI(data);
  };

  render() {
    const { title, content, date, textButton } = this.state;
    const { updateNotes } = this;
    const { notes } = this.props;
    console.log(notes);
    return (
      <div className="container">
        <div className="input-form">
          <input
            placeholder="Title"
            className="input-title"
            value={title}
            onChange={(e) => this.onInputChange(e, "title")}
          />
          <textarea
            placeholder="Content Notes"
            className="input-content"
            value={content}
            onChange={(e) => this.onInputChange(e, "content")}
          ></textarea>
          <div className="action-wrapper">
            {textButton === "Update" ? (
              <button className="save-btn cancel" onClick={this.cancelUpdate}>
                Cancel
              </button>
            ) : null}
            <button className="save-btn" onClick={this.handleSaveNotes}>
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => this.deleteNote(e, note)}
                  >
                    x
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notes: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDataToAPI: (data) => dispatch(addDataToAPI(data)),
    getDataFromAPI: (data) => dispatch(getDataFromAPI(data)),
    updateDataFromAPI: (data) => dispatch(updateDataFromAPI(data)),
    deleteDataFromAPI: (data) => dispatch(deleteDataFromAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
