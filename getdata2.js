/* const getBtn = document.getElementById("get-btn");

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.withCredentials = true;
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
 */
var data = JSON.stringify({
  login: "Baldan",
  password: "Hero",
});

var xhr = new XMLHttpRequest();
//xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(xhr.responseText);
  }
});

xhr.open("GET", "http://localhost:6001/usuarios/619420df977695930002adb6");
xhr.setRequestHeader(
  "token",
  "bearer - eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg2NTg3NDd9.9ebMdHDgH45DjA1G5D4KZVqaOTU0GFcu47alVjms2KgkzSdXFTN0DxjCSBzOYl9G1KxkmWNEJHDUhFsdid-SQQ"
);
xhr.setRequestHeader(
  "Authorization",
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg4MTQ5NTd9.B4Cv0TzM0v416jIzTxSm6Ix3kNNE-AJ-W9BWG-N6o4c_WuzsNQuyFDDLBaB8k049lJuSxiZbyNsh2Y41ViaRVw"
);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.send(data);
