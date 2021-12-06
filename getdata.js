let getBtn = document.getElementById("get-Btn");
let data = JSON.stringify({
  login: "Baldan",
  password: "Hero",
});

function sendData() {
  let xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("GET", "localhost:6001/usuarios/619420df977695930002adb6");
  xhr.setRequestHeader(
    "token",
    "bearer - eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg2NTg3NDd9.9ebMdHDgH45DjA1G5D4KZVqaOTU0GFcu47alVjms2KgkzSdXFTN0DxjCSBzOYl9G1KxkmWNEJHDUhFsdid-SQQ"
  );

  xhr.setRequestHeader(
    "Authorization",
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg3NjA4Nzh9.mlNCmTbEyliwcRJOiru-9WIdOSTIBTKQrk2O3gr6w5GhlzFtfuQSTqIwMSCvfVNoa756SbKh19a0yIGSxcInxA"
  );
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
  sendHttpRequest(
    "GET",
    "localhost:6001/usuarios/619420df977695930002adb6"
  ).then((responseData) => {
    console.log(responseData);
  });
}

const getData = () => {
  sendData().then((responseData) => {
    console.log(responseData);
  });
};

/* postBtn.addEventListener("click", sendData); */

document.addEventListener("DOMContentLoaded", function () {
  getBtn.addEventListener("click", function () {
    console.log("Hello");
    getData();
  });
});
sendData();
