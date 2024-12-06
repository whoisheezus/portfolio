const morphDuration = 600; // Длительность анимации морфинга

function morphText(newText) {
    const title = document.getElementById("title");
    const titleMorph = document.getElementById("title-morph");

    // Устанавливаем текст для анимации
    titleMorph.textContent = newText;

    // Начинаем морфинг — показываем новый текст с плавной анимацией
    titleMorph.style.opacity = "1";
    title.style.opacity = "0";

    // После завершения анимации меняем текст окончательно
    setTimeout(() => {
        title.textContent = newText;
        title.style.opacity = "1";
        titleMorph.style.opacity = "0";
    }, morphDuration);
}

function changeLayout(newMainBg, newTitle, newBlock) {
    document.getElementById("mainBg").style.backgroundColor = newMainBg;
    document.getElementById("mainOverlay").style.backgroundColor = newMainBg;
    
    // Плавно показываем overlay
    document.getElementById("mainOverlay").style.opacity = "0.7";
    document.getElementById("mainOverlay").style.zIndex = "2";

    // Меняем текст с морфингом
    document.getElementById("title").style.zIndex = "11";
    morphText(newTitle);
    document.getElementById(newBlock).style.zIndex = "10";
}

function returnLayout(newBlock) {
    // Скрываем overlay с плавной анимацией
    document.getElementById("mainOverlay").style.opacity = "0";
    document.getElementById("mainOverlay").style.zIndex = "0";

    // Возвращаем исходный текст с морфингом
    morphText("projects + studies");
    document.getElementById(newBlock).style.zIndex = "1";
}
