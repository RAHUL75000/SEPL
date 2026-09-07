/**
 * ==========================================================================
 * SAINA EXHIBITIONS PVT. LTD. (SEPL) - CORPORATE FRONTEND CONTROLLER
 * Vanilla JavaScript (ES6+) - Accessible, Responsive, Performant
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. PLATFORM LINKS CONFIGURATION ---
  // Official URLs placeholder configuration as specified in architecture requirements
  const platformLinks = {
    perfectSourcing: 'OFFICIAL_URL_HERE',
    gsi: 'OFFICIAL_URL_HERE',
    tafs: 'OFFICIAL_URL_HERE'
  };

  const platformDisplayNames = {
    perfectSourcing: 'Perfect Sourcing',
    gsi: 'Garment Show of India (GSI)',
    tafs: 'TAFS Show'
  };

  // --- 2. DOM ELEMENT REFERENCES ---
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const formAlert = document.getElementById('formAlert');
  const alertIcon = document.getElementById('alertIcon');
  const alertMessage = document.getElementById('alertMessage');
  const messageInput = document.getElementById('message');
  const charCount = document.getElementById('charCount');

  // Modal elements
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  const modalOkBtn = document.getElementById('modalOkBtn');

  // --- 3. STICKY HEADER & SCROLL BEHAVIOR ---
  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 3B. HERO INTERACTIVE SHOWCASE, ROLE FAST-TRACK & AMBIENT EFFECTS ---
  const heroSection = document.getElementById('hero');
  const heroInteractive = document.getElementById('heroInteractive');
  const showcaseStage = document.getElementById('showcaseStage');
  const cleanTabs = document.querySelectorAll('.clean-tab');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const prevShowcaseBtn = document.getElementById('prevShowcaseBtn');
  const nextShowcaseBtn = document.getElementById('nextShowcaseBtn');
  const showcaseProgressBar = document.getElementById('showcaseProgressBar');

  // Flagship Platforms Showcase Data
  const showcaseData = {
    gsi: {
      title: 'Garment Show of India (GSI)',
      tag: 'PREMIER B2B APPAREL EXPO',
      badge: 'GSI',
      badgeClass: 'gsi-badge',
      statNum: '15,000+',
      statText: 'Trade Footfall',
      img: 'images/gsi.webp',
      desc: "India's leading trade platform uniting garment manufacturers, retail chains, wholesalers, and fashion brands under one roof.",
      chips: ['Apparel & Garments', 'Manufacturers & Brands', 'Pan-India Reach'],
      linkKey: 'gsi'
    },
    perfectSourcing: {
      title: 'Perfect Sourcing',
      tag: 'GLOBAL SOURCING & MEDIA',
      badge: 'PS',
      badgeClass: 'ps-badge',
      statNum: '500+',
      statText: 'Sourcing Mills',
      img: 'images/perfect-sourcing.webp',
      desc: 'A comprehensive global sourcing intelligence and trade media platform bridging manufacturers, apparel brands, and textile innovators.',
      chips: ['Fabrics & Trims', 'Supply Chain Intelligence', 'Global Sourcing'],
      linkKey: 'perfectSourcing'
    },
    tafs: {
      title: 'TAFS Show',
      tag: 'TRENDS & TEXTILE INNOVATION',
      badge: 'TAFS',
      badgeClass: 'tafs-badge',
      statNum: '30+',
      statText: 'Trend Summits',
      img: 'images/tafs.webp',
      desc: 'Trends Apparel Fashion & Sourcing (TAFS) Show is a future-forward trade gathering celebrating creative fashion concepts and textile innovation.',
      chips: ['Fashion Forecasting', 'Sustainable Textiles', 'Executive Summits'],
      linkKey: 'tafs'
    }
  };

  const showKeys = ['gsi', 'perfectSourcing', 'tafs'];
  let currentShowIndex = 0;
  const slideDuration = 5200; // ms per slide
  let slideStartTime = Date.now();
  let progressRafId = null;
  let isPaused = false;

  const updateShowcase = (key) => {
    const data = showcaseData[key];
    if (!data || !showcaseStage) return;

    const idx = showKeys.indexOf(key);
    if (idx !== -1) currentShowIndex = idx;

    // Trigger subtle stage transition
    showcaseStage.classList.add('transitioning');

    setTimeout(() => {
      const showcaseImg = document.getElementById('showcaseImg');
      const showcaseTag = document.getElementById('showcaseTag');
      const showcaseStatNum = document.getElementById('showcaseStatNum');
      const showcaseStatText = document.getElementById('showcaseStatText');
      const showcaseTitle = document.getElementById('showcaseTitle');
      const showcaseBadge = document.getElementById('showcaseBadge');
      const showcaseDesc = document.getElementById('showcaseDesc');
      const showcaseChips = document.getElementById('showcaseChips');
      const showcaseWebBtn = document.getElementById('showcaseWebBtn');

      if (showcaseImg) showcaseImg.src = data.img;
      if (showcaseTag) showcaseTag.textContent = data.tag;
      if (showcaseStatNum) showcaseStatNum.textContent = data.statNum;
      if (showcaseStatText) showcaseStatText.textContent = data.statText;
      if (showcaseTitle) showcaseTitle.textContent = data.title;
      if (showcaseBadge) {
        showcaseBadge.textContent = data.badge;
        showcaseBadge.className = `stage-badge ${data.badgeClass}`;
      }
      if (showcaseDesc) showcaseDesc.textContent = data.desc;

      if (showcaseChips && Array.isArray(data.chips)) {
        showcaseChips.innerHTML = data.chips
          .map((chip) => `<span class="chip-item">${chip}</span>`)
          .join('');
      }

      if (showcaseWebBtn) {
        showcaseWebBtn.setAttribute('data-link', data.linkKey);
      }

      // Update Tab Buttons
      cleanTabs.forEach((tab) => {
        const isMatch = tab.getAttribute('data-show') === key;
        tab.classList.toggle('active', isMatch);
        tab.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      // Update Dot Indicators
      dotBtns.forEach((dot, dotIdx) => {
        dot.classList.toggle('active', dotIdx === currentShowIndex);
      });

      showcaseStage.classList.remove('transitioning');
    }, 150);

    // Reset slide timer & progress bar
    slideStartTime = Date.now();
    if (showcaseProgressBar) {
      showcaseProgressBar.style.width = '0%';
    }
  };

  // Progress Bar & Auto-Cycle Loop via requestAnimationFrame
  const progressLoop = () => {
    if (!isPaused) {
      const elapsed = Date.now() - slideStartTime;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);

      if (showcaseProgressBar) {
        showcaseProgressBar.style.width = `${pct}%`;
      }

      if (elapsed >= slideDuration) {
        currentShowIndex = (currentShowIndex + 1) % showKeys.length;
        updateShowcase(showKeys[currentShowIndex]);
      }
    }
    progressRafId = requestAnimationFrame(progressLoop);
  };

  // Start the auto loop
  progressRafId = requestAnimationFrame(progressLoop);

  // Pause on hover over interactive showcase
  if (heroInteractive) {
    heroInteractive.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    heroInteractive.addEventListener('mouseleave', () => {
      isPaused = false;
      slideStartTime = Date.now() - (parseFloat(showcaseProgressBar?.style.width || '0') / 100) * slideDuration;
    });
    heroInteractive.addEventListener('touchstart', () => {
      isPaused = true;
    }, { passive: true });
    heroInteractive.addEventListener('touchend', () => {
      isPaused = false;
      slideStartTime = Date.now();
    }, { passive: true });
  }

  // Clean Tabs click listeners
  cleanTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const showKey = tab.getAttribute('data-show');
      if (showKey) updateShowcase(showKey);
    });
  });

  // Cycle Dots click listeners
  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx) && showKeys[idx]) {
        updateShowcase(showKeys[idx]);
      }
    });
  });

  // Prev / Next Arrow Controls
  if (prevShowcaseBtn) {
    prevShowcaseBtn.addEventListener('click', () => {
      currentShowIndex = (currentShowIndex - 1 + showKeys.length) % showKeys.length;
      updateShowcase(showKeys[currentShowIndex]);
    });
  }

  if (nextShowcaseBtn) {
    nextShowcaseBtn.addEventListener('click', () => {
      currentShowIndex = (currentShowIndex + 1) % showKeys.length;
      updateShowcase(showKeys[currentShowIndex]);
    });
  }

  // --- 3C. INTERACTIVE FAST-TRACK ROLE SELECTOR ---
  const rolePills = document.querySelectorAll('.role-pill');
  const rolePreviewBox = document.getElementById('rolePreviewBox');
  const rolePreviewTitle = document.getElementById('rolePreviewTitle');
  const rolePreviewDesc = document.getElementById('rolePreviewDesc');
  const rolePreviewBtn = document.getElementById('rolePreviewBtn');
  const rolePreviewBtnText = document.getElementById('rolePreviewBtnText');

  const roleData = {
    exhibitor: {
      title: 'Showcase to 15,000+ Verified Buyers',
      desc: 'Secure prime exhibition space across our flagship expos and connect directly with retailers, wholesalers, and bulk purchasers.',
      btnText: 'Book a Stall',
      target: 'contact',
      subject: 'Exhibition Stall Booking Enquiry'
    },
    buyer: {
      title: 'Source Directly from 500+ Top Manufacturers',
      desc: 'Discover new apparel collections, fabric innovations, and verified suppliers with VIP trade buyer networking access.',
      btnText: 'Register as Buyer',
      target: 'shows',
      subject: 'Trade Buyer Registration'
    },
    partner: {
      title: 'Partner with India’s Premier B2B Network',
      desc: 'Gain executive visibility through keynote panel sponsorships, CXO roundtables, and nationwide industry media coverage.',
      btnText: 'Explore Sponsorships',
      target: 'contact',
      subject: 'Sponsorship & Partnership Inquiry'
    }
  };

  rolePills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const roleKey = pill.getAttribute('data-role');
      const data = roleData[roleKey];
      if (!data) return;

      rolePills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      if (rolePreviewBox) {
        rolePreviewBox.classList.add('fade');
        setTimeout(() => {
          if (rolePreviewTitle) rolePreviewTitle.textContent = data.title;
          if (rolePreviewDesc) rolePreviewDesc.textContent = data.desc;
          if (rolePreviewBtnText) rolePreviewBtnText.textContent = data.btnText;
          if (rolePreviewBtn) {
            rolePreviewBtn.href = `#${data.target}`;
            rolePreviewBtn.setAttribute('data-subject', data.subject);
          }
          rolePreviewBox.classList.remove('fade');
        }, 120);
      }
    });
  });

  // Connect Role Action Button to Contact Form Autofill
  if (rolePreviewBtn) {
    rolePreviewBtn.addEventListener('click', (e) => {
      const subjectText = rolePreviewBtn.getAttribute('data-subject');
      const targetId = rolePreviewBtn.getAttribute('href')?.replace('#', '');
      if (targetId === 'contact' && subjectText) {
        const subjectInput = document.getElementById('subject');
        if (subjectInput) {
          subjectInput.value = subjectText;
          subjectInput.classList.add('highlight-autofill');
          setTimeout(() => subjectInput.classList.remove('highlight-autofill'), 1500);
        }
      }
    });
  }

  // --- 3D. AMBIENT MOUSE SPOTLIGHT (Desktop Only) ---
  if (window.matchMedia('(min-width: 1024px)').matches && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroSection.style.setProperty('--mouse-x', `${x}%`);
      heroSection.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  // --- 3E. ANIMATED IMPACT COUNTERS ---
  const counterNums = document.querySelectorAll('.counter-num');
  let countersAnimated = false;

  const runCounterAnimation = () => {
    if (countersAnimated) return;
    countersAnimated = true;

    counterNums.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      const duration = 1600; // ms
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease-out
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(ease * target);
        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      requestAnimationFrame(tick);
    });
  };

  const heroDock = document.querySelector('.hero-stats-dock');
  if (heroDock && 'IntersectionObserver' in window) {
    const dockObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounterAnimation();
          dockObserver.disconnect();
        }
      });
    }, { threshold: 0.2 });
    dockObserver.observe(heroDock);
  } else {
    setTimeout(runCounterAnimation, 500);
  }

  // --- 4. MOBILE HAMBURGER MENU CONTROLS ---
  const toggleMobileMenu = (forceState) => {
    const isCurrentlyOpen = mobileDrawer.classList.contains('open');
    const newState = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

    if (newState) {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  // Close drawer when any mobile nav link or CTA button is clicked
  const mobileDrawerLinks = mobileDrawer ? mobileDrawer.querySelectorAll('a') : [];
  mobileDrawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      toggleMobileMenu(false);
    }
  });

  // --- 5. ACTIVE NAVIGATION OBSERVER ---
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --- 6. SCROLL REVEAL ANIMATION OBSERVER ---
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('active'));
  }

  // --- 7. MODAL DIALOG UTILITY ---
  const openModal = (title, contentHtml) => {
    modalTitle.textContent = title;
    modalBody.innerHTML = contentHtml;
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // --- 8. PLATFORM BUTTON LINKS HANDLER ---
  const platformButtons = document.querySelectorAll('.platform-link-btn');
  platformButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-link');
      const url = platformLinks[key];
      const displayName = platformDisplayNames[key] || 'Platform';

      if (!url || url === 'OFFICIAL_URL_HERE' || url.startsWith('[')) {
        e.preventDefault();
        openModal(
          `${displayName} - Official Website`,
          `<p>The official URL for <strong>${displayName}</strong> is ready to be linked.</p>
           <p style="margin-top: 12px; font-size: 14px; color: #64748B;">
             To connect the live external site, simply update the <code>platformLinks.${key}</code> property in <code>frontend/js/script.js</code> with the official website address.
           </p>`
        );
      } else {
        // Legitimate URL configured
        btn.setAttribute('href', url);
      }
    });
  });

  // Privacy Policy & Terms Link Handlers
  const privacyLink = document.getElementById('privacyPolicyLink');
  const termsLink = document.getElementById('termsLink');

  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Privacy Policy',
        `<p><strong>Saina Exhibitions Pvt. Ltd. (SEPL)</strong> respects your privacy.</p>
         <p style="margin-top: 8px;">Information collected via our corporate contact form is used strictly to respond to your business enquiries and exhibition participation requests. We do not sell or lease personal contact details to third parties.</p>`
      );
    });
  }

  if (termsLink) {
    termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        'Terms & Conditions',
        `<p>All materials, logos, trademarks, and intellectual property displayed on this corporate portal belong to <strong>Saina Exhibitions Pvt. Ltd. (SEPL)</strong> or their respective show owners.</p>
         <p style="margin-top: 8px;">Unauthorized copying or commercial reproduction without written permission is strictly prohibited.</p>`
      );
    });
  }

  // --- 9. CHARACTER COUNTER FOR MESSAGE FIELD ---
  if (messageInput && charCount) {
    const updateCharCount = () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len} / 3000`;
      if (len > 3000) {
        charCount.style.color = 'var(--error)';
      } else {
        charCount.style.color = 'var(--text-light)';
      }
    };

    messageInput.addEventListener('input', updateCharCount);
    updateCharCount();
  }

  // --- 10. FORM CLIENT-SIDE VALIDATION & SUBMISSION ---
  let isSubmitting = false;

  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  const clearErrors = () => {
    document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));
    document.querySelectorAll('.field-error').forEach((fe) => (fe.textContent = ''));
  };

  const setFieldError = (inputId, errorId, message) => {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (input) {
      input.closest('.form-group').classList.add('has-error');
    }
    if (errorEl) {
      errorEl.textContent = message;
    }
  };

  const showAlert = (type, message) => {
    formAlert.className = `form-alert alert-${type}`;
    if (type === 'success') {
      alertIcon.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
      `;
    } else {
      alertIcon.innerHTML = `
        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
        </svg>
      `;
    }
    alertMessage.textContent = message;
    formAlert.style.display = 'flex';
  };

  const hideAlert = () => {
    formAlert.style.display = 'none';
  };

  // Clear errors when user types
  ['name', 'email', 'message'].forEach((fieldId) => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', () => {
        el.closest('.form-group').classList.remove('has-error');
        const errEl = document.getElementById(`${fieldId}Error`);
        if (errEl) errEl.textContent = '';
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (isSubmitting) return;

      clearErrors();
      hideAlert();

      // Extract form values
      const name = document.getElementById('name').value.trim();
      const companyName = document.getElementById('companyName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Client-side Validation Checks
      let isValid = true;

      if (!name) {
        setFieldError('name', 'nameError', 'Please enter your full name.');
        isValid = false;
      } else if (name.length < 2) {
        setFieldError('name', 'nameError', 'Name must be at least 2 characters long.');
        isValid = false;
      }

      if (!email) {
        setFieldError('email', 'emailError', 'Please enter your email address.');
        isValid = false;
      } else if (!emailPattern.test(email)) {
        setFieldError('email', 'emailError', 'Please enter a valid email address.');
        isValid = false;
      }

      if (!message) {
        setFieldError('message', 'messageError', 'Please enter your message.');
        isValid = false;
      } else if (message.length < 5) {
        setFieldError('message', 'messageError', 'Message must be at least 5 characters long.');
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Prepare request payload
      const payload = {
        name,
        companyName,
        email,
        phone,
        subject: subject || 'General Enquiry',
        message
      };

      // Set Submitting State
      isSubmitting = true;
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnSpinner.style.display = 'inline-flex';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Success Response
          showAlert('success', 'Thank you! Your enquiry has been submitted successfully.');
          contactForm.reset();
          if (charCount) charCount.textContent = '0 / 3000';
          
          // Auto-scroll slightly to alert if needed
          formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Server Validation / Business Logic Error
          const errMsg = data.message || 'Unable to submit your enquiry.';
          showAlert('error', errMsg);
        }
      } catch (err) {
        console.error('[Contact Form Error]:', err);
        showAlert('error', 'Something went wrong. Please try again.');
      } finally {
        // Restore Button State
        isSubmitting = false;
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';
      }
    });
  }
});
