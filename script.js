function AddNote() {
    let new_note = document.createElement("div");
    new_note.setAttribute("class", "note");

    let note_draggable = document.createElement("div");
    note_draggable.setAttribute("class", "note-draggable");

    let close_button = document.createElement("div");
    close_button.innerHTML = "&times;"
    close_button.setAttribute("class", "close");

    let text_area = document.createElement("textarea");
    text_area.setAttribute("class", "text");
    text_area.setAttribute("name", "note-text");
    text_area.spellcheck = false;

    let colour_picker = document.createElement("input");
    colour_picker.setAttribute("type", "color");
    colour_picker.setAttribute("class", "colour");
    colour_picker.setAttribute("value", "#FFFF00");
    
    close_button.addEventListener("click", function(e) {
        close_button.parentElement.parentElement.remove(); //parent is note-draggable, parent-parent is note
    });

    colour_picker.addEventListener("input", function(e) {
        colour_picker.parentElement.parentElement.style.backgroundColor = colour_picker.value;
    });

    new_note.appendChild(note_draggable);
    note_draggable.appendChild(close_button);
    note_draggable.appendChild(colour_picker);
    new_note.appendChild(text_area);
    document.body.appendChild(new_note);

    DragElement(new_note);
}

function DragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.firstElementChild.onmousedown = DragMouseDown; //ensure first child is note-draggable

    function DragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = CloseDragElement;

        document.onmousemove = ElementDrag;
    }

    function ElementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function CloseDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}