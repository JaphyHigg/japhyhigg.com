const btns = document.querySelectorAll(".catagory");

btns.forEach(function(btn){
    btn.addEventListener('click', function (e) {
        const dropdownTitle = e.currentTarget.parentElement;
        dropdownTitle.classList.toggle('show-dropdown')
    })
});