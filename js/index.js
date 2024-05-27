var produtNameInput = document.getElementById("productName");
var produtPriceInput = document.getElementById("productPrice");
var produtCategoryInput = document.getElementById("productCategory");
var produtDescriptionInput = document.getElementById("productDescription");
var produtImageInput = document.getElementById("productImage");

var saerchInput = document.getElementById("saerchInput");

var btnAdd =document.getElementById("btnAdd");
var btnUpdate =document.getElementById("btnUpdate");



var index=0

var productList=[];




if(localStorage.getItem("Products") !==null ){
   productList=JSON.parse(localStorage.getItem("Products"));
   displayData();
}

function addProduet() {
   if(validationName()== true &&
   validationPrice()==true&&
   validationCategory()==true&&
   validationDescription()==true
){
      console.log(produtImageInput.value);
      var product = {
      name: produtNameInput.value,
      price: produtPriceInput.value,
      category:produtCategoryInput.value,
      description: produtDescriptionInput.value,
      image: produtImageInput.files[0]?.name ? `images/Products/${produtImageInput.files[0]?.name}`:`images/Products/taxi.png`,
      };
      productList.push(product);
   
      displayData();
   
   localStorage.setItem("Products",JSON.stringify(productList));
   
      clearForm();
   }


}


function clearForm(){
   produtNameInput.value =null
   produtPriceInput.value=null
   produtCategoryInput.value=null
   produtDescriptionInput.value=null
   produtImageInput.value=null
   
   produtNameInput.classList.remove('is-valid')
   produtPriceInput.classList.remove('is-valid')
   produtCategoryInput.classList.remove('is-valid')
   produtDescriptionInput.classList.remove('is-valid')
   produtImageInput.classList.remove('is-valid')
}






function displayData(){
  
   var cartona = "";

   for(var i=0 ;i< productList.length; i++){
      cartona+=`
      <tr>
      <td>${i+1}</td>
      <td>${productList[i].name}</td>
      <td>${productList[i].price}</td>
      <td>${productList[i].category}</td>
      <td>${productList[i].description}</td>
      <td>
         <img width="100px" src=${productList[i].image} alt="product">
      </td>

      <td>
         <button onclick="visitWebsite(${i})" class="btn btn-outline-success btn-sm">visitWebsite</button>
         <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
         <button onclick="deletItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
      </td>
      </tr>`
   }



   document.getElementById("tabelData").innerHTML=cartona;
}



function setFormUpdate(indexElement){
   produtNameInput.value=productList[indexElement].name
   produtPriceInput.value=productList[indexElement].parse
   produtCategoryInput.value=productList[indexElement].category
   produtDescriptionInput.value=productList[indexElement].description


   btnAdd.classList.add('d-none');

   btnUpdate.classList.remove('d-none')


   index=indexElement
}

function updateData(){
   var product = {
      name: produtNameInput.value,
      price: produtPriceInput.value,
      category:produtCategoryInput.value,
      description: produtDescriptionInput.value,
      image: produtImageInput.files[0]?.name 
      ? `images/Products/${produtImageInput.files[0]?.name}`
      :`images/Products/taxi.png`,
      };
      productList.splice(index,1,product);

      displayData()
      clearForm()
      localStorage.setItem("Products",JSON.stringify(productList));
}

function deletItem(indexItem){
   productList.splice(indexItem,1);
   localStorage.setItem("Products",JSON.stringify(productList));
   displayData()
}



function visitWebsite() {
   var website = document.getElementById('websiteInput').value;
   if (website) {
       if (!/^https?:\/\//i.test(website)) {
           website = 'http://' + website;
       }
       window.location.href = website;
   } else {
       alert('يرجى إدخال عنوان موقع ويب صالح');
      }
}




function saerchItem(){
   var term =saerchInput.value;


   var cartona = "";

   for(var i=0 ;i< productList.length; i++){
         if(productList[i].name.toLowerCase().includes( term.toLowerCase()) == true) {
            cartona+=`
            <tr>
            <td>${i+1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td>
               <img width="100px" src=${productList[i].images} alt="product">
            </td>
      
            <td>
               <button onclick="visitWebsite(${i})" class="btn btn-outline-success btn-sm">visitWebsite</button>
               <button onclick="setFormUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
               <button onclick="deletItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
            </td>
            </tr>`
         }
   }
   document.getElementById("tabelData").innerHTML=cartona;
}



function validationName(){
   var text =produtNameInput.value;
   var regex = /^[A-Z][a-z]{2,8}$/
   
var msgNameElement = document.getElementById("msgName")

   if(regex.test(text) == true){
      produtNameInput.classList.add("is-valid")
      produtNameInput.classList.remove("is-invalid")
      msgNameElement.classList.add('d-none')
      return true;
   }
   else
   {
      produtNameInput.classList.add("is-invalid")
      produtNameInput.classList.remove("is-valid")
      msgNameElement.classList.remove('d-none')
      return false;
   }


}
function validationPrice(){
   var text =produtPriceInput.value;
   var regex = /^[1-9]{2,8}$/
   
var msgPriceElement = document.getElementById("msgPrice")

   if(regex.test(text) == true){
      produtPriceInput.classList.add("is-valid")
      produtNameInput.classList.remove("is-invalid")
      msgPriceElement.classList.add('d-none')
      return true;
   }
   else
   {
      produtPriceInput.classList.add("is-invalid")
      produtPriceInput.classList.remove("is-valid")
      msgPriceElement.classList.remove('d-none')
      return false;
   }


}
function validationCategory(){
   var text =produtCategoryInput.value;
   var regex = /^(tv|mobile|screens|electronic)$/i;
   
var msgCategoryElemsnt = document.getElementById("msgCategory")

   if(regex.test(text) == true){
      produtCategoryInput.classList.add("is-valid")
      produtNameInput.classList.remove("is-invalid")
      msgCategoryElemsnt.classList.add('d-none')
      return true;
   }
   else
   {
      produtCategoryInput.classList.add("is-invalid")
      produtCategoryInput.classList.remove("is-valid")
      msgCategoryElemsnt.classList.remove('d-none')
      return false;
   }


}
function validationDescription(){
   var text =produtDescriptionInput.value;
   var regex = /^.{3,}$/m;
   
var msgDescriptionElement = document.getElementById("msgDescription")

   if(regex.test(text) == true){
      produtDescriptionInput.classList.add("is-valid")
      produtNameInput.classList.remove("is-invalid")
      msgDescriptionElement.classList.add('d-none')
      return true;
   }
   else
   {
      produtDescriptionInput.classList.add("is-invalid")
      produtDescriptionInput.classList.remove("is-valid")
      msgDescriptionElement.classList.remove('d-none')
      return false;
   }


}
function validationImage(){
   var text =produtImageInput.value;
   
   
var masImageElment = document.getElementById("msgImage")

   if(regex.test(text) == true){
      produtImageInput.classList.add("is-valid")
      produtNameInput.classList.remove("is-invalid")
      masImageElment.classList.add('d-none')
      return true;
   }
   else
   {
      produtImageInput.classList.add("is-invalid")
      produtImageInput.classList.remove("is-valid")
      masImageElment.classList.remove('d-none')
      return false;
   }


}



