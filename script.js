/// ================================
// OPENING
// ================================

const openButton = document.querySelector(".opening button");
const opening = document.querySelector(".opening");
const home = document.querySelector(".home");


// Posisi awal halaman
window.scrollTo(0, 0);

document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;


// OPEN BUTTON

openButton.addEventListener("click", function () {

    // Hilangkan opening
    opening.style.opacity = "0";


    setTimeout(function () {

        // Sembunyikan opening
        opening.style.display = "none";


        // Tampilkan HOME
        home.style.display = "block";
        home.style.opacity = "0";


        // PAKSA scroll ke paling atas
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        window.scrollTo(0, 0);


        // Tampilkan home
        setTimeout(function () {

            home.style.opacity = "1";

            // Paksa sekali lagi setelah render
            requestAnimationFrame(function () {

                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "auto"
                });

                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;

            });

        }, 100);

    }, 1000);

});


// ================================
// DRAGGABLE STORY PHOTOS
// ================================

const draggablePhotos =
    document.querySelectorAll(".draggable-photo");

let highestZIndex = 10;

draggablePhotos.forEach(function (photo) {

    let isDragging = false;

    let startX = 0;
    let startY = 0;

    let currentX = 0;
    let currentY = 0;


    photo.addEventListener("pointerdown", function (event) {

        isDragging = true;

        startX = event.clientX - currentX;
        startY = event.clientY - currentY;

        highestZIndex++;

        photo.style.zIndex = highestZIndex;

        photo.classList.add("dragging");

        photo.setPointerCapture(event.pointerId);

    });


    photo.addEventListener("pointermove", function (event) {

        if (!isDragging) return;

        currentX = event.clientX - startX;
        currentY = event.clientY - startY;

        photo.style.transform =
            `translate(${currentX}px, ${currentY}px) rotate(2deg)`;

    });


    photo.addEventListener("pointerup", function () {

        isDragging = false;

        photo.classList.remove("dragging");

    });

});


// ================================
// PUZZLE
// ================================

const puzzleBoard =
    document.getElementById("puzzleBoard");

const shuffleButton =
    document.getElementById("shuffleButton");

const puzzleMessage =
    document.getElementById("puzzleMessage");

const secretLetter =
    document.getElementById("secretLetter");


let puzzlePieces = [];


// Membuat 9 potongan puzzle

for (let i = 0; i < 9; i++) {

    const piece = document.createElement("div");

    piece.classList.add("puzzle-piece");

    const row = Math.floor(i / 3);
    const column = i % 3;

    piece.style.backgroundPosition =
        `${column * 50}% ${row * 50}%`;

    piece.dataset.correctPosition = i;

    puzzlePieces.push(piece);

}


// ================================
// SHUFFLE PUZZLE
// ================================

function shufflePuzzle() {

    const shuffledPieces =
        [...puzzlePieces];

    shuffledPieces.sort(
        () => Math.random() - 0.5
    );

    puzzleBoard.innerHTML = "";


    shuffledPieces.forEach(function (piece) {

        piece.draggable = true;

        puzzleBoard.appendChild(piece);

    });


    puzzleMessage.textContent =
        "Drag the pieces and put us back together. ♡";

    puzzleMessage.style.fontWeight =
        "normal";


    enableDragging();

}


// ================================
// DRAG PUZZLE
// ================================

function enableDragging() {

    let draggedPiece = null;


    puzzlePieces.forEach(function (piece) {

        piece.addEventListener(
            "dragstart",
            function () {

                draggedPiece = piece;

                piece.classList.add("dragging");

            }
        );


        piece.addEventListener(
            "dragend",
            function () {

                piece.classList.remove("dragging");

            }
        );


        piece.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

            }
        );


        piece.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                if (
                    !draggedPiece ||
                    draggedPiece === piece
                ) {
                    return;
                }


                const allPieces =
                    [...puzzleBoard.children];


                const draggedIndex =
                    allPieces.indexOf(
                        draggedPiece
                    );


                const targetIndex =
                    allPieces.indexOf(
                        piece
                    );


                if (draggedIndex < targetIndex) {

                    puzzleBoard.insertBefore(
                        draggedPiece,
                        piece.nextSibling
                    );

                } else {

                    puzzleBoard.insertBefore(
                        draggedPiece,
                        piece
                    );

                }


                checkPuzzle();

            }
        );

    });

}


// ================================
// CHECK PUZZLE
// ================================

function checkPuzzle() {

    const currentPieces =
        [...puzzleBoard.children];


    const isCorrect =
        currentPieces.every(
            function (piece, index) {

                return Number(
                    piece.dataset.correctPosition
                ) === index;

            }
        );


    if (isCorrect) {

        puzzleMessage.textContent =
            "YOU PUT US BACK TOGETHER. ♡";

        puzzleMessage.style.fontWeight =
            "bold";


        setTimeout(function () {

            if (secretLetter) {

                secretLetter.style.display =
                    "block";

                secretLetter.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }, 1000);

    }

}


shuffleButton.addEventListener(
    "click",
    shufflePuzzle
);


shufflePuzzle();


// ================================
// SECRET LETTER
// ================================

const openLetter =
    document.getElementById("openLetter");

const letterContent =
    document.getElementById("letterContent");


openLetter.addEventListener(
    "click",
    function () {

        letterContent.style.display =
            "block";

        openLetter.style.display =
            "none";

    }
);


// ================================
// OUR SONG
// ================================

const ourSong =
    document.getElementById("ourSong");

const playSong =
    document.getElementById("playSong");

const vinylArea =
    document.getElementById("vinylArea");

const vinylRecord =
    document.querySelector(".vinyl-record");

const songQuote =
    document.querySelector(".song-quote");


playSong.addEventListener(
    "click",
    function () {

        if (ourSong.paused) {

            ourSong.play();

            playSong.textContent =
                "❚❚ PAUSE";

            vinylArea.classList.add("show");

            vinylRecord.classList.add("playing");

            setTimeout(function () {

                songQuote.classList.add("show");

            }, 1000);

        } else {

            ourSong.pause();

            playSong.textContent =
                "▶ PLAY";

        }

    }
);


ourSong.addEventListener(
    "ended",
    function () {

        playSong.textContent =
            "▶ PLAY";

    }
);


// ================================
// PHOTO LIGHTBOX
// ================================

const clickablePhotos =
    document.querySelectorAll(".clickable-photo");

const photoLightbox =
    document.getElementById("photoLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeLightbox =
    document.getElementById("closeLightbox");


// PENTING:
// Saat halaman dibuka, lightbox HARUS tersembunyi.

if (photoLightbox) {

    photoLightbox.style.display = "none";

}


// Klik foto → buka lightbox

clickablePhotos.forEach(function (photo) {

    photo.addEventListener(
        "click",
        function () {

            const image =
                photo.querySelector("img");


            if (!image) return;


            lightboxImage.src =
                image.src;


            photoLightbox.style.display =
                "flex";

        }
    );

});


// Tombol X → tutup

closeLightbox.addEventListener(
    "click",
    function () {

        photoLightbox.style.display =
            "none";

        lightboxImage.src = "";

    }
);


// Klik area luar foto → tutup

photoLightbox.addEventListener(
    "click",
    function (event) {

        if (event.target === photoLightbox) {

            photoLightbox.style.display =
                "none";

            lightboxImage.src = "";

        }

    }
);