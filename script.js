// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Navigation Management
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showPage(targetId);
            setActiveNavLink(link);
        });
    });
    
    // Handle initial page load
    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);
    setActiveNavLink(document.querySelector(`[href="#${hash}"]`));
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Load page content if not already loaded
        if (!targetPage.hasAttribute('data-loaded')) {
            loadPageContent(pageId);
            targetPage.setAttribute('data-loaded', 'true');
        }
    }
    
    // Update URL hash
    window.location.hash = pageId;
}

function setActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Page Content Loading
function loadPageContent(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    switch(pageId) {
        case 'year1':
            loadYearPage(page, getYear1Data());
            break;
        case 'year2':
            loadYearPage(page, getYear2Data());
            break;
        case 'year3':
            loadYearPage(page, getYear3Data());
            break;
        case 'year4':
            loadYearPage(page, getYear4Data());
            break;
        case 'projects':
            loadProjectsPage(page);
            break;
        case 'certifications':
            loadCertificationsPage(page);
            break;
        case 'medium':
            loadMediumPage(page);
            break;
        case 'contact':
            loadContactPage(page);
            break;
    }
}

function loadYearPage(page, data) {
    page.innerHTML = `
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h1 class="hero-title gradient-text">${data.title}</h1>
                <p class="hero-description">${data.description}</p>
            </div>
            
            <div class="card" style="margin-bottom: 3rem;">
                <div class="card-content">
                    <h2 class="card-title">
                        <span class="icon">${data.storyIcon}</span>
                        ${data.storyTitle}
                    </h2>
                    ${data.story.map(paragraph => `<p class="card-text">${paragraph}</p>`).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 3rem;">
                <h2 class="card-title gradient-text">Key Milestones</h2>
                <div class="timeline">
                    ${data.timeline.map(item => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <h3 class="timeline-title">${item.title}</h3>
                                <p class="timeline-date">${item.date}</p>
                                <p class="timeline-description">${item.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="about-grid" style="margin-bottom: 3rem;">
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">
                            <span class="icon">📚</span>
                            Academic
                        </h2>
                        ${data.academic.map(cert => `
                            <div style="padding: 0.75rem; background: hsl(var(--muted)); border-radius: 8px; margin-bottom: 0.75rem;">
                                <p style="font-weight: 500; font-size: 0.875rem;">${cert.name}</p>
                                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${cert.issuer} • ${cert.date}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">
                            <span class="icon">💻</span>
                            Domain
                        </h2>
                        ${data.domain.map(cert => `
                            <div style="padding: 0.75rem; background: hsl(var(--muted)); border-radius: 8px; margin-bottom: 0.75rem;">
                                <p style="font-weight: 500; font-size: 0.875rem;">${cert.name}</p>
                                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${cert.issuer} • ${cert.date}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">
                            <span class="icon">🏆</span>
                            Co-curricular
                        </h2>
                        ${data.cocurricular.map(cert => `
                            <div style="padding: 0.75rem; background: hsl(var(--muted)); border-radius: 8px; margin-bottom: 0.75rem;">
                                <p style="font-weight: 500; font-size: 0.875rem;">${cert.name}</p>
                                <p style="font-size: 0.75rem; color: hsl(var(--muted-foreground));">${cert.issuer} • ${cert.date}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="about-grid">
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">
                            <span class="icon">🏅</span>
                            Achievements
                        </h2>
                        <ul class="goals-list">
                            ${data.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">
                            <span class="icon">💻</span>
                            Projects
                        </h2>
                        ${data.projects.map(project => `
                            <div style="padding: 1rem; background: hsl(var(--muted)); border-radius: 8px; margin-bottom: 1rem;">
                                <h4 style="font-weight: 500; margin-bottom: 0.5rem;">${project.name}</h4>
                                <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 0.75rem;">${project.description}</p>
                                <div class="skills-tags">
                                    ${project.tech.map(tech => `<span class="tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadProjectsPage(page) {
    const projects = [
        {
            name: "AI-Powered Chatbot",
            description: "Intelligent customer service bot using NLP and machine learning",
            tech: ["Python", "TensorFlow", "FastAPI", "React"],
            github: "https://github.com/yourusername/ai-chatbot",
            year: "2026"
        },
        {
            name: "E-commerce Website",
            description: "Full-stack web application with user authentication and payment integration",
            tech: ["React", "Node.js", "MongoDB", "Express"],
            github: "https://github.com/yourusername/ecommerce",
            year: "2025"
        },
        {
            name: "Personal Portfolio Website",
            description: "Built my first portfolio using HTML, CSS, and JavaScript",
            tech: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/yourusername/portfolio",
            year: "2024"
        }
    ];
    
    page.innerHTML = `
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h1 class="hero-title gradient-text">My Projects</h1>
                <p class="hero-description">A collection of projects I've built throughout my B.Tech journey</p>
            </div>
            
            <div class="timeline">
                ${projects.map(project => `
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <div class="card">
                                <div class="card-content">
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                        <h3 class="card-title">${project.name}</h3>
                                        <span style="font-size: 0.875rem; color: hsl(var(--muted-foreground));">${project.year}</span>
                                    </div>
                                    <p class="card-text">${project.description}</p>
                                    <div class="skills-tags" style="margin-bottom: 1rem;">
                                        ${project.tech.map(tech => `<span class="tag">${tech}</span>`).join('')}
                                    </div>
                                    <a href="${project.github}" class="btn btn-outline" target="_blank">
                                        <span class="icon">📂</span>
                                        View on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadCertificationsPage(page) {
    const certifications = [
        { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Jan 2026", type: "Domain", link: "#" },
        { name: "Machine Learning Specialization", issuer: "Coursera", date: "Mar 2026", type: "Domain", link: "#" },
        { name: "Advanced Algorithms", issuer: "University", date: "Dec 2025", type: "Academic", link: "#" },
        { name: "React.js Developer Certification", issuer: "freeCodeCamp", date: "Jan 2025", type: "Domain", link: "#" },
        { name: "JavaScript Essentials", issuer: "Coursera", date: "Jan 2024", type: "Domain", link: "#" }
    ];
    
    page.innerHTML = `
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h1 class="hero-title gradient-text">Certifications</h1>
                <p class="hero-description">Professional certifications and achievements earned throughout my journey</p>
            </div>
            
            <div class="timeline">
                ${certifications.map(cert => `
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <div class="card">
                                <div class="card-content">
                                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                                        <h3 class="card-title">${cert.name}</h3>
                                        <span class="tag ${cert.type === 'Academic' ? '' : cert.type === 'Domain' ? 'tag-outline' : ''}">${cert.type}</span>
                                    </div>
                                    <p class="card-text">${cert.issuer}</p>
                                    <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 1rem;">${cert.date}</p>
                                    <a href="${cert.link}" class="btn btn-outline" target="_blank">
                                        <span class="icon">🔗</span>
                                        View Certificate
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadMediumPage(page) {
    const posts = [
        {
            title: "Getting Started with Machine Learning in Web Development",
            excerpt: "Exploring how ML can enhance user experiences in modern web applications...",
            date: "Mar 2026",
            link: "https://medium.com/@yourusername/ml-web-development"
        },
        {
            title: "Building Scalable React Applications",
            excerpt: "Best practices for structuring large React projects with performance in mind...",
            date: "Feb 2026", 
            link: "https://medium.com/@yourusername/scalable-react"
        },
        {
            title: "My Journey from Beginner to Full-Stack Developer",
            excerpt: "Reflecting on the challenges and victories of learning web development...",
            date: "Jan 2026",
            link: "https://medium.com/@yourusername/fullstack-journey"
        }
    ];
    
    page.innerHTML = `
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h1 class="hero-title gradient-text">Medium Posts</h1>
                <p class="hero-description">Sharing my thoughts and experiences in tech</p>
                <div style="margin-top: 1.5rem;">
                    <a href="https://medium.com/@yourusername" class="btn btn-primary" target="_blank">
                        <span class="icon">📝</span>
                        Visit My Medium Profile
                    </a>
                </div>
            </div>
            
            <div class="about-grid">
                ${posts.map(post => `
                    <div class="card">
                        <div class="card-content">
                            <h3 class="card-title">${post.title}</h3>
                            <p class="card-text">${post.excerpt}</p>
                            <p style="font-size: 0.875rem; color: hsl(var(--muted-foreground)); margin-bottom: 1rem;">${post.date}</p>
                            <a href="${post.link}" class="btn btn-outline" target="_blank">
                                <span class="icon">📖</span>
                                Read Article
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function loadContactPage(page) {
    page.innerHTML = `
        <div class="container">
            <div class="text-center" style="margin-bottom: 3rem;">
                <h1 class="hero-title gradient-text">Get In Touch</h1>
                <p class="hero-description">I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.</p>
            </div>
            
            <div class="about-grid">
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">Contact Information</h2>
                        <div style="margin-bottom: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                                <span class="icon">✉️</span>
                                <div>
                                    <p style="font-weight: 500;">Email</p>
                                    <a href="mailto:your.email@example.com" style="color: hsl(var(--primary)); text-decoration: none;">your.email@example.com</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                                <span class="icon">💼</span>
                                <div>
                                    <p style="font-weight: 500;">LinkedIn</p>
                                    <a href="https://linkedin.com/in/yourusername" style="color: hsl(var(--primary)); text-decoration: none;" target="_blank">linkedin.com/in/yourusername</a>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
                                <span class="icon">📂</span>
                                <div>
                                    <p style="font-weight: 500;">GitHub</p>
                                    <a href="https://github.com/yourusername" style="color: hsl(var(--primary)); text-decoration: none;" target="_blank">github.com/yourusername</a>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary" onclick="downloadResume()">
                            <span class="icon">⬇️</span>
                            Download Resume
                        </button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-content">
                        <h2 class="card-title">Send Message</h2>
                        <form id="contactForm" style="display: flex; flex-direction: column; gap: 1rem;">
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Name</label>
                                <input type="text" name="name" required style="width: 100%; padding: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: 6px; background: hsl(var(--background)); color: hsl(var(--foreground));">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email</label>
                                <input type="email" name="email" required style="width: 100%; padding: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: 6px; background: hsl(var(--background)); color: hsl(var(--foreground));">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Subject</label>
                                <input type="text" name="subject" required style="width: 100%; padding: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: 6px; background: hsl(var(--background)); color: hsl(var(--foreground));">
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Message</label>
                                <textarea name="message" rows="5" required style="width: 100%; padding: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: 6px; background: hsl(var(--background)); color: hsl(var(--foreground)); resize: vertical;"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <span class="icon">📤</span>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add form submission handler
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
}

// Timeline CSS
function addTimelineStyles() {
    const timelineCSS = `
        .timeline {
            position: relative;
            padding-left: 2rem;
        }
        
        .timeline::before {
            content: '';
            position: absolute;
            left: 1rem;
            top: 0;
            bottom: 0;
            width: 2px;
            background: hsl(var(--border));
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 2rem;
        }
        
        .timeline-marker {
            position: absolute;
            left: -2rem;
            top: 0.5rem;
            width: 12px;
            height: 12px;
            background: hsl(var(--primary));
            border-radius: 50%;
            border: 2px solid hsl(var(--background));
        }
        
        .timeline-content {
            padding-left: 1rem;
        }
        
        .timeline-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: hsl(var(--foreground));
        }
        
        .timeline-date {
            font-size: 0.875rem;
            color: hsl(var(--primary));
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .timeline-description {
            color: hsl(var(--muted-foreground));
            line-height: 1.6;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = timelineCSS;
    document.head.appendChild(style);
}

// Year Data
function getYear1Data() {
    return {
        title: "1st Year Journey",
        description: "The beginning of my B.Tech journey - from initial hesitation to finding my passion in technology",
        storyIcon: "❤️",
        storyTitle: "My B.Tech Decision Story",
        story: [
            "Initially, I was unsure about pursuing B.Tech in Computer Science. The field seemed vast and intimidating, and I wasn't sure if I had what it takes to succeed in technology. I had basic computer skills but hadn't done any serious programming before.",
            "Everything changed during my first programming class when I wrote my first \"Hello, World!\" program. The excitement of seeing code come to life, of solving problems through logic and creativity, sparked something in me that I had never felt before.",
            "By the end of my first semester, I knew I was going to enjoy what I am doing even if it gets Tough. Technology wasn't just a career path for me anymore - it became my way of understanding and improving the world around me where I live in."
        ],
        timeline: [
            {
                title: "First Programming Course",
                date: "August 2023",
                description: "Started with C programming."
            },
            {
                title: "Joined Programming Club & Expression Group.", 
                date: "September 2023",
                description: "Became an active member and participated in coding sessions & as well in Nukkad Natak."
            },
            {
                title: "First Project Completed",
                date: "December 2023", 
                description: "Built a simple calculator application using JavaScript and understood JS Basics."
            }
        ],
        academic: [
            { name: "Python", issuer: "University", date: "Dec 2023" },
            { name: "Computer Programming Fundamentals", issuer: "University", date: "Nov 2023" }
        ],
        domain: [
            { name: "JavaScript Essentials", issuer: "YouTube", date: "Jan 2024" },
            { name: "HTML", issuer: "ProgrammingHUB", date: "Feb 2024" }
        ],
        cocurricular: [
            { name: "Technical Writing Workshop", issuer: "College Club", date: "Feb 2024" },
            { name: "Public Speaking Certificate", issuer: "Toastmasters", date: "Apr 2024" }
        ],
        achievements: [
            "Dean's List for Academic Excellence",
            "Best Newcomer Award in Programming Club", 
            "Completed 100+ coding problems on LeetCode"
        ],
        projects: [
            {
                name: "Personal Portfolio Website",
                description: "Built my first portfolio using HTML & CSS.",
                tech: ["HTML", "CSS"]
            },
            {
                name: "Calculator App",
                description: "Simple calculator with basic mathematical operations", 
                tech: ["JavaScript", "CSS"]
            }
        ]
    };
};

function getYear2Data() {
    return {
        title: "2nd Year Journey",
        description: "Diving deeper into full-stack development and discovering my passion for building complete solutions",
        storyIcon: "👥",
        storyTitle: "Growth & Collaboration",
        story: [
            "My second year was all about expanding horizons and diving deeper into web development. I transitioned from basic programming to building full-fledged applications, learning both frontend and backend technologies.",
            "This year taught me the importance of teamwork and collaboration. Participating in hackathons and group projects showed me how diverse perspectives can lead to innovative solutions. I also started contributing to open source projects, which opened doors to the global developer community.",
            "By the end of second year, I had developed a solid foundation in full-stack development and realized my potential for leadership in technical projects."
        ],
        timeline: [
            {
                title: "First Full-Stack Project",
                date: "September 2024",
                description: "Built an e-commerce website with complete backend integration"
            },
            {
                title: "Hackathon Victory",
                date: "February 2025",
                description: "Secured 2nd place in college hackathon with task management app"
            },
            {
                title: "Open Source Contribution",
                date: "March 2025",
                description: "Made first significant contribution to a popular React library"
            }
        ],
        academic: [
            { name: "Object-Oriented Programming", issuer: "University", date: "Dec 2024" },
            { name: "Database Management Systems", issuer: "University", date: "Nov 2024" },
            { name: "Web Development Fundamentals", issuer: "University", date: "Oct 2024" }
        ],
        domain: [
            { name: "React.js Developer Certification", issuer: "freeCodeCamp", date: "Jan 2025" },
            { name: "Node.js & Express.js", issuer: "Udemy", date: "Feb 2025" },
            { name: "MongoDB for Developers", issuer: "MongoDB University", date: "Mar 2025" }
        ],
        cocurricular: [
            { name: "Team Leadership Workshop", issuer: "College", date: "Dec 2024" },
            { name: "Hackathon Participation Certificate", issuer: "TechFest 2024", date: "Feb 2025" }
        ],
        achievements: [
            "Secured 2nd place in college-level coding competition",
            "Led a team of 4 members in hackathon project",
            "Maintained 8.5+ CGPA throughout the year",
            "Contributed to open source projects on GitHub"
        ],
        projects: [
            {
                name: "E-commerce Website",
                description: "Full-stack web application with user authentication and payment integration",
                tech: ["React", "Node.js", "MongoDB", "Express"]
            },
            {
                name: "Task Management App",
                description: "Collaborative task management system with real-time updates",
                tech: ["React", "Socket.io", "PostgreSQL"]
            },
            {
                name: "Weather Dashboard",
                description: "Weather forecasting app with location-based services",
                tech: ["JavaScript", "API Integration", "CSS"]
            }
        ]
    };
}

function getYear3Data() {
    return {
        title: "3rd Year Journey",
        description: "Exploring advanced technologies, gaining industry experience, and developing leadership skills",
        storyIcon: "💡",
        storyTitle: "Innovation & Leadership",
        story: [
            "Third year marked a significant shift towards specialization and leadership. I delved deep into machine learning and cloud technologies, areas that fascinated me with their potential to solve complex real-world problems.",
            "My internship experience at a tech startup provided invaluable insights into industry practices and agile development methodologies. Working on production-level applications taught me about code quality, testing, and deployment strategies.",
            "This year also saw me taking on mentorship roles, helping junior students navigate their programming journey. Teaching others reinforced my own understanding and improved my communication skills significantly."
        ],
        timeline: [
            {
                title: "Summer Internship",
                date: "June 2025",
                description: "3-month internship at TechCorp working on ML-powered features"
            },
            {
                title: "Research Publication",
                date: "November 2025",
                description: "Published paper on 'Machine Learning Applications in Web Development'"
            },
            {
                title: "Hackathon Victory",
                date: "January 2026",
                description: "Led team to 1st place in National Inter-College Hackathon"
            }
        ],
        academic: [
            { name: "Advanced Algorithms", issuer: "University", date: "Dec 2025" },
            { name: "Machine Learning Fundamentals", issuer: "University", date: "Nov 2025" },
            { name: "Software Engineering Principles", issuer: "University", date: "Oct 2025" }
        ],
        domain: [
            { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", date: "Jan 2026" },
            { name: "Docker & Kubernetes", issuer: "Docker Inc.", date: "Feb 2026" },
            { name: "Machine Learning Specialization", issuer: "Coursera", date: "Mar 2026" }
        ],
        cocurricular: [
            { name: "Project Management Certification", issuer: "PMI", date: "Jan 2026" },
            { name: "Mentorship Program Completion", issuer: "College", date: "Feb 2026" }
        ],
        achievements: [
            "Won 1st place in inter-college hackathon",
            "Published research paper on ML applications",
            "Led technical team of 8 members",
            "Completed internship at tech startup",
            "Mentored 5 junior students"
        ],
        projects: [
            {
                name: "AI-Powered Chatbot",
                description: "Intelligent customer service bot using NLP and machine learning",
                tech: ["Python", "TensorFlow", "FastAPI", "React"]
            },
            {
                name: "Cloud-Native Microservices",
                description: "Scalable backend architecture deployed on AWS with Docker containers",
                tech: ["Node.js", "Docker", "AWS", "PostgreSQL"]
            },
            {
                name: "Real-time Analytics Dashboard",
                description: "Live data visualization platform for business intelligence",
                tech: ["React", "D3.js", "WebSockets", "MongoDB"]
            }
        ]
    };
}

function getYear4Data() {
    return {
        title: "4th Year Journey",
        description: "Final year focused on capstone projects, job preparation, and planning for the future",
        storyIcon: "🚀",
        storyTitle: "Preparing for Launch",
        story: [
            "My final year has been about bringing everything together - all the skills, knowledge, and experience gained over the past three years. The focus shifted to building industry-ready applications and preparing for my career transition.",
            "The capstone project became the centerpiece of this year, allowing me to demonstrate my technical expertise while solving a real-world problem. Working closely with industry mentors provided insights into professional software development practices.",
            "As I prepare to graduate, I'm excited about the opportunities ahead and confident in my ability to contribute meaningfully to the tech industry."
        ],
        timeline: [
            {
                title: "Capstone Project Started",
                date: "August 2026",
                description: "Began work on final year project with industry collaboration"
            },
            {
                title: "Technical Interview Success",
                date: "December 2026",
                description: "Received job offers from multiple tech companies"
            },
            {
                title: "Project Defense",
                date: "April 2027",
                description: "Successfully defended capstone project with distinction"
            }
        ],
        academic: [
            { name: "Capstone Project", issuer: "University", date: "Apr 2027" },
            { name: "Advanced Software Engineering", issuer: "University", date: "Dec 2026" },
            { name: "Computer Networks & Security", issuer: "University", date: "Nov 2026" }
        ],
        domain: [
            { name: "Google Cloud Professional", issuer: "Google Cloud", date: "Jan 2027" },
            { name: "Advanced React & Redux", issuer: "Udacity", date: "Feb 2027" },
            { name: "System Design Mastery", issuer: "Educative", date: "Mar 2027" }
        ],
        cocurricular: [
            { name: "Industry Mentorship Program", issuer: "Tech Guild", date: "Dec 2026" },
            { name: "Career Development Workshop", issuer: "College", date: "Jan 2027" }
        ],
        achievements: [
            "Graduated with First Class Honours",
            "Received Excellence Award for Capstone Project",
            "Got placed in top-tier tech company",
            "Became student ambassador for the department",
            "Organized college's first tech symposium"
        ],
        projects: [
            {
                name: "Smart Campus Management System",
                description: "Comprehensive platform for university administration with AI-powered insights",
                tech: ["React", "Python", "PostgreSQL", "Machine Learning", "Docker"]
            },
            {
                name: "Blockchain Voting System",
                description: "Secure and transparent voting platform using blockchain technology",
                tech: ["Solidity", "Web3.js", "React", "Node.js"]
            },
            {
                name: "Performance Monitoring Dashboard",
                description: "Real-time application performance monitoring with predictive analytics",
                tech: ["React", "Python", "InfluxDB", "Grafana", "Kubernetes"]
            }
        ]
    };
}

// Utility Functions
function downloadResume() {
    // Create a dummy resume download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Your_Name_Resume.pdf';
    link.click();
    
    // Show feedback
    alert('Resume download feature will be implemented with actual file.');
}

function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Handle form submission (replace with actual implementation)
    console.log('Form submitted:', data);
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    addTimelineStyles();
    
    // Theme toggle handler
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    
    // Mobile menu handler
    document.querySelector('.mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Handle browser back/forward
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
        setActiveNavLink(document.querySelector(`[href="#${hash}"]`));
    });
});

// Add mobile menu styles
const mobileCSS = `
    @media (max-width: 768px) {
        .nav-links.mobile-active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: hsl(var(--background));
            border-top: 1px solid hsl(var(--border));
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .nav-dropdown .dropdown-content {
            position: static;
            display: block;
            box-shadow: none;
            border: none;
            background: transparent;
            padding: 0;
            margin-top: 0.5rem;
        }
        
        .nav-dropdown .dropdown-content a {
            padding: 0.25rem 0;
            background: transparent;
        }
    }
`;

const mobileStyle = document.createElement('style');
mobileStyle.textContent = mobileCSS;
document.head.appendChild(mobileStyle);