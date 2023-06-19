const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');
if(objStr!=null)
{
    userArray = JSON.parse(objStr);
}
DispalyInfo();
addUserBtn.onclick=()=>{
    const name = usernameTextField.value;
    console.log(name);
    if(edit_id!= null){
        //edit
        userArray.splice(edit_id,1,{'name' : name});
        edit_id = null;
    }
    else{
        //insert
        userArray.push({'name' : name})
    }
   
    //console.log(userArray);
    SaveInfo(userArray);
    usernameTextField.value = '';
    addUserBtn.innerText = btnText;
}

function SaveInfo(userArray){
    let str = JSON.stringify(userArray)
    localStorage.setItem('users', str)
    DispalyInfo();

}
function DispalyInfo(){
let statement = '';
userArray.forEach((user,i) => { 
    statement += `<tr>
                        <th scope="row">${i+1}</th><td>${user.name}</td>
                            <td><i class="fa fa-edit" style="font-size:28px;color:rgb(62, 85, 185)" onclick='EditInfo(${i})'></i>
                                <i class="fa fa-trash-o" style="font-size:28px;color:rgb(212, 41, 84)" onclick='deleteInfo(${i})'></i>
                            </td>
                    </tr>`;
 });
 
recordDisplay.innerHTML = statement;
}

function EditInfo(id){
// alert(id);
edit_id = id;
usernameTextField.value = userArray[id].name;
addUserBtn.innerText = 'Save Changes';
}
function deleteInfo(id){
// alert(id);
userArray.splice(id,1)
SaveInfo(userArray);
// DispalyInfo();
}