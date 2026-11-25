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