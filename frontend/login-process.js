var data = JSON.stringify({
    "jwt": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjNhNjE1ZmUwZGJlY2EzMDQyY2I5YTQiLCJsb2dpbiI6IkRhdmlkIiwicm9sIjoiQ0xJRU5URSIsIm1vdmlkYSI6IkFCQ0RFRiIsImlhdCI6MTY0Nzk5MzIwNn0.4kZCS5Emq38tK_1Z6sxqxdDw8hpiwT85my4fQ9Tb8M9u7RgeQZANCnxl3KWQ040ekKFpGNPvruU5Qgcbij-1WA",
    "usuario": {
      "_id": "623a615fe0dbeca3042cb9a4",
      "login": "David",
      "nombre": "DavidCopperfield",
      "correoE": "dcopperfield@yahoo.es",
      "rol": "CLIENTE"
    }
  });
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("GET", "http://localhost:3000/");
  xhr.setRequestHeader("token", "bearer - eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg2NTg3NDd9.9ebMdHDgH45DjA1G5D4KZVqaOTU0GFcu47alVjms2KgkzSdXFTN0DxjCSBzOYl9G1KxkmWNEJHDUhFsdid-SQQ");
  xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg4MTQ5NTd9.B4Cv0TzM0v416jIzTxSm6Ix3kNNE-AJ-W9BWG-N6o4c_WuzsNQuyFDDLBaB8k049lJuSxiZbyNsh2Y41ViaRVw");
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);