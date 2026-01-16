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

    // --- ZBRANĚ & LOADOUTY – DATA + AJAX ---
    const weaponGrid = document.querySelector('#weaponGrid');
    const weaponEmpty = document.querySelector('#weaponEmpty');
    const filterType = document.querySelector('#weaponFilterType');
    const filterRarity = document.querySelector('#weaponFilterRarity');
    const resetFiltersBtn = document.querySelector('#weaponResetFilters');

    const modal = document.querySelector('#weaponModal');
    const modalCloseBtn = document.querySelector('#weaponModalClose');
    const modalTitle = document.querySelector('#weaponModalTitle');
    const modalMeta = document.querySelector('#weaponModalMeta');
    const modalDesc = document.querySelector('#weaponModalDesc');
    const modalTip = document.querySelector('#weaponModalTip');

    let allWeapons = [];

    const openModal = (weapon) => {
        if (!modal) return;
        modalTitle.textContent = weapon.name;
        modalMeta.textContent = `${weapon.type} • ${weapon.rarity}`;
        modalDesc.textContent = weapon.description;
        modalTip.textContent = weapon.tip;
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.add('hidden');
    };

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const renderWeapons = () => {
        if (!weaponGrid) return;

        const typeVal = filterType ? filterType.value : 'all';
        const rarityVal = filterRarity ? filterRarity.value : 'all';

        const filtered = allWeapons.filter(w => {
            const typeOk = typeVal === 'all' || w.type === typeVal;
            const rarityOk = rarityVal === 'all' || w.rarity === rarityVal;
            return typeOk && rarityOk;
        });

        weaponGrid.innerHTML = '';

        if (filtered.length === 0) {
            if (weaponEmpty) weaponEmpty.classList.remove('hidden');
            return;
        } else {
            if (weaponEmpty) weaponEmpty.classList.add('hidden');
        }

        filtered.forEach(weapon => {
            const card = document.createElement('article');
            card.className = 'glass-panel hover-glow relative flex cursor-pointer flex-col overflow-hidden rounded-3xl p-4';
            card.dataset.id = weapon.id;

            const roleBadgeColor =
                weapon.roleTag === 'Close-range' ? 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10' :
                weapon.roleTag === 'Mid-range' ? 'text-cyan-300 border-cyan-400/40 bg-cyan-400/10' :
                'text-fuchsia-300 border-fuchsia-400/40 bg-fuchsia-400/10';

            card.innerHTML = `
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="text-[11px] uppercase tracking-wide text-slate-400">${weapon.type} • ${weapon.rarity}</p>
                        <h3 class="mt-1 text-lg font-semibold text-slate-50">${weapon.name}</h3>
                    </div>
                    <span class="rounded-full border ${roleBadgeColor} px-3 py-1 text-[11px] font-semibold">
                        ${weapon.roleTag}
                    </span>
                </div>
                <p class="mt-3 text-sm text-slate-300">
                    ${weapon.description}
                </p>
                <p class="mt-3 text-[11px] text-slate-400">
                    Doporučený mód: <span class="text-cyan-300 font-medium">${weapon.mode}</span>
                </p>
            `;

            card.addEventListener('click', () => openModal(weapon));
            weaponGrid.appendChild(card);
        });
    };

    const loadWeapons = async () => {
        try {
            const response = await fetch('api/weapons.php', { cache: 'no-cache' });
            if (!response.ok) {
                throw new Error('Nepodařilo se načíst data o zbraních.');
            }
            const data = await response.json();
            allWeapons = Array.isArray(data.weapons) ? data.weapons : [];
            renderWeapons();
        } catch (err) {
            console.error(err);
            if (weaponEmpty) {
                weaponEmpty.textContent = 'Chyba při načítání dat o zbraních. Zkus to prosím později.';
                weaponEmpty.classList.remove('hidden');
            }
        }
    };

    if (filterType) {
        filterType.addEventListener('change', renderWeapons);
    }
    if (filterRarity) {
        filterRarity.addEventListener('change', renderWeapons);
    }
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            if (filterType) filterType.value = 'all';
            if (filterRarity) filterRarity.value = 'all';
            renderWeapons();
        });
    }

    loadWeapons();

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