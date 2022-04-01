function changeLayout(newMainBg, newTitle, newBlock){
    document.getElementById('mainBg').style.backgroundColor = newMainBg;
    document.getElementById("mainOverlay").style.backgroundColor = newMainBg;
    document.getElementById("mainOverlay").style.opacity = '0.7';
    document.getElementById("mainOverlay").style.zIndex = '2';
    document.getElementById("title").style.zIndex = '11';
    document.getElementById("title").textContent = newTitle;
    document.getElementById(newBlock).style.zIndex = '10';
}

function returnLayout(newBlock){
    document.getElementById("mainBg").style.backgroundColor = '#060606';
    document.getElementById("mainOverlay").style.backgroundColor = '#060606';
    document.getElementById("mainOverlay").style.opacity = '0';
    document.getElementById("mainOverlay").style.zIndex = '0';
    document.getElementById("title").style.zIndex = '11';
    document.getElementById("title").textContent = "проекты и сюжеты";
    document.getElementById(newBlock).style.zIndex = '1';
}
