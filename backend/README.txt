Resumen de hoy
1)Creamos el usuario a través de la petición POST localhost:Puerto/usuarios
mandamos:
json:
{
    "login" : "NombreDeLogin",
    "password" : "passworDeUsuario",
    "nombre" : "NombreDeUsuario",
    "correoE" : "correoEDeUsuario"
}
2) Generamos el token a través de la petición POST localhost:puerto/login 
(el profe tiene el puerto 6001)
mandamos:
 un json:
{
    "login" : "NombreDeLogin",
    "password" : "passworddeusuario"
    
}
Recibimos:
{

    "jwt": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0MjBkZjk3NzY5NTkzMDAwMmFkYjYiLCJsb2dpbiI6IkJhbGRhbiIsInJvbCI6IkNMSUVOVEUiLCJtb3ZpZGEiOiJBQkNERUYiLCJpYXQiOjE2Mzg0ODQzNTN9.BuVjaFD2ZqmJraiH9YEMBMb5Zhplyiq4NG5hpwXEeL60MCLc-RnPNHn7xN3Z3_fKIpxw0MdccfuuKxofisUPpA",
    "usuario": {
        "_id": "idDeEjemplo",
        "nombre": "NombreDeUsuario",
        "login": "NombreDeLogin",
        "idioma": "ES",
        "direccion": null,
        "correoE": "correoEDeUsuario",
        "telefono": null,
        "rol": "CLIENTE"
    }
}
3)Editamos el usuario
Mandamos:
-token en formato bearer en Autorización
-json:
Tenemos que mandar obligatoriamente los campos de dirección y telefono y luego los campos que queremos editar
Recibimos:
{
    "codigo": 200,
    "mensaje": "El usuario se modificó correctamente"
}
