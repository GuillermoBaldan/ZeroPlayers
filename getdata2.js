const getBtn = document.getElementById("get-btn");

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.withCredentials = true;
    xhr.setRequestHeader(
      "token",
      "bearer - eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg2NTg3NDd9.9ebMdHDgH45DjA1G5D4KZVqaOTU0GFcu47alVjms2KgkzSdXFTN0DxjCSBzOYl9G1KxkmWNEJHDUhFsdid-SQQ"
    );
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg4MTQ5NTd9.B4Cv0TzM0v416jIzTxSm6Ix3kNNE-AJ-W9BWG-N6o4c_WuzsNQuyFDDLBaB8k049lJuSxiZbyNsh2Y41ViaRVw"
    );

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        console.log("reject");
        reject(xhr.response);
      } else {
        console.log("resolve");
        resolve(xhr.response);
      }
    };
    xhr.send(JSON.stringify(data));
    xhr.onerror = (err) => {
      console.log("Error");
      reject(err);
    };
  });
  return promise;
};

const getData = () => {
  sendHttpRequest("GET", "localhost:6001/usuarios/619420df977695930002adb6", {
    login: "Baldan",
    password: "Hero",
  }).then((responseData) => {
    console.log(responseData);
  });
};

getBtn.addEventListener("click", getData);
