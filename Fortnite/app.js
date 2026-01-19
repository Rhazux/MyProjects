document.addEventListener('DOMContentLoaded', () => {
    // --- NAVIGACE / SCROLL ---
    const mobileBtn = document.querySelector('#mobileMenuButton');
    const mobileMenu = document.querySelector('#mobileMenu');
    const navLinks = document.querySelectorAll('a[data-scroll]');
    const sections = document.querySelectorAll('section[data-section]');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileBtn.classList.toggle('is-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (!target) return;

            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // zavřít mobilní menu po kliknutí
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileBtn && mobileBtn.classList.remove('is-open');
            }
        });
    });

    // Zvýraznění aktivní sekce v navigaci při scrollu
    const updateActiveNav = () => {
        const scrollY = window.scrollY;
        let currentId = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const top = rect.top + scrollY - 120; // posun kvůli fixed headeru
            const bottom = top + section.offsetHeight;

            if (scrollY >= top && scrollY < bottom) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            const href = link.getAttribute('href') || '';
            if (currentId && href === `#${currentId}`) {
                link.classList.add('nav-link-active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();



    // --- KONTAKT FORM (AJAX) ---
    const contactForm = document.querySelector('#contactForm');
    const contactStatus = document.querySelector('#contactStatus');

    if (contactForm && contactStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.querySelector('#contactName').value.trim();
            const email = document.querySelector('#contactEmail').value.trim();
            const message = document.querySelector('#contactMessageInput').value.trim();

            contactStatus.textContent = 'Odesílám zprávu...';
            contactStatus.className = 'mt-2 text-xs text-slate-400';

            try {
                const response = await fetch('api/contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    contactStatus.textContent = data.message || 'Došlo k chybě při odesílání zprávy.';
                    contactStatus.className = 'mt-2 text-xs text-rose-400';
                    return;
                }

                contactStatus.textContent = data.message || 'Zpráva byla úspěšně odeslána. Díky!';
                contactStatus.className = 'mt-2 text-xs text-emerald-400';

                contactForm.reset();
            } catch (err) {
                console.error(err);
                contactStatus.textContent = 'Došlo k chybě při odesílání zprávy.';
                contactStatus.className = 'mt-2 text-xs text-rose-400';
            }
        });
    }
});