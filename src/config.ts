export const config = {
    developer: {
        name: "Aryan",
        fullName: "Aryan Verma",
        title: "Full-Stack Developer",
        description: "Full-Stack Developer building modern web applications. Passionate about machine learning, deep learning, and creating next-gen autonomous agents."
    },
    social: {
        github: "notAryan10",
        email: "aryanverma1857@gmail.com",
        location: "India"
    },
    about: {
        title: "About Me",
        description: "Full Stack Developer and B.Tech in AI and ML student with hands-on experience building end-to-end web applications using React, Node.js, Express, and relational databases. Strong focus on scalable architecture, authentication flows, API design, and performance-driven UI development. Proven ability to take ownership of projects, collaborate across teams, and build technically complex systems from scratch."
    },
    experiences: [
        {
            position: "Designer",
            company: "InAmigos Foundation",
            period: "August 2025 - September 2025",
            location: "Remote",
            description: "Designed visuals for events, digital campaigns, and branding while collaborating with cross-functional teams to align design with project goals.",
            responsibilities: [
                "Designed visuals for events, digital campaigns, and branding",
                "Collaborated with cross-functional teams to align design with project goals",
                "Created engaging visual content for various marketing materials"
            ],
            technologies: ["Photoshop", "Figma", "Graphic Design", "Branding", "Visual Communication"]
        },
        {
            position: "Front-End Developer",
            company: "Webs Joyti",
            period: "June 2025 - July 2025",
            location: "Pune",
            description: "Developed responsive and reusable React components following modern UI/UX practices. Collaborated with designers and backend developers to integrate APIs and deliver production-ready features.",
            responsibilities: [
                "Developed responsive and reusable React components following modern UI/UX practices",
                "Collaborated with designers and backend developers to integrate APIs and deliver production-ready features",
                "Delivered multiple features ahead of schedule, earning recognition for technical execution and UI quality"
            ],
            technologies: ["React", "JavaScript", "HTML", "CSS", "UI/UX", "API Integration"]
        },
        {
            position: "Open-Source Contributor",
            company: "Blender",
            period: "2024 - Present",
            location: "Remote",
            description: "Contributing to Blender's open-source ecosystem through code contributions, issue resolution, and tooling improvements. Multiple Pull Requests merged.",
            responsibilities: [
                "Contributed code improvements and bug fixes to Blender",
                "Collaborated with developers using C++ and Blender add-ons",
                "Improved usability and workflows through tooling enhancements"
            ],
            technologies: ["C++", "Python", "Blender", "Open Source", "Version Control"]
        },
        {
            position: "Founder & Lead",
            company: "Game Development Club - Newton School of Technology",
            period: "2024 - Present",
            location: "Pune",
            description: "Founded and led a student club focused on game development using Unity and Unreal Engine. Organized workshops and mentored peers in gameplay mechanics and interactive systems.",
            responsibilities: [
                "Founded and led student club focused on game development",
                "Organized workshops and mentored peers in gameplay mechanics",
                "Taught C# scripting and interactive systems development"
            ],
            technologies: ["Unity", "Unreal Engine", "C#", "Game Development", "Teaching"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "AtherBuild",
            category: "3D / WebGL",
            technologies: "React, Three.js, WebGL, Computer Vision, Real-time Rendering",
            image: "/images/atherbuild.png",
            description: "Built a browser-based, gesture-controlled 3D editor enabling hands-free object manipulation using computer vision. Implemented professional editor features such as Move, Rotate, Scale, and Extrude with axis-constrained transformations. Addressed performance constraints related to frame rate, gesture noise, and real-time rendering.",
            github: "https://github.com/notAryan10/AtherBuild",
            demo: "https://ather-build.vercel.app/"
        },
        {
            id: 2,
            title: "React Native Playground",
            category: "Mobile / Full Stack",
            technologies: "React Native, Node.js, WebSockets, WebRTC, Expo, Next.js, Monaco Editor",
            image: "/images/reactnative.png",
            description: "Built a real-time React Native playground enabling live code editing in the browser with instant native execution on a mobile runtime using WebSockets, WebRTC, and dynamic JavaScript execution. Designed a distributed execution architecture separating code authoring (Next.js + Monaco), orchestration (Node.js signaling server), and runtime execution (Expo app), achieving low-latency peer-to-peer streaming and scalable backend routing. Implemented a custom runtime module system using new Function() and a sandboxed require() to dynamically execute compiled React Native components, handle live updates, and stream native UI back to the browser in real time.",
            github: "https://github.com/notAryan10/react-native-playground-frontend-webrtcDemo",
            github2: "https://github.com/notAryan10/react-native-playground-backend-webrtcDemo",
            demo: "https://react-native-playground-frontend-we.vercel.app/",
            app: "https://drive.google.com/file/d/1brFUQMlujwHAOfvyFvENz-fjMuMkBuLZ/view?usp=drive_link"
        },
        {
            id: 3,
            title: "RepairHub",
            category: "Full Stack",
            technologies: "React, Node.js, Express, Prisma ORM, MySQL, Role-based Auth",
            image: "/images/repairhub.png",
            description: "Built a digital system to report, assign, and track hostel maintenance issues in real time. Implemented role-based dashboards for students, wardens, and maintenance staff. Designed APIs and relational database schemas to support issue tracking and status updates.",
            github: "https://github.com/notAryan10/RepairHub"
        }
    ],
    contact: {
        email: "aryanverma1857@gmail.com",
        github: "https://github.com/notAryan10",
        linkedin: "https://www.linkedin.com/in/aryan-verma100806/",
        codeforces: "https://codeforces.com/profile/aryan.verma1008",
        leetcode: "https://leetcode.com/u/notaryan10/",
    },
    skills: {
        develop: {
            title: "FULL-STACK DEVELOPER",
            description: "Building modern web & mobile applications",
            details: "Developing end-to-end web applications using React, Node.js, Express, and relational databases. Strong focus on scalable architecture, authentication flows, API design, and performance-driven UI development.",
            tools: ["React", "Node.js", "Express", "TypeScript", "JavaScript", "Prisma ORM", "MySQL", "MongoDB", "Next.js", "REST APIs", "Git"]
        },
        design: {
            title: "CREATIVE TECHNOLOGIST",
            description: "3D graphics, game development & visual design",
            details: "Building interactive 3D experiences with Three.js and WebGL, game development with Unity and Unreal Engine, and creating compelling visual designs. Expertise in computer vision, real-time rendering, and gesture-controlled interfaces.",
            tools: ["Three.js", "WebGL", "Unity", "Unreal Engine", "C#", "C++", "Blender", "Figma", "Photoshop", "Computer Vision"]
        }
    }
};


