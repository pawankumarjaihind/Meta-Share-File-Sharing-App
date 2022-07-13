
const dropZone = document.querySelector(".drop-zone");
const fileInput = document.querySelector("#fileInput");
const browseBtn = document.querySelector(".browseBtn");


const progressContainer = document.querySelector(".progress-container");
const bgProgress = document.querySelector(".bg-progress");
const percentDiv = document.querySelector("#percent");
const progressBar = document.querySelector(".progress-bar");

const sharingContainer = document.querySelector(".sharing-container");

const fileURL = document.querySelector("#fileURL");
const copyBtn = document.querySelector("#copyBtn");

const toast = document.querySelector(".toast");

// const APP_BASE_URL = "http://localhost:3000";
// const APP_BASE_URL = "pawan-metashare.herokuapp.com"
// const host = APP_BASE_URL;
// const uploadURL = `${host}/api/files`;
const uploadURL = `/api/files`;

const maxAllowedSize = 100 * 1024 * 1024;

dropZone.addEventListener("dragover",(e)=>{
    e.preventDefault();
    if(!dropZone.classList.contains("dragged")){
        console.log("dragging");
    }

});

dropZone.addEventListener("dragleave",()=>{
    dropZone.classList.remove("dragged");
});


dropZone.addEventListener("drop",(e)=>{
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files  = e.dataTransfer.files;
    if(files.length){
        fileInput.files = files;
        uploadFile();
    }
});

fileInput.addEventListener('change',()=>{
    uploadFile();
})

browseBtn.addEventListener("click",()=>{
    fileInput.click();
})

copyBtn.addEventListener("click",()=>{
    fileURL.select();
    document.execCommand("copy"); 
    showToast("Link copied");
})

const uploadFile = ()=>{
    if(fileInput.files.length > 1){
        resetFileInput();
        showToast("Only upload one file");
        return ;
    }
    const file = fileInput.files[0];
    if(file.size > maxAllowedSize){
        showToast("Not allowed to upload file of size > 100MB");
        resetFileInput();
        return ;
    }

    progressContainer.style.display = "block";

    const formData = new FormData();
    formData.append("myfile",file);

    const xhr = new XMLHttpRequest();

    // console.log("pawan");
    
    xhr.upload.onprogress = updateProgress;


    xhr.upload.onerror = function () {
        showToast(`Error in upload : ${xhr.status}`);
        fileInput.value= "";
    }

    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE){
            console.log("pawan2");
            console.log(xhr.responseText);
            showLink(xhr.responseText);
        }
    };

    // xhr.upload.onprogress = updateProgress;

    xhr.open("POST",uploadURL);
    xhr.send(formData);
}

const updateProgress = (e)=>{
    const percent = Math.round((e.loaded)/(e.total)*100);
    console.log(percent);
    bgProgress.style.width = `${percent}%`;
    percentDiv.innerText = percent;
    progressBar.style.transform = `scaleX(${percent/100})`;
}; 

const resetFileInput = () =>{
    fileInput.value = "";
}

const showLink = (res)=>{
    fileInput.value = "";
    const {file : url} = JSON.parse(res);
    console.log(url);
    progressContainer.style.display = "none";
    sharingContainer.style.display = "block";
    fileURL.value = url;
}

let toastTimer;

const showToast = (msg) =>{
    clearTimeout(toastTimer);

    toast.innerText = msg;
    toast.classList.add("show");
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    },2000);
}