import React, { Component } from "react";
import { connect } from "react-redux";
import { addDataToAPI } from "../../../config/redux/action";
import "./Dashboard.scss";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
  };

  handleSaveNotes = () => {
    const { title, content } = this.state;
    const { addDataToAPI, user } = this.props;
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      uid: user.uid,
    };
    addDataToAPI(data);
    console.log(data);
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  render() {
    const { title, content, date } = this.state;
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
          <button className="save-btn" onClick={this.handleSaveNotes}>
            Simpan
          </button>
        </div>
        <hr />
        <div className="card-content">
          <p className="title">Title</p>
          <p className="date">16 Nov 2020</p>
          <p className="content">Content Notes</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDataToAPI: (data) => dispatch(addDataToAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
