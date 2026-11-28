document.querySelectorAll("nav").forEach((nav) => {
    const menuButton = nav.querySelector(".nav-menu-toggle");
    const menuIcon = menuButton?.querySelector(".fa");
    const menu = nav.querySelector("#primary-navigation");

    if (!menuButton || !menu) {
        return;
    }

    const closeMenu = () => {
        nav.classList.remove("nav-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");

        if (menuIcon) {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    };

    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("nav-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");

        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        }
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
            menuButton.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
});
function displayCarCards(data,base = '../'){
    var container = document.getElementById('cardContainer');
    if (!container) return;
    container.replaceChildren();

    if (!data.length) {
        container.innerHTML = '<p class="filter-empty">No cars match your filters.</p>';
        return;
    }

    data.forEach(car => {
        var cardItem = document.createElement('div');
        cardItem.classList.add('item');
        cardItem.innerHTML = `
             <img src="${base}assets/cars/${car.imgSrc}" alt="${car.imgAlt}">
            <h3>${car.name}</h3>
            <div class="carDetails">
                <span class="fa fa-calendar"></span>
                ${car.yearMade}
                <span class="fa fa-gears"></span>
                ${car.transmission}
                <span class="fa fa-gas-pump"></span>
                ${car.fuelCapacity}L
                <span class="fa fa-gauge-high"></span>
                ${car.power}CC
            </div>
            <div class="flex-box">
                <strong>${car.price.toLocaleString("en-US")}</strong>
                <button class="fa fa-arrow-right"></button>
            </div>
        `;
        container.appendChild(cardItem);
    });
}

function initInventoryFilters() {
    const form = document.getElementById('inventory-filters');
    const container = document.getElementById('cardContainer');
    if (!form || !container || typeof carsData === 'undefined') return;

    const applyFilters = () => {
        const formData = new FormData(form);
        const query = String(formData.get('search') || '').trim().toLowerCase();
        const minPrice = Number(formData.get('min-price')) || 0;
        const maxPriceValue = formData.get('max-price');
        const maxPrice = maxPriceValue ? Number(maxPriceValue) : Infinity;
        const makes = formData.getAll('make').map(value => value.toLowerCase());
        const transmissions = formData.getAll('transmission').map(value => value.toLowerCase());
        const fuels = formData.getAll('fuel').map(value => value.toLowerCase());

        const filteredCars = carsData.filter(car => {
            const searchable = `${car.make} ${car.name}`.toLowerCase();
            return (!query || searchable.includes(query))
                && car.price >= minPrice
                && car.price <= maxPrice
                && (!makes.length || makes.includes(String(car.make).toLowerCase()))
                && (!transmissions.length || transmissions.includes(String(car.transmission).toLowerCase()))
                && (!fuels.length || fuels.includes(String(car.fuel).toLowerCase()));
        });

        displayCarCards(filteredCars);
    };

    form.addEventListener('submit', event => {
        event.preventDefault();
        applyFilters();
    });

    form.addEventListener('input', applyFilters);
    form.addEventListener('change', applyFilters);
    form.addEventListener('reset', () => {
        window.requestAnimationFrame(() => applyFilters());
    });
}

initInventoryFilters();
// document.querySelectorAll(".propertiesOfCars li").forEach((item) => {
//     item.addEventListener("click", () => {
//         item.parentElement.querySelectorAll("li").forEach((option) => option.classList.remove("active"));
//         item.classList.add("active");
//     });
// });

// document.querySelectorAll(".colorBox .circle").forEach((swatch) => {
//     swatch.addEventListener("click", () => {
//         swatch.parentElement.querySelectorAll(".circle").forEach((option) => option.classList.remove("active"));
//         swatch.classList.add("active");
//     });
// });