// contains code related to clearing local storage

function clearLocal() {
    if(!confirm("This action will clear locally saved packages. Are you sure you would like to continue?")){
        return;
    }
    localStorage.setItem('packages',JSON.stringify([]));

    recentPackages.innerHTML = "";

    alert("Local Storage Cleared!")
}

