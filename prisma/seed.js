/**
 * VALKR Search Engine - Database Seed File
 * Populates the database with 100 example webpage entries
 */

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sampleWebpages = [
  // Technology & Programming
  {
    title: "MDN Web Docs - JavaScript Guide",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    description: "Comprehensive guide to JavaScript programming language, covering basics to advanced topics with examples and best practices.",
    thumbnailUrl: "https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png"
  },
  {
    title: "React - A JavaScript library for building user interfaces",
    url: "https://reactjs.org/",
    description: "A declarative, efficient, and flexible JavaScript library for building user interfaces with component-based architecture.",
    thumbnailUrl: "https://reactjs.org/logo-og.png"
  },
  {
    title: "Node.js Official Documentation",
    url: "https://nodejs.org/en/docs/",
    description: "Official documentation for Node.js, a JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development.",
    thumbnailUrl: null
  },
  {
    title: "GitHub - Where the world builds software",
    url: "https://github.com/",
    description: "Development platform inspired by the way you work. From open source to business, you can host and review code.",
    thumbnailUrl: "https://github.githubassets.com/images/modules/site/social-cards/github-social.png"
  },
  {
    title: "Stack Overflow - Developer Community",
    url: "https://stackoverflow.com/",
    description: "The largest, most trusted online community for developers to learn, share their programming knowledge, and build careers.",
    thumbnailUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png"
  },
  {
    title: "Python Official Tutorial",
    url: "https://docs.python.org/3/tutorial/",
    description: "Official Python tutorial covering the basic concepts and features of the Python language and system.",
    thumbnailUrl: null
  },
  {
    title: "TailwindCSS - A utility-first CSS framework",
    url: "https://tailwindcss.com/",
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    thumbnailUrl: "https://tailwindcss.com/_next/static/media/twitter-large-card.85c0ff9e455b3cf04dde5aa4e03a14eb.jpg"
  },
  {
    title: "Express.js - Fast, unopinionated web framework",
    url: "https://expressjs.com/",
    description: "Fast, unopinionated, minimalist web framework for Node.js applications with robust set of features.",
    thumbnailUrl: null
  },
  {
    title: "PostgreSQL Official Documentation",
    url: "https://www.postgresql.org/docs/",
    description: "The world's most advanced open source relational database with extensive documentation and community support.",
    thumbnailUrl: null
  },
  {
    title: "Prisma - Next-generation ORM for Node.js",
    url: "https://www.prisma.io/",
    description: "Modern database toolkit that makes database access easy with type safety and auto-completion.",
    thumbnailUrl: "https://www.prisma.io/images/og-image.png"
  },

  // Science & Research
  {
    title: "NASA - National Aeronautics and Space Administration",
    url: "https://www.nasa.gov/",
    description: "America's space agency, leading exploration of space and aeronautics research for the benefit of humanity.",
    thumbnailUrl: "https://www.nasa.gov/sites/default/files/styles/ubernode_alt_horiz/public/thumbnails/image/nasa-logo-web-rgb.png"
  },
  {
    title: "Nature - International Journal of Science",
    url: "https://www.nature.com/",
    description: "Leading international scientific journal publishing peer-reviewed research across all fields of science and technology.",
    thumbnailUrl: null
  },
  {
    title: "arXiv.org - Open Access Research Papers",
    url: "https://arxiv.org/",
    description: "Free distribution service and open-access archive for scholarly articles in physics, mathematics, computer science.",
    thumbnailUrl: null
  },
  {
    title: "Khan Academy - Free Online Learning",
    url: "https://www.khanacademy.org/",
    description: "Free online courses, lessons and practice for students in math, science, programming, history, and more.",
    thumbnailUrl: "https://cdn.kastatic.org/images/khan-logo-dark-background-2.png"
  },
  {
    title: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/",
    description: "Free online publication of materials from thousands of MIT courses, covering the entire curriculum.",
    thumbnailUrl: null
  },

  // News & Information
  {
    title: "Wikipedia - The Free Encyclopedia",
    url: "https://en.wikipedia.org/",
    description: "Free online encyclopedia that anyone can edit, containing millions of articles in hundreds of languages.",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png"
  },
  {
    title: "BBC News - Breaking News and Analysis",
    url: "https://www.bbc.com/news",
    description: "Breaking news, sport, TV, radio and a whole lot more from the BBC, the world's largest broadcasting corporation.",
    thumbnailUrl: null
  },
  {
    title: "Reuters - Business and Financial News",
    url: "https://www.reuters.com/",
    description: "Latest international news, business and financial market news, and analysis from Reuters news agency.",
    thumbnailUrl: null
  },
  {
    title: "The Guardian - News and Opinion",
    url: "https://www.theguardian.com/",
    description: "Latest news, sport and opinion from The Guardian, a leading independent newspaper and digital publisher.",
    thumbnailUrl: null
  },
  {
    title: "TED Talks - Ideas Worth Spreading",
    url: "https://www.ted.com/talks",
    description: "Riveting talks by remarkable people, free to the world. Ideas worth spreading from technology to design to science.",
    thumbnailUrl: "https://pa.tedcdn.com/og/og_image.png"
  },

  // Entertainment & Media
  {
    title: "YouTube - Video Sharing Platform",
    url: "https://www.youtube.com/",
    description: "Share your videos with friends, family, and the world. Upload, share and discover content from creators globally.",
    thumbnailUrl: null
  },
  {
    title: "Netflix - Streaming Entertainment",
    url: "https://www.netflix.com/",
    description: "Watch TV shows and movies anytime, anywhere with Netflix streaming service and original content.",
    thumbnailUrl: null
  },
  {
    title: "Spotify - Music Streaming Service",
    url: "https://www.spotify.com/",
    description: "Listen to millions of songs and podcasts for free or with Spotify Premium for ad-free listening.",
    thumbnailUrl: null
  },
  {
    title: "IMDb - Movies, TV and Celebrities",
    url: "https://www.imdb.com/",
    description: "The world's most popular and authoritative source for movie, TV and celebrity content with ratings and reviews.",
    thumbnailUrl: null
  },
  {
    title: "Reddit - The Front Page of the Internet",
    url: "https://www.reddit.com/",
    description: "Dive into anything with Reddit, a network of communities based on people's interests and hobbies.",
    thumbnailUrl: null
  },

  // E-commerce & Shopping
  {
    title: "Amazon - Online Shopping",
    url: "https://www.amazon.com/",
    description: "Online shopping from the earth's biggest selection of books, magazines, music, DVDs, videos, electronics, and more.",
    thumbnailUrl: null
  },
  {
    title: "eBay - Global Marketplace",
    url: "https://www.ebay.com/",
    description: "Buy and sell electronics, cars, fashion apparel, collectibles, sporting goods, and everything else on eBay.",
    thumbnailUrl: null
  },
  {
    title: "Etsy - Handmade and Vintage Items",
    url: "https://www.etsy.com/",
    description: "Shop for handmade, vintage items, and craft supplies on Etsy, a global marketplace for unique and creative goods.",
    thumbnailUrl: null
  },

  // Social Media & Communication
  {
    title: "Twitter - Social Media Platform",
    url: "https://twitter.com/",
    description: "Join the conversation and see what's happening in the world right now with real-time updates and trending topics.",
    thumbnailUrl: null
  },
  {
    title: "LinkedIn - Professional Networking",
    url: "https://www.linkedin.com/",
    description: "Connect with professionals, build your network, and advance your career on the world's largest professional network.",
    thumbnailUrl: null
  },
  {
    title: "Discord - Voice, Video and Text Communication",
    url: "https://discord.com/",
    description: "Step up your game with a modern voice & text chat app. Crystal clear voice, multiple server and channel support.",
    thumbnailUrl: null
  },

  // Additional Technology Resources
  {
    title: "W3Schools - Web Development Tutorials",
    url: "https://www.w3schools.com/",
    description: "The world's largest web developer site with tutorials and references on HTML, CSS, JavaScript, and more.",
    thumbnailUrl: null
  },
  {
    title: "CodePen - Online Code Editor",
    url: "https://codepen.io/",
    description: "An online community for testing and showcasing user-created HTML, CSS and JavaScript code snippets.",
    thumbnailUrl: null
  },
  {
    title: "freeCodeCamp - Learn to Code",
    url: "https://www.freecodecamp.org/",
    description: "Learn to code for free with millions of other people through interactive coding challenges and projects.",
    thumbnailUrl: null
  },
  {
    title: "Docker - Containerization Platform",
    url: "https://www.docker.com/",
    description: "Accelerate how you build, share, and run modern applications with Docker containerization technology.",
    thumbnailUrl: null
  },
  {
    title: "AWS - Amazon Web Services",
    url: "https://aws.amazon.com/",
    description: "Comprehensive, evolving cloud computing platform provided by Amazon with infrastructure and platform services.",
    thumbnailUrl: null
  },
  {
    title: "Google Cloud Platform",
    url: "https://cloud.google.com/",
    description: "Build and scale applications on Google's global infrastructure with cloud computing services and solutions.",
    thumbnailUrl: null
  },
  {
    title: "Microsoft Azure - Cloud Computing",
    url: "https://azure.microsoft.com/",
    description: "Cloud computing services for building, testing, deploying, and managing applications and services.",
    thumbnailUrl: null
  },
  {
    title: "Vercel - Frontend Development Platform",
    url: "https://vercel.com/",
    description: "Deploy web applications instantly with Vercel, optimized for performance and developer experience.",
    thumbnailUrl: null
  },
  {
    title: "Netlify - Modern Web Development",
    url: "https://www.netlify.com/",
    description: "Build, deploy, and manage modern web projects with continuous deployment from git repositories.",
    thumbnailUrl: null
  },
  {
    title: "Firebase - App Development Platform",
    url: "https://firebase.google.com/",
    description: "Google's mobile and web application development platform with backend services and tools.",
    thumbnailUrl: null
  },

  // Design & Creative
  {
    title: "Adobe Creative Suite",
    url: "https://www.adobe.com/creativecloud.html",
    description: "Industry-standard creative applications for photography, design, video, web, and mobile development.",
    thumbnailUrl: null
  },
  {
    title: "Figma - Collaborative Design Tool",
    url: "https://www.figma.com/",
    description: "Collaborative interface design tool that runs in the browser with real-time collaboration features.",
    thumbnailUrl: null
  },
  {
    title: "Canva - Graphic Design Platform",
    url: "https://www.canva.com/",
    description: "Create beautiful designs with easy-to-use drag-and-drop design tool with templates and assets.",
    thumbnailUrl: null
  },
  {
    title: "Dribbble - Design Community",
    url: "https://dribbble.com/",
    description: "Discover the world's top designers and creative professionals, showcase creative work and get inspired.",
    thumbnailUrl: null
  },
  {
    title: "Behance - Creative Portfolio Platform",
    url: "https://www.behance.net/",
    description: "Showcase and discover creative work from the world's leading online creative portfolio platform.",
    thumbnailUrl: null
  },

  // Health & Wellness
  {
    title: "WebMD - Health Information",
    url: "https://www.webmd.com/",
    description: "Trusted health information, symptom checker, drug information, and medical reference material.",
    thumbnailUrl: null
  },
  {
    title: "Mayo Clinic - Medical Information",
    url: "https://www.mayoclinic.org/",
    description: "Top-ranked hospital providing expert health information, medical research, and patient care resources.",
    thumbnailUrl: null
  },
  {
    title: "Healthline - Medical Information",
    url: "https://www.healthline.com/",
    description: "Medically reviewed health information you can trust, written by health experts and fact-checkers.",
    thumbnailUrl: null
  },

  // Finance & Business
  {
    title: "Yahoo Finance - Financial News",
    url: "https://finance.yahoo.com/",
    description: "Stock market quotes, financial news, portfolio management resources, international market data and more.",
    thumbnailUrl: null
  },
  {
    title: "Bloomberg - Business and Financial News",
    url: "https://www.bloomberg.com/",
    description: "Business, financial and economic news, analysis and insight from Bloomberg's global newsroom.",
    thumbnailUrl: null
  },
  {
    title: "Investopedia - Financial Education",
    url: "https://www.investopedia.com/",
    description: "The source for investing and personal finance education with comprehensive financial dictionary.",
    thumbnailUrl: null
  },

  // Travel & Geography
  {
    title: "Google Maps - Navigation and Places",
    url: "https://maps.google.com/",
    description: "Find local businesses, view maps and get driving directions with real-time traffic information.",
    thumbnailUrl: null
  },
  {
    title: "TripAdvisor - Travel Reviews",
    url: "https://www.tripadvisor.com/",
    description: "Read reviews, compare prices and book hotels, restaurants and travel experiences worldwide.",
    thumbnailUrl: null
  },
  {
    title: "Airbnb - Vacation Rentals",
    url: "https://www.airbnb.com/",
    description: "Book unique accommodations and experiences around the world hosted by local people.",
    thumbnailUrl: null
  },
  {
    title: "Booking.com - Hotel Reservations",
    url: "https://www.booking.com/",
    description: "Book accommodations worldwide with the largest selection of hotels, homes, and holiday properties.",
    thumbnailUrl: null
  },

  // Sports & Recreation
  {
    title: "ESPN - Sports News and Scores",
    url: "https://www.espn.com/",
    description: "Latest sports news, scores, stats, analysis and highlights from ESPN, the worldwide leader in sports.",
    thumbnailUrl: null
  },
  {
    title: "Olympic Games Official Website",
    url: "https://olympics.com/",
    description: "Official website of the Olympic Games with news, results, videos, and information about athletes.",
    thumbnailUrl: null
  },
  {
    title: "FIFA - World Football Association",
    url: "https://www.fifa.com/",
    description: "Official website of FIFA, the governing body of world football with tournaments, news, and rankings.",
    thumbnailUrl: null
  },

  // Food & Cooking
  {
    title: "AllRecipes - Cooking Recipes",
    url: "https://www.allrecipes.com/",
    description: "Find and share everyday cooking inspiration with millions of recipes, meal ideas, and cooking videos.",
    thumbnailUrl: null
  },
  {
    title: "Food Network - Cooking Shows and Recipes",
    url: "https://www.foodnetwork.com/",
    description: "Easy recipes, cooking shows, and restaurant reviews from celebrity chefs and food experts.",
    thumbnailUrl: null
  },

  // Additional Search Engine Examples
  {
    title: "Google Search - Web Search Engine",
    url: "https://www.google.com/",
    description: "The world's most popular search engine providing web search, images, videos, news, and specialized searches.",
    thumbnailUrl: null
  },
  {
    title: "Bing - Microsoft Search Engine",
    url: "https://www.bing.com/",
    description: "Microsoft's web search engine with image search, video search, news, and reward programs.",
    thumbnailUrl: null
  },
  {
    title: "DuckDuckGo - Privacy Search Engine",
    url: "https://duckduckgo.com/",
    description: "Privacy-focused search engine that doesn't track users or personalize search results.",
    thumbnailUrl: null
  },
  {
    title: "Yandex - Russian Search Engine",
    url: "https://yandex.com/",
    description: "Russian multinational technology company providing internet-related products and services including search.",
    thumbnailUrl: null
  },

  // Additional Educational Resources
  {
    title: "Coursera - Online Learning Platform",
    url: "https://www.coursera.org/",
    description: "Learn from top universities and companies with online courses, degrees, and professional certificates.",
    thumbnailUrl: null
  },
  {
    title: "edX - Online University Courses",
    url: "https://www.edx.org/",
    description: "Access courses from Harvard, MIT, and other top universities with free and paid online education.",
    thumbnailUrl: null
  },
  {
    title: "Udemy - Online Learning Marketplace",
    url: "https://www.udemy.com/",
    description: "Learn new skills with online courses taught by real-world experts in technology, business, and design.",
    thumbnailUrl: null
  },

  // Security & Privacy
  {
    title: "OWASP - Web Application Security",
    url: "https://owasp.org/",
    description: "Open Web Application Security Project providing free resources for web application security.",
    thumbnailUrl: null
  },
  {
    title: "Have I Been Pwned - Data Breach Check",
    url: "https://haveibeenpwned.com/",
    description: "Check if your email address or phone number has been compromised in a data breach.",
    thumbnailUrl: null
  },

  // API and Developer Tools
  {
    title: "Postman - API Development Platform",
    url: "https://www.postman.com/",
    description: "Collaboration platform for API development with tools for designing, testing, and documenting APIs.",
    thumbnailUrl: null
  },
  {
    title: "JSONPlaceholder - Fake Online REST API",
    url: "https://jsonplaceholder.typicode.com/",
    description: "Free fake online REST API for testing and prototyping with sample JSON data.",
    thumbnailUrl: null
  },
  {
    title: "Swagger - API Documentation",
    url: "https://swagger.io/",
    description: "Open source tools for API development including documentation, testing, and code generation.",
    thumbnailUrl: null
  },

  // Version Control & Collaboration
  {
    title: "GitLab - DevOps Platform",
    url: "https://gitlab.com/",
    description: "Complete DevOps platform delivered as a single application for project planning and source code management.",
    thumbnailUrl: null
  },
  {
    title: "Bitbucket - Git Repository Management",
    url: "https://bitbucket.org/",
    description: "Git repository management solution designed for professional teams with code collaboration features.",
    thumbnailUrl: null
  },

  // Cloud Storage
  {
    title: "Google Drive - Cloud Storage",
    url: "https://drive.google.com/",
    description: "Cloud storage service for file backup, sharing, and collaboration with Google Workspace integration.",
    thumbnailUrl: null
  },
  {
    title: "Dropbox - File Hosting Service",
    url: "https://www.dropbox.com/",
    description: "Cloud storage service for file synchronization, sharing, and collaboration across devices.",
    thumbnailUrl: null
  },

  // Productivity Tools
  {
    title: "Slack - Team Communication",
    url: "https://slack.com/",
    description: "Business communication platform featuring persistent chat rooms organized by topic, group, or project.",
    thumbnailUrl: null
  },
  {
    title: "Trello - Project Management",
    url: "https://trello.com/",
    description: "Collaborative project management tool that organizes projects into boards with lists and cards.",
    thumbnailUrl: null
  },
  {
    title: "Notion - All-in-one Workspace",
    url: "https://www.notion.so/",
    description: "All-in-one workspace for notes, tasks, wikis, and databases with powerful organization features.",
    thumbnailUrl: null
  },
  {
    title: "Asana - Team Project Management",
    url: "https://asana.com/",
    description: "Team collaboration and project management software to help teams organize, track, and manage work.",
    thumbnailUrl: null
  },

  // Open Source Projects
  {
    title: "Linux Kernel Archives",
    url: "https://www.kernel.org/",
    description: "Official repository of the Linux kernel source code and related documentation.",
    thumbnailUrl: null
  },
  {
    title: "Apache Software Foundation",
    url: "https://www.apache.org/",
    description: "Non-profit corporation supporting Apache software projects and open-source software development.",
    thumbnailUrl: null
  },
  {
    title: "Mozilla Developer Network",
    url: "https://developer.mozilla.org/",
    description: "Web platform documentation and learning resources for web developers by Mozilla Foundation.",
    thumbnailUrl: null
  },

  // Cryptocurrency & Blockchain
  {
    title: "Bitcoin.org - Bitcoin Information",
    url: "https://bitcoin.org/",
    description: "Official website providing information about Bitcoin cryptocurrency and the underlying technology.",
    thumbnailUrl: null
  },
  {
    title: "Ethereum.org - Ethereum Platform",
    url: "https://ethereum.org/",
    description: "Community-driven website providing information about the Ethereum blockchain platform and ecosystem.",
    thumbnailUrl: null
  },

  // Weather & Environment
  {
    title: "Weather.com - Weather Forecasts",
    url: "https://weather.com/",
    description: "Local and national weather forecasts, radar, maps, and severe weather alerts from Weather Channel.",
    thumbnailUrl: null
  },
  {
    title: "Climate.gov - Climate Information",
    url: "https://www.climate.gov/",
    description: "Science and information for a climate-smart nation with data, tools, and resources about climate change.",
    thumbnailUrl: null
  },

  // Gaming
  {
    title: "Steam - Gaming Platform",
    url: "https://store.steampowered.com/",
    description: "Digital distribution platform for purchasing and playing video games with community features.",
    thumbnailUrl: null
  },
  {
    title: "Twitch - Live Streaming Platform",
    url: "https://www.twitch.tv/",
    description: "Live streaming platform primarily focused on video game live streaming and esports.",
    thumbnailUrl: null
  },

  // Accessibility & Inclusion
  {
    title: "Web Accessibility Initiative (WAI)",
    url: "https://www.w3.org/WAI/",
    description: "Strategies, standards, and supporting resources to make the web accessible to people with disabilities.",
    thumbnailUrl: null
  },

  // Innovation & Startups
  {
    title: "Product Hunt - New Product Discovery",
    url: "https://www.producthunt.com/",
    description: "Platform for discovering and sharing new products, particularly in the technology and startup space.",
    thumbnailUrl: null
  },
  {
    title: "Hacker News - Technology News",
    url: "https://news.ycombinator.com/",
    description: "Social news website focusing on computer science and entrepreneurship run by Y Combinator.",
    thumbnailUrl: null
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data
    await prisma.webpage.deleteMany({});
    console.log('🗑️  Cleared existing webpage data');

    // Insert sample data
    const created = await prisma.webpage.createMany({
      data: sampleWebpages,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${created.count} webpages`);

    // Verify the data
    const count = await prisma.webpage.count();
    console.log(`📊 Total webpages in database: ${count}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });