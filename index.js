// 2nd

const loadphone = async(searchText,isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();

    const phones = data.data;
    // console.log(phones);
    displayphone(phones,isShowAll);
}


// 3rd 

const displayphone = (phones,isShowAll)=>{
    // console.log(phones);
// step-one
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length>10 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log(phones.length); 

   if(!isShowAll){
    phones = phones.slice(0,10);
   }

    phones.forEach(phone=>{
        //  console.log(phone);
// step two 
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card bg-gray-100 p-4  shadow-xl `;
// step three
        phoneCard.innerHTML = `<figure>
              <img
                src="${phone.image}"
                alt="Phone"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>${phone.brand}</p>
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
              </div>
            </div>`

    // step four
    phoneContainer.appendChild(phoneCard);
    }) 
    toggleLoadingSpinner(false);
}

//seacrh button  1st
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
   const searchField = document.getElementById('search-field');
   const searchText = searchField.value ;
//    console.log(searchText);
   loadphone(searchText ,isShowAll);
}

const toggleLoadingSpinner =(isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading)
    loadingSpinner.classList.remove('hidden');
    else{
    loadingSpinner.classList.add('hidden');
}
}

const handleShowAll = ()=>{
    handleSearch(true);
}

const handleShowDetails = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    // console.log('showdeatails',id)
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone)=>{

    console.log(phone);
    const phoneName = document.getElementById('deatil-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-info');
    showDetailsContainer.innerHTML=
    `
    <img src="${phone.image}"alt=""/>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Chipset:</span>${phone?.mainFeatures?.chipSet}</p>
       <p><span>Release Date:</span>${phone?.releaseDate
       }</p>
       <p><span>Slug:</span>${phone?.slug
       }</p>

    <p><span>GPS:</span>${phone?.others?.GPS}</p> 
    `


    show_details_modal.showModal();
}
