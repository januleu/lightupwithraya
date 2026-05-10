document.addEventListener('DOMContentLoaded', () => {
	// Initialize Lucide Icons
	if (window.lucide) {
		window.lucide.createIcons();
	}

	// FAQ Accordion Logic
	const faqToggles = document.querySelectorAll('.faq-toggle');
	faqToggles.forEach(toggle => {
		toggle.addEventListener('click', () => {
			const item = toggle.closest('.faq-item');
			if (!item) return;
			const content = item.querySelector('.faq-content');
			const icon = toggle.querySelector('.faq-icon');
			if (!content || !icon) return;

			const isOpen = content.classList.contains('active');

			// Close all others
			document.querySelectorAll('.faq-content').forEach(c => {
				c.classList.remove('active');
				c.style.height = '0px';
				c.style.opacity = '0';
			});
			document.querySelectorAll('.faq-icon').forEach(i => {
				i.setAttribute('data-lucide', 'plus');
			});

			if (!isOpen) {
				content.classList.add('active');
				content.style.height = content.scrollHeight + 'px';
				content.style.opacity = '1';
				icon.setAttribute('data-lucide', 'minus');
			}

			if (window.lucide) window.lucide.createIcons();
		});
	});

	// Reveal on Scroll Animation Logic
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				// Unobserve after revealing
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	const revealElements = document.querySelectorAll('.reveal');
	revealElements.forEach(el => observer.observe(el));
});
