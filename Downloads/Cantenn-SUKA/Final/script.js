const profileHeader = document.getElementById('profileHeader');
const dropdownMenu = document.getElementById('dropdownMenu');
let isOpen = false;

function toggleDropdown() {
    if (isOpen) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    dropdownMenu.classList.remove('hidden');
    dropdownMenu.classList.add('dropdown-enter');
    
    dropdownMenu.offsetHeight;
    
    dropdownMenu.classList.remove('dropdown-enter');
    dropdownMenu.classList.add('dropdown-enter-active');
    isOpen = true;
}

function closeDropdown() {
    dropdownMenu.classList.remove('dropdown-enter-active');
    dropdownMenu.classList.add('dropdown-exit-active');
    
    setTimeout(() => {
        dropdownMenu.classList.add('hidden');
        dropdownMenu.classList.remove('dropdown-exit-active');
        isOpen = false;
    }, 200);
}

profileHeader.addEventListener('click', toggleDropdown);
document.addEventListener('click', function(event) {
    if (!profileHeader.contains(event.target) && !dropdownMenu.contains(event.target)) {
        if (isOpen) {
            closeDropdown();
        }
    }
});

dropdownMenu.addEventListener('click', function(event) {
    event.stopPropagation();
});