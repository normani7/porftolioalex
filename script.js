// Mobile sidebar toggle
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('navToggle');
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));

    // Close sidebar on link click (mobile)
    document.querySelectorAll('nav a').forEach(a => {
      a.addEventListener('click', () => sidebar.classList.remove('open'));
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[data-section]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`nav a[data-section="${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));

    // Fade-in animation on scroll
    const fadeEls = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80 * (i % 4));
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => fadeObserver.observe(el));

    // Animate skill bars on visibility
    document.querySelectorAll('.skill-level-fill').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      const barObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => bar.style.width = width, 200);
          barObserver.unobserve(bar);
        }
      }, { threshold: 0.5 });
      barObserver.observe(bar);
    });

    // Smooth scroll for tag/btn links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });

    // Contact form mock send
    function handleSend() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const msg = document.getElementById('message').value;
      if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
      document.getElementById('form-feedback').style.display = 'block';
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
    }