import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import { doc, query,where ,getFirestore, setDoc,collection,getDocs, deleteDoc,updateDoc }from "firebase/firestore";

//import "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged, OperationType} from "firebase/auth";
import { async } from "@firebase/util";
const firebaseConfig = {
    apiKey: "AIzaSyBDbGoFwgAOJehpaBoJj4J3AEuCuaiX7N0",
    authDomain: "bccf-fec29.firebaseapp.com",
    projectId: "bccf-fec29",
    storageBucket: "bccf-fec29.appspot.com",
    messagingSenderId: "56021808508",
    appId: "1:56021808508:web:7c84ac420ad7984aa920f9",
    measurementId: "G-7LVD0LG45D"
  }
  
  // Initialize Firebase
const app= initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const database =getFirestore();
  var currentuser;
  //book appointment
  let current = new Date();
  let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;
  console.log(dateTime);
  //add an announcement
async function addannouncement()
{
  const announcement=doc(database,"announcements/"+document.getElementById("eventtitle")?.value);
    const data={
      date:document.getElementById("eventdate")?.value,
      eventname:document.getElementById("eventdetails")?.value,     
   }
   try{
   await setDoc(announcement,data);
   alert("Announcement succesfully added");
 }
 catch(e){
   alert(e);
 }
}
document.getElementById("createevent")?.addEventListener("click",addannouncement);
  //fetch announcements from database
  async function announce()
  {
    const querySnapshot = await getDocs(collection(database, "announcements"),where("date", "==",cDate));
   querySnapshot.forEach((doc) => {
    var announcement1title = document.createElement('dt'); 
    var announcement1titlenode= document.createTextNode(doc.id);
    announcement1title.appendChild(announcement1titlenode);
    var announcement1data = document.createElement('dd'); 
    var announcement1datanode= document.createTextNode("* "+doc.data().eventname);
    announcement1data.appendChild(announcement1datanode);
    document.getElementById("announcements")?.appendChild(announcement1title);
    document.getElementById("announcements")?.appendChild(announcement1data);
    console.log(doc.data().eventname);
   })
  }
  announce();
//book an appointment
 async function book() {
   //sort out time from and time to issue
   const querySnapshot = await getDocs(collection(database, "inventory"),where("appointmentdate", "==", document.getElementById("appointmentdate")?.value));
   const querySnapshot1 = await getDocs(collection(database, "inventory"),where("appointmentdate", "==", document.getElementById("appointmentdate")?.value));
   console.log(querySnapshot.appointmentdate)
   console.log(querySnapshot1.appointmenttime)
   if(querySnapshot==null&&querySnapshot1==null)
   {
    const appointment=doc(database,"appointments/"+currentuser);
    const data={
      reason:document.getElementById("reason")?.value,
      appointmenttime:document.getElementsByName("appointmenttime")[0]?.value,
      appointmentdate:document.getElementById("appointmentdate")?.value,     
   }
   try{
   await setDoc(appointment,data);
   alert("Appointment succesfully booked");
 }
 catch(e){
   alert(e);
 }
  }
   else{
    alert("That specific date and time is already booked");
  }}
  document.getElementById("appointmentbooked")?.addEventListener("click",book);
  //fetch the church inventory
  async function fetchinventory()
  {
    //create the inventory table and attach to div
let row_1 = document.createElement('tr');
let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');
let heading_1 = document.createElement('th');
heading_1.innerHTML = "Item name";
let heading_2 = document.createElement('th');
heading_2.innerHTML = "Condition";
let heading_3 = document.createElement('th');
heading_3.innerHTML = "Quantity";
row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
thead.appendChild(row_1);

  const querySnapshot = await getDocs(collection(database, "inventory"));
   querySnapshot.forEach((doc) => {
    const row1=document.createElement('tr');
    const data1=document.createElement('td');
    data1.innerHTML=doc.id;
    row1.appendChild(data1);
    const data2=document.createElement('td');
    data2.innerHTML=doc.data().condition;
    row1.appendChild(data2);
    const data3=document.createElement('td');
    data3.innerHTML=doc.data().quantity;
     row1.appendChild(data3);
    tbody.appendChild(row1);
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
table.appendChild(thead);
table.appendChild(tbody);
//add if checker if table is empty
// Adding the entire table to the body tag
document.getElementById('inventory')?.appendChild(table);
  }
fetchinventory();
  //selecting a CRUD operation
  function crud()
  {
  const operation=document.getElementsByName("selectedoperation")[0]?.value;
  console.log(operation+" opeRATION CALLED");
    if (operation=="Add")
    {
      console.log("Add called");
      var itemname = document.createElement('input');
      itemname.type = 'text';
      itemname.setAttribute("id","item");
      var itemlabel = document.createElement('p');
      const itemnode= document.createTextNode("Enter item name :");
      itemlabel.appendChild(itemnode);
      var space=document.createElement("br");
      var space1=document.createElement("br");
      var space2=document.createElement("br");
      var space3=document.createElement("br");
      var space4=document.createElement("br");
      var space5=document.createElement("br");
      var itemcondition = document.createElement('input');
      itemcondition.type = 'text';
      itemcondition.setAttribute("id","condition");
      var conditionlabel = document.createElement('p');
      const conditionnode= document.createTextNode("Enter item Condition :");
      conditionlabel.appendChild(conditionnode);
      var itemquantity = document.createElement('input');
      itemquantity.type = 'text';
      itemquantity.setAttribute("id","quantity");
      var quantitylabel = document.createElement('p');
      const quantitynode= document.createTextNode("Enter item quantity:");
      quantitylabel.appendChild(quantitynode);
      var additem=document.createElement('button');
      additem.id="additem";
      const additemnode=document.createTextNode("ADD ITEM");
      additem.appendChild(additemnode);
      //add operation to div tag
      document.getElementById("CRUD")?.appendChild(itemlabel);
      document.getElementById("CRUD")?.appendChild(itemname);
      document.getElementById("CRUD")?.appendChild(space);
      document.getElementById("CRUD")?.appendChild(space1);
      document.getElementById("CRUD")?.appendChild(conditionlabel);
      document.getElementById("CRUD")?.appendChild(itemcondition);
      document.getElementById("CRUD")?.appendChild(space2);
      document.getElementById("CRUD")?.appendChild(space3);
      document.getElementById("CRUD")?.appendChild(quantitylabel);
      document.getElementById("CRUD")?.appendChild(itemquantity);
      document.getElementById("CRUD")?.appendChild(space4);
      document.getElementById("CRUD")?.appendChild(space5);
      document.getElementById("CRUD")?.appendChild(additem);
      document.getElementById("additem")?.addEventListener("click",add);
    }
  else if (operation=="Delete")
    {
      window.alert("Enter the name of the item you want to delete");
      console.log("delete called");
      var itemname = document.createElement('input');
      itemname.type = 'text';
      itemname.setAttribute("id","item");
      var itemlabel = document.createElement('p');
      const itemnode= document.createTextNode("Enter item name to be deleted :");
      itemlabel.appendChild(itemnode);
      var space=document.createElement("br");
      var space1=document.createElement("br");
      var space2=document.createElement("br");
      var deleteitem=document.createElement('button');
      deleteitem.id="deleteitem";
      const deleteitemnode=document.createTextNode("DELETE ITEM");
      deleteitem.appendChild(deleteitemnode);
      //add operation to div tag
      document.getElementById("CRUD")?.appendChild(itemlabel);
      document.getElementById("CRUD")?.appendChild(itemname);
      document.getElementById("CRUD")?.appendChild(space);
      document.getElementById("CRUD")?.appendChild(space1);
      document.getElementById("CRUD")?.appendChild(deleteitem);
      document.getElementById("CRUD")?.appendChild(space2);
      document.getElementById("deleteitem")?.addEventListener("click",deleteinventoryitem);
    }
   else if (operation=="update")
    {
      alert("Enter the item name and updated item deatils note that you cannot deit the item name");
      console.log("Update called");
      var itemname = document.createElement('input');
      itemname.type = 'text';
      itemname.id = 'item';
      var itemlabel = document.createElement('p');
      const itemnode= document.createTextNode("Enter item name :");
      itemlabel.appendChild(itemnode);
      var space=document.createElement("br");
      var space1=document.createElement("br");
      var space2=document.createElement("br");
      var space3=document.createElement("br");
      var space4=document.createElement("br");
      var space5=document.createElement("br");
      var itemcondition = document.createElement('input');
      itemcondition.type = 'text';
      itemcondition.id = 'condition';
      var conditionlabel = document.createElement('p');
      const conditionnode= document.createTextNode("Enter item Condition :");
      conditionlabel.appendChild(conditionnode);
      var itemquantity = document.createElement('input');
      itemquantity.type = 'text';
      itemquantity.id = 'condition';
      var quantitylabel = document.createElement('p');
      const quantitynode= document.createTextNode("Enter item quantity:");
      quantitylabel.appendChild(quantitynode);
      var updateitem=document.createElement('button');
      const updateitemnode=document.createTextNode("UPDATE ITEM");
      updateitem.setAttribute("id","updateitem")
      updateitem.appendChild(updateitemnode);
      //add operation to div tag
      document.getElementById("CRUD")?.appendChild(itemlabel);
      document.getElementById("CRUD")?.appendChild(itemname);
      document.getElementById("CRUD")?.appendChild(space);
      document.getElementById("CRUD")?.appendChild(space1);
      document.getElementById("CRUD")?.appendChild(conditionlabel);
      document.getElementById("CRUD")?.appendChild(itemcondition);
      document.getElementById("CRUD")?.appendChild(space2);
      document.getElementById("CRUD")?.appendChild(space3);
      document.getElementById("CRUD")?.appendChild(quantitylabel);
      document.getElementById("CRUD")?.appendChild(itemquantity);
      document.getElementById("CRUD")?.appendChild(space4);
      document.getElementById("CRUD")?.appendChild(space5);
      document.getElementById("CRUD")?.appendChild(updateitem);
      document.getElementById("updateitem")?.addEventListener("click",add);
      
    }
   else if (operation=="refresh")
    {
      console.log("Refresh called");
      fetchinventory();
      //add function to refresh the table
    }
  }
document.getElementsByName("selectedoperation")[0]?.addEventListener("change",crud);
//update function
async function update(){
  console.log("Update function called");
  const updateinventory=doc(database,"inventory/"+document.getElementById("item")?.value);
  const data={
    condition: document.getElementById("condition")?.value,
    quantity: document.getElementById("quantity")?.value
   }
   try{
   await updateDoc(updateinventory,data);
   alert("Item succesfully updated");
 }
 catch(e){
  alert(e);
} 
}  
//add item to table 
  async function add()
  {
    console.log("Add function called");
    const addtoinventory=doc(database,"inventory/"+document.getElementById("item")?.value);
    const data={
      condition: document.getElementById("condition")?.value,
      quantity: document.getElementById("quantity")?.value
     }
     try{
     await setDoc(addtoinventory,data);
     alert("Item succesfully added");
   }
   catch(e){
    alert(e);
  }
  }
//listener for add placed on the creation panel since it doesnt exist when document is first called
async function deleteinventoryitem()
{
//ad a confirmation message for delete
  console.log("delete function called");
  const deleteinventory=doc(database,"inventory/"+document.getElementById("item")?.value);
   try{
   const snapshot=await deleteDoc(deleteinventory);
   if(snapshot.exists()){
   alert("Item succesfully added");
  }
  else{
    alert(document.getElementById("item")?.value+" "+"doesnt exist in the inventory");
  }
 }
 catch(e){
  alert(e);
}
}
//an update listener calling the add function
//sign up
const signupemail= async()=>
{
  var email = document.getElementById("uname");
  var password = document.getElementById("pass");
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      alert("SignUp Successfully");
      const user = userCredential.user;
      console.log(user.user);
      window.location.href = "./home.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + "  " + errorMessage);
      // ..
    });
} 
document.getElementById("signup")?.addEventListener("click",signupemail); 
  // SignIN function
const loginemail= async()=>
{
var email = document.getElementById("uname");
var password = document.getElementById("pass");
await signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    alert("Sign in Successful");
    const user = userCredential.user;
    console.log(user.user);
    window.location.href = "./home.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + "  " + errorMessage);
  });
}
document.getElementById("login")?.addEventListener("click",loginemail);   
  
  // SignOut
  const signout=async()=>
  {
    await auth.signOut();
    alert("SignOut Successfully from System");
    window.location.href = "./index.html";
  }
  document.getElementById("signout")?.addEventListener("click",signout);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentuser=user.email;
      console.log("user signed in");
      // ...
    } else {
      console.log("user signed out");
      // User is signed out
      // ...
    }
  });
