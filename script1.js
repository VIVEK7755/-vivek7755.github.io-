document.addEventListener('DOMContentLoaded', function() {
    // Show the "About" section by default
    var aboutSection = document.getElementById('about');
    aboutSection.style.display = 'flex';
    aboutSection.classList.add('active');

    // Add event listener to the "move to next section" button
    var nextSectionBtn = document.getElementById('next-section-btn');
    var prevSectionBtn = document.getElementById('prev-section-btn');

    function updateButtonVisibility() {
        var currentSection = document.querySelector('main section.active');
        var nextSection = currentSection.nextElementSibling;
        var prevSection = currentSection.previousElementSibling;

        if (nextSection) {
            nextSectionBtn.style.display = 'block';
        } else {
            nextSectionBtn.style.display = 'none';
        }

        if (prevSection) {
            prevSectionBtn.style.display = 'block';
        } else {
            prevSectionBtn.style.display = 'none';
        }
    }

    nextSectionBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button behavior

        var currentSection = document.querySelector('main section.active');
        var nextSection = currentSection.nextElementSibling;
        if (nextSection) {
            currentSection.style.display = 'none';
            currentSection.classList.remove('active');
            nextSection.style.display = 'flex';
            nextSection.classList.add('active');
            updateButtonVisibility();
        }
    });

    // Add event listeners to navigation links
    var navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            var sections = document.querySelectorAll('main section');
            sections.forEach(function(section) {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            
            var targetId = link.getAttribute('href').substr(1); // Remove the '#' character
            
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'flex';
                targetSection.classList.add('active');
                updateButtonVisibility();
            } else {
                aboutSection.style.display = 'flex';
                aboutSection.classList.add('active');
            }
        });
    });

    // same as above but for the previous button
    prevSectionBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button behavior

        var currentSection = document.querySelector('main section.active');
        var prevSection = currentSection.previousElementSibling;
        if (prevSection) {
            currentSection.style.display = 'none';
            currentSection.classList.remove('active');
            prevSection.style.display = 'flex';
            prevSection.classList.add('active');
            updateButtonVisibility();
        }
    });

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.card');
    const searchInput = document.getElementById('search-input');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
        const filterValue = this.dataset.filter;
    
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    
        portfolioCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
            card.style.display = 'block';
            } else {
            card.style.display = 'none';
            }
        });
        });
    });

    searchInput.addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase();
        portfolioCards.forEach(card => {

            const projectName = card.querySelector('h3').textContent.toLowerCase();
            const projectDescription = card.querySelector('p').textContent.toLowerCase();

            if (projectName.includes(searchQuery) || projectDescription.includes(searchQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Get the modal
    var modal = document.getElementById("resume-modal");

    // Get the button that opens the modal
    var btn = document.getElementById("view-resume-btn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close-btn")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});