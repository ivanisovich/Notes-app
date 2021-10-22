
export const fetchDelete = async (id)=>{
  await fetch("http://localhost:8000/notes/" + id, {
    method: "DELETE",
  });
}

export const fetchEdit = async (item) => {
    await fetch("http://localhost:8000/notes/"+item.id, {
    method: "PUT",
    headers:{'Content-type':'application/json'},
    body: JSON.stringify(item)
  });
};
export const fetchAdd = async (item) =>{
    await fetch("http://localhost:8000/notes",{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(item)
      })
}
