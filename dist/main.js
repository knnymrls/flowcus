(()=>{"use strict";class e{static currentId=1;constructor(t,n,d,i,o){this.id=e.currentId++,this.name=t,this.description=n,this.due=d,this.priority=i,this.state=o}editTodo(e,t,n,d,i){this.name=e,this.description=t,this.due=n,this.priority=d,this.state=i}}function t(){const e=document.getElementById("tasksContainer");e.innerHTML="",i.forEach((t=>{e.appendChild(function(e){const t=document.createElement("div");return t.innerHTML=`\n    <div class="card ${e.id}">\n    <div class="card-main-info">\n        <p class="card-name">${e.name}</h3>\n        <p class="card-date">${n=e.due,n?new Date(n).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):""}</p>\n    </div>\n        <p>Priority: ${e.priority}</p>\n        <button class="delete-button" data-task-id="${e.id}">Delete</button>\n        <button class="edit-button" data-task-id="${e.id}">&#x270F;</button>\n    </div>\n    `,t;var n}(t))})),document.querySelectorAll(".delete-button").forEach((e=>{e.addEventListener("click",(function(){var e;e=parseInt(this.getAttribute("data-task-id")),i=i.filter((t=>t.id!==e)),o(),t()}))})),document.querySelectorAll(".edit-button").forEach((e=>{e.addEventListener("click",(function(){!function(e){const t=i.find((t=>t.id===e));t&&(function(e){document.getElementById("edit-taskId").value=e.id,document.getElementById("edit-name").value=e.name,document.getElementById("edit-description").value=e.description,document.getElementById("edit-due").value=e.due,document.querySelectorAll(`input[name="edit-priority"][value="${e.priority}"]`).forEach((e=>{e.checked=!0})),document.querySelectorAll(`input[name="edit-state"][value="${e.state}"]`).forEach((e=>{e.checked=!0}))}(t),document.getElementById("edit-modal").style.display="block")}(parseInt(this.getAttribute("data-task-id")))}))}))}function n(){document.getElementById("add-modal").style.display="none"}function d(){document.getElementById("edit-modal").style.display="none"}document.getElementById("button-add-todo").addEventListener("click",(function(){document.getElementById("add-modal").style.display="block"})),document.getElementById("close-modal").addEventListener("click",n),document.getElementById("close-modal").addEventListener("click",d),document.getElementById("add-form").addEventListener("submit",(function(d){d.preventDefault(),function(n,d,a,c,u){const l=new e(n,d,a,c,u);i.push(l),o(),t()}(document.getElementById("add-name").value,document.getElementById("add-description")?.value||"",document.getElementById("add-due").value,document.querySelector('input[name="priority"]:checked')?.value||"None",document.querySelector('input[name="state"]:checked')?.value||"None"),n(),this.reset()})),document.getElementById("edit-form").addEventListener("submit",(function(e){e.preventDefault();const n=parseInt(document.getElementById("edit-taskId").value),a=document.getElementById("edit-name").value,c=document.getElementById("edit-description")?.value,u=document.getElementById("edit-due").value,l=document.querySelector('input[name="priority"]:checked')?.value,r=document.querySelector('input[name="state"]:checked')?.value;!function(e,n,d,a,c,u){i.find((t=>t.id==e)).editTodo(n,d,a,c,u),o(),t()}(n,a,c,u,l,r),d()})),document.addEventListener("click",(e=>{e.target===document.getElementById("add-modal")&&n(),e.target===document.getElementById("edit-modal")&&d()}));let i=[];function o(){localStorage.setItem("tasks",JSON.stringify(i))}!function(){const n=localStorage.getItem("tasks");n&&(i=JSON.parse(n).map((t=>new e(t.name,t.description,t.due,t.priority,t.status))),t())}()})();