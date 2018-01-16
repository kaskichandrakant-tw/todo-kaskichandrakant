let viewTodo=()=>{
  let loadData=()=>{
    console.log('----->',this.responseText);
  }
  let xml=new XMLHttpRequest();
  xml.addEventListener('load',loadData);
  xml.open('GET','/viewTodo')
  xml.send();
}
window.onload=viewTodo;
