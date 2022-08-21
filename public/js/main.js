const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');
const generatedDiv = document.getElementById('generated');
const modalContainer = document.getElementById('modal-container');
const modalBlur = document.getElementById('modal-blur');
const modal = document.getElementById('modal');


form.addEventListener("submit", async (e) => {
    e.preventDefault()
    submitBtn.disabled = true;
    const prevBtnStyle = submitBtn.classList;
    const prevBtnHTML = submitBtn.innerHTML;

    for(let className of prevBtnStyle) {
        submitBtn.classList.remove(className);
    }

    submitBtn.innerHTML = '<div class="loader" role="status" aria-hidden="true"></div>';
    const keyLength = document.getElementById('keylength').value;
    const url = `${window.location.href}generate`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            length: keyLength
        }),
    })
    const data = await response.json();

    if(data.success) {

    const { string } = data?.data;

    generatedDiv.innerHTML = string;
    submitBtn.disabled = false;
    submitBtn.classList = prevBtnStyle;
    submitBtn.innerHTML = prevBtnHTML;
    modalContainer.classList.remove("hidden");
    modal.classList.add("slide-in");
    modalBlur.classList.add("fade-in");
    } else {
        alert(data.message);
    }
})

const closeModal = () => {
    const modalContainer = document.getElementById('modal-container');
    const modalBlur = document.getElementById('modal-blur');
    const modal = document.getElementById('modal');

    modalBlur.classList.remove("fade-in");
    modalBlur.classList.add("fade-out");

    setTimeout(() => {
        modal.classList.remove("slide-in");
        modal.classList.add("slide-down");
        modalContainer.classList.add("hidden");
    }, 150)

}