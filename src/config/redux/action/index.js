import firebase, { database } from "../../firebase";

export const changeLoading = (val) => (dispatch) => {
  setTimeout(() => {
    return dispatch({
      type: "CHANGE_LOADING",
      value: val,
    });
  }, 2000);
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: "CHANGE_LOADING",
      value: true,
    });
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log("success: ", res);
        dispatch({
          type: "CHANGE_LOADING",
          value: false,
        });
        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({
          type: "CHANGE_LOADING",
          value: false,
        });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: "CHANGE_LOADING",
      value: true,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log("success: ", res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
        };
        dispatch({
          type: "CHANGE_LOADING",
          value: false,
        });
        dispatch({
          type: "CHANGE_ISLOGIN",
          value: true,
        });
        dispatch({
          type: "CHANGE_USER",
          value: dataUser,
        });
        resolve(dataUser);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({
          type: "CHANGE_LOADING",
          value: false,
        });
        dispatch({
          type: "CHANGE_ISLOGIN",
          value: false,
        });
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.uid).push({
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromAPI = (id) => (dispatch) => {
  const url = database.ref("notes/" + id);
  return new Promise((resolve, reject) => {
    url.on("value", function (snapshot) {
      if (snapshot.val() === null) {
        alert("Note Kosong");
      } else {
        console.log("getData: ", snapshot.val());
        const data = [];
        Object.keys(snapshot.val()).map((key) => {
          data.push({
            id: key,
            data: snapshot.val()[key],
          });
        });
        dispatch({
          type: "SET_NOTES",
          value: data,
        });
        resolve(snapshot.val());
      }
    });
  });
};

export const updateDataFromAPI = (data) => (dispatch) => {
  const url = database.ref(`notes/${data.uid}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    url.set(
      {
        title: data.title,
        content: data.content,
        date: data.date,
      },
      (err) => {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataFromAPI = (data) => (dispatch) => {
  const url = database.ref(`notes/${data.uid}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    url.remove();
  });
};
