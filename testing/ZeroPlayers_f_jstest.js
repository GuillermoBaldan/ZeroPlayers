let objectVariable = {
  message: "this is a message",
};

function modifyVariable(object) {
  object.message = "this is a modified message";
}

modifyVariable(objectVariable);
console.log(objectVariable.message);
