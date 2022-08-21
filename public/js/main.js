const form = document.getElementById("form");
const submitBtn = document.getElementById("submit-btn");
const loaderContainer = document.getElementById("loader-container");
const generatedOutput = document.getElementById("generated-output");
const modalContainer = document.getElementById('modal-container');
const modalBlur = document.getElementById('modal-blur');
const modal = document.getElementById('modal');
const copyBtn = document.getElementById('copy-btn');

copyBtn.onclick = () => {
    const result = generatedOutput.innerText;
    navigator.clipboard.writeText(result).then(() => {
        alert("Copied to clipboard!");
    }).catch(err => {
        alert("Could not copy to clipboard");
    })
}

form.onsubmit = async (e) => {
    e.preventDefault();
    startLoading();

    try {
        const string = await makeApiCall();
        openModal(string);
    } catch (error) {
        alert(error?.message);
    } finally {
        stopLoading();
    }

}

const startLoading = () => {
    submitBtn.disabled = true;
    submitBtn.classList.add("hidden")
    loaderContainer.classList.remove("hidden");
}

const stopLoading = () => {
    submitBtn.disabled = false;
    submitBtn.classList.remove("hidden");
    loaderContainer.classList.add("hidden");
}

const openModal = (string) => {
    modalContainer.classList.remove("hidden");
    modal.classList.remove("slide-down");
    modalBlur.classList.remove("fade-out");
    modal.classList.add("slide-up");
    modalBlur.classList.add("fade-in");
    generatedOutput.innerHTML = string;
}

const closeModal = () => {
    modal.classList.remove("slide-up");
    modalBlur.classList.remove("fade-in");
    modal.classList.add("slide-down");
    modalBlur.classList.add("fade-out");
    setTimeout(() => {
        modalContainer.classList.add("hidden");
    }, 250);
}

const makeApiCall = async () => {
    const keyLength = document.getElementById('keylength').value;
    const url = `${window.location.href}generate`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            length: keyLength
        }),
    })
    const data = await response.json();

    if (response.ok) {
        const {string} = data?.data;
        return string;
    } else {
        alert(data.message);
    }
}