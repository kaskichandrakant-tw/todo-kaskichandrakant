let addTitle = function() {
  let xml = new XMLHttpRequest;
  xml.open('GET', '/addTodoTitle');
  xml.onload = function() {
    document.getElementById('allTodoLists').innerHTML = this.responseText;
    console.log(this.responseText);
  }
  xml.send();
};

let viewTodo = function(event) {
  let todoListId = event.target.parentElement.id
  let todoId = todoListId.split('_')[1];
  let xml = new XMLHttpRequest;
  xml.open('POST', '/getTodoItems');
  xml.onload = function() {
    document.getElementById(todoListId).innerHTML = this.responseText;
  }
  xml.send(`todoId=${todoId}`);
}

let addTask=function(event){
  let todoTaskId = event.target.parentElement.id;
  let taskId = todoTaskId.split('_')[1];
  let xml = new XMLHttpRequest;
  xml.open('POST', '/addTask');
  xml.onload = function() {
    document.getElementById(todoTaskId).innerHTML = this.responseText;
  }
  xml.send(`taskId=${taskId}`);
}


// let editTask=function(event){
//
// }
let deleteTodo=function(event){
  let taskId = event.target.id
  let task=taskId.split('_')[1];
  let listId = event.target.parentElement.id
  let list=listId.split('_')[1];
  let xml = new XMLHttpRequest;
  xml.open('POST', '/deleteTodo');
  xml.onload = function() {
    document.getElementById(`list_`+listId).innerHTML = this.responseText;
  }
  xml.send(`listId=${list}&taskId=${task}`)
}

//request(method,url,data,callback)





window.onload = addTitle;
