import person_role from './data.js';

$(document).ready(function () {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $("#reset");
    var audio = document.getElementById("background-audio");
    var isEnvelopeOpened = false;
    var isImageZoomed = false;

    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    const closeModal = document.getElementsByClassName("close-modal")[0];

    envelope.click(function () {
        if (!envelope.hasClass("open")) {
            openEnvelope();
            audio.play(); 
        } else if (!isImageZoomed) {
            $('.letter-image').click();
        }
    });

    function openEnvelope() {
        envelope.addClass("open").removeClass("close");
    }

    function closeEnvelope() {
        envelope.addClass("close").removeClass("open");
        audio.currentTime = 0; 
    }

    function stopAudio() {
        audio.pause();
        audio.currentTime = 0;
    }

  
    $('.letter-image').click(function () {
        if (!isImageZoomed) {
            modal.style.display = "block";
            modalImg.src = this.src;
            isImageZoomed = true;

            closeModal.style.display = "none";
        }
    });

    function closeModalImage() {
        modal.style.display = "none";
        isImageZoomed = false;
        closeEnvelope();
    }

    closeModal.onclick = function () {
        closeModalImage();
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModalImage();
        }
    }
});

let stepIndex = 0;
let userName = ""; 
let roles = null;

const steps = [
    {
        image: './assets/hi.webp',
        textbox: null,
        text: null
    },
    {
        image: './assets/hello.webp',
        textbox: './assets/textbox.png',
        text: 'Tớ là trợ lý của Tâm Bình, rất vui được gặp bạn!'
    },
    {
        image: './assets/think.webp',
        textbox: './assets/textbox.png',
        text: 'Nhưng trước hết, tớ có thể biết tên của bạn không?'
    },
    {
        image: './assets/pls.webp',
        textbox: null,
        text: null
    }, 
    {
        image: './assets/suprise.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/love.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/confuse.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/haha.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/like.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/nice.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/pls.webp',
        textbox: './assets/textbox.png',
        text: null
    },
    {
        image: './assets/love.webp',
        textbox: './assets/textbox.png',
        text: null
    }
];

function toTitleCase(str) {
  return str
    .toLowerCase() // Bước 1: chuyển về chữ thường
    .split(' ')    // Bước 2: tách từng từ
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // viết hoa chữ đầu
    .join(' ');    // Nối lại thành chuỗi
}

function showFullIntro(steps) {
    const overlay = document.getElementById("fullIntroOverlay");
    const image = document.getElementById("mainImage");
    const textbox = document.getElementById("textboxImage");
    const textboxWrapper = document.getElementById("textboxWrapper");
    const textboxText = document.getElementById("textboxText");
    const inputWrapper = document.getElementById("inputWrapper");
    const userInput = document.getElementById("userInput");
    const submitInput = document.getElementById("submitInput");

    let isNameEntered = false; // Trạng thái kiểm tra tên đã nhập

    function updateStep(index) {
        if (index >= steps.length) {
            overlay.style.display = 'none';
            return;
        }

        const step = steps[index];

        if (index === 3) {
            // Hiển thị hộp thoại nhập thông tin
            textboxWrapper.classList.add('hidden');
            inputWrapper.classList.remove('hidden');
            submitInput.onclick = () => {
                userName = userInput.value.trim();

                roles = person_role[userName.toLowerCase()] || ["bạn", "tớ"];
                console.log(`Role: ${roles[0]}, Bot: ${roles[1]}`);
                userName = toTitleCase(userName); // Chuyển tên thành chữ hoa đầu dòng

                if (userName) {
                    isNameEntered = true;
                    inputWrapper.classList.add('hidden');
                    textboxWrapper.classList.remove('hidden');
                    if (roles[0] === 1) {
                        steps[4].text = `Ỏ, ra là người đặc biệt sao? Rất vui được gặp bạn!`;
                        steps[5].text = `Bình có bảo rằng ${userName} sẽ là khách quý đó!`;
                        steps[6].text = `Mà tớ định thông báo cho ${userName} cái gì thế nhỉ?`
                        steps[7].text = `Đùa thôi, tớ nhớ ra rồi!`;
                        steps[8].text = `8/6 này, sẽ là ngày tốt nghiệp của Bình, sẽ rất tuyệt nếu ${userName} có thể góp mặt đó!!!`
                        steps[9].text = `Bình có đính kèm thiệp mời sau dành cho ${userName} này.`;
                        steps[10].text = `Do số lượng sinh viên sẽ khá đông, nên ${userName} hãy thông báo trước về thời gian đến cho Bình nhé`;
                        steps[11].text = `Cảm ơn ${userName} rất nhiều vì đã dành thời gian xem Bình làm trò con bò này :))`;
                        steps[11].image = './assets/iloveu.webp';
                    }
                    else {
                        steps[4].text = `Ỏ, ra là ${roles[0]} ${userName} hả? Rất vui được gặp ${roles[0]}!`;
                        steps[5].text = `Bình có bảo rằng ${roles[0]} sẽ là khách quý đó!`;
                        steps[6].text = `Mà ${roles[1]} định thông báo ${roles[0]} cái gì thế nhỉ?`
                        steps[7].text = `Đùa thôi, ${roles[1]} nhớ ra rồi!`;
                        steps[8].text = `8/6 này, sẽ là ngày tốt nghiệp của Bình, sẽ rất tuyệt nếu ${roles[0]} có thể góp mặt đó!!!`                        
                        steps[9].text = `Bình có đính kèm thiệp mời sau dành cho ${roles[0]} này.`;
                        steps[10].text = `Do số lượng sinh viên sẽ khá đông, nên ${roles[0]} hãy thông báo trước về thời gian đến cho Bình nhé`;
                        steps[11].text = `Cảm ơn ${roles[0]} rất nhiều vì đã dành thời gian xem Bình làm trò con bò này :))`;
                    }
                    stepIndex++;
                    updateStep(stepIndex);
                } else {
                    alert("Vui lòng nhập tên của bạn!");
                }
            };
        }

        console.log(`Step ${index + 1}:`, step);

        image.src = step.image;

        if (step.textbox) {
            textboxWrapper.classList.remove('hidden');
            textbox.src = step.textbox;

            textboxText.textContent = step.text || '';
            textboxText.style.animation = 'none'; // Reset animation
            setTimeout(() => {
                textboxText.style.animation = ''; // Kích hoạt lại animation
            }, 10);
        } else {
            textboxWrapper.classList.add('hidden');
        }
    }

    overlay.style.display = 'flex';
    updateStep(stepIndex);

    overlay.onclick = (event) => {
        // Ngăn sự kiện khi nhấn vào các phần tử bên trong inputWrapper
        if (event.target.closest("#inputWrapper")) {
            return;
        }

        // Ngăn nhảy step nếu chưa nhập tên
        if (stepIndex === 3 && !isNameEntered) {
            return;
        }

        stepIndex++;
        updateStep(stepIndex);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    showFullIntro(steps);
});
