// Enhanced smooth scroll with active nav states
$(document).ready(function(){
    // Smooth scrolling for navigation links
	$(".nav-link, .scroll-down").on('click', function(event) {
    	if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top - 100
			}, 700, function(){
				window.location.hash = hash;
			});

			// Close mobile menu after clicking
			$('.navbar-collapse').collapse('hide');
      	}
    });

    // Active navigation highlighting
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop() + 150;

        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));

            if (refElement.length && refElement.offset()) {
                if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                    $('.nav-link').removeClass("active");
                    currLink.addClass("active");
                }
            }
        });
    });

    // Typing animation for hero section
    function typeWriter() {
        const texts = [
            "Full Stack MERN Developer",
            "React & Node.js Expert",
            "Problem Solver",
            "Tech Enthusiast"
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedElement = $('.typed-text');

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedElement.text(currentText.substring(0, charIndex - 1));
                charIndex--;
            } else {
                typedElement.text(currentText.substring(0, charIndex + 1));
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing animation after initial delay
        setTimeout(type, 2000);
    }

    // Initialize typing animation
    typeWriter();

    // Parallax effect for hero section
    $(window).scroll(function() {
        var scrolled = $(this).scrollTop();
        var parallaxSpeed = 0.5;
        $('.particles-bg').css('transform', 'translateY(' + (scrolled * parallaxSpeed) + 'px)');
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.experience-item, .custom-card, .img-wrapper').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (elementTop < windowBottom - 100) {
                $(this).addClass('animate-in');
            }
        });
    }

    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Run on page load

    // Add hover effects to project cards
    $('.img-wrapper').hover(
        function() {
            $(this).find('img').css('transform', 'scale(1.05)');
        },
        function() {
            $(this).find('img').css('transform', 'scale(1)');
        }
    );

    // Enhanced form validation and submission
    $('form').on('submit', function(e) {
        e.preventDefault();

        // Simple validation
        var email = $(this).find('input[type="email"]').val();
        var name = $(this).find('input[type="text"]').val();
        var message = $(this).find('textarea').val();

        if (!email || !name || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Show loading state
        var submitBtn = $(this).find('button[type="submit"]');
        var originalText = submitBtn.text();
        submitBtn.text('Sending...').prop('disabled', true);

        // Simulate form submission (replace with actual form submission)
        setTimeout(function() {
            submitBtn.text('Message Sent!').removeClass('btn-primary').addClass('btn-success');
            setTimeout(function() {
                submitBtn.text(originalText).prop('disabled', false).removeClass('btn-success').addClass('btn-primary');
            }, 3000);
        }, 2000);
    });

    // Add loading animation on page load
    $(window).on('load', function() {
        $('body').addClass('loaded');
        $('.animate-on-load').addClass('loaded');
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Manual navbar toggle for better browser compatibility
    $('.navbar-toggler').click(function() {
        var target = $($(this).data('bs-target') || $(this).data('target'));
        if (target.hasClass('show')) {
            target.removeClass('show');
            $(this).addClass('collapsed');
        } else {
            target.addClass('show');
            $(this).removeClass('collapsed');
        }
    });

    // Close navbar when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.navbar-collapse').removeClass('show');
            $('.navbar-toggler').addClass('collapsed');
        }
    });

    // Add stagger animation to skill cards
    $('.custom-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    // Magnetic effect for buttons
    $('.btn-magnetic').mousemove(function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        $(this).css('transform', `translate(${x * 0.1}px, ${y * 0.1}px)`);
    });

    $('.btn-magnetic').mouseleave(function() {
        $(this).css('transform', 'translate(0px, 0px)');
    });

    // Ripple effect for buttons
    $('.btn').click(function(e) {
        const btn = $(this);
        const ripple = $('<span class="ripple"></span>');

        btn.append(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.css({
            width: size + 'px',
            height: size + 'px',
            left: x + 'px',
            top: y + 'px'
        }).addClass('ripple-animate');

        setTimeout(() => ripple.remove(), 600);
    });

    // Enhanced scroll animations with intersection observer
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');

                    // Add stagger effect for child elements
                    const children = entry.target.querySelectorAll('.custom-card, .experience-item, .img-wrapper');
                    children.forEach(function(child, index) {
                        setTimeout(function() {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.section, .experience-item, .custom-card, .img-wrapper').forEach(function(el) {
            observer.observe(el);
        });
    }

    // Skill progress bar animation
    function animateSkillBars() {
        $('.skill-progress-bar').each(function() {
            const skillLevel = $(this).data('skill-level') || 85;
            $(this).css('width', skillLevel + '%');
        });
    }

    // Add skill bars to custom cards
    $('.custom-card .card-body').each(function() {
        const skillLevel = Math.floor(Math.random() * 30) + 70; // Random skill level between 70-100
        $(this).append(`
            <div class="skill-progress">
                <div class="skill-progress-bar" data-skill-level="${skillLevel}"></div>
            </div>
        `);
    });

    // Parallax effect for background elements
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.particles-bg');
        const speed = 0.3;
        parallax.css('transform', 'translateY(' + (scrolled * speed) + 'px)');
    });

    // Text scramble effect for titles
    function scrambleText(element, finalText, duration = 2000) {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let frame = 0;
        const totalFrames = duration / 16; // 60fps

        const timer = setInterval(() => {
            let scrambled = '';
            for (let i = 0; i < finalText.length; i++) {
                if (frame > totalFrames * (i / finalText.length)) {
                    scrambled += finalText[i];
                } else {
                    scrambled += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = scrambled;

            if (frame > totalFrames) {
                clearInterval(timer);
                element.textContent = finalText;
            }
            frame++;
        }, 16);
    }

    // Apply scramble effect to section titles
    $('.section-title').each(function() {
        const originalText = $(this).text();
        const element = this;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    scrambleText(element, originalText);
                    observer.unobserve(element);
                }
            });
        });

        observer.observe(element);
    });

    // Add loading dots to buttons when clicked
    $('.btn-primary').click(function() {
        if (!$(this).hasClass('loading')) {
            const originalText = $(this).text();
            $(this).addClass('loading').html('Loading <div class="loading-dots"><span></span><span></span><span></span></div>');

            setTimeout(() => {
                $(this).removeClass('loading').text(originalText);
            }, 2000);
        }
    });

    // Smooth reveal animation for contact items
    $('.contact .item').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.2) + 's',
            'opacity': '0',
            'transform': 'translateX(-30px)'
        });

        $(this).addClass('slide-in-left');
    });

    // Add hover sound effect (optional)
    function playHoverSound() {
        // Create audio context for subtle hover sounds
        if (typeof AudioContext !== 'undefined') {
            const audioContext = new AudioContext();

            $('.social-item, .btn').hover(function() {
                // Create subtle click sound
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            });
        }
    }

    // Uncomment the line below to enable hover sounds
    // playHoverSound();
});
