import React, { useState, useEffect } from 'react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaDocker
} from 'react-icons/fa';
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiFirebase,
  SiPostgresql,
  SiMysql,
  SiWordpress,
  SiPhp
} from 'react-icons/si';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// Isolated counter component - always animate on mount
const IsolatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      let startTime = null;
      const startCount = 0;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
        const currentCount = Math.floor(startCount + (end - startCount) * easeOutCubic);

        setCount(currentCount);

        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 500);

    return () => clearTimeout(timer);
  }, []); // No dependencies - only run once on mount

  return <span>{prefix}{count}{suffix}</span>;
};


// Data constants
const PROJECTS = [
  {
    id: 1,
    title: "Himatekom Website",
    description: "Website resmi Himpunan Mahasiswa Teknik Komputer dengan sistem informasi mahasiswa, berita, galeri, aspirasi dan event",
    image: "/assets/projects/himatekom2.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    demoUrl: "https://himatekom.com"
  },
  {
    id: 2,
    title: "SIMSAPRAS UNAND",
    description: "Sistem Informasi Peminjaman Sarana Prasarana Universitas Andalas untuk memudahkan proses peminjaman gedung, ruangan dan fasilitas secara online. Website ini resmi digunakan oleh instansi saat ini",
    image: "/assets/projects/simsapras.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript"],
    demoUrl: "https://simsapras.unand.ac.id"
  },
  {
    id: 3,
    title: "Nagari Pematang Panjang",
    description: "Portal informasi digital untuk Nagari Pematang Panjang dengan fitur informasi nagari, galeri, berita, peta, pelayanan publik dan informasi daerah",
    image: "/assets/projects/pematangpanjang.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS"],
    demoUrl: "https://nagaripematangpanjang.com"
  },
  {
    id: 4,
    title: "Digikom FTI Unand",
    description: "Website Resmi Laboratorium Sistem Digital dan Arsitektur Komputer Fakultas Teknologi Informasi Universitas Andalas untuk membantu praktikum, peminjaman, publikasi dan informasi akademik",
    image: "/assets/projects/digikom.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS"],
    demoUrl: "https://digikom.fti.unand.ac.id"
  },
  {
    id: 5,
    title: "OR Neotelemetri 14",
    description: "Website Open Recruitment UKM Neotelemetri UNAND yang ke-14 dengan sistem pendaftaran dan ujian secara online",
    image: "/assets/projects/or-neotelemetri.png",
    tags: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    demoUrl: "https://or.neotelemetri.id"
  },
  {
    id: 6,
    title: "Desa Silungkang Oso",
    description: "Website resmi Desa Silungkang Oso dengan fitur informasi nagari, galeri, berita, peta, pelayanan publik dan informasi daerah",
    image: "/assets/projects/silungkangoso.png",
    tags: ["React", "Laravel", "MySQL", "Tailwind CSS"],
    demoUrl: "https://or.neotelemetri.id"
  }
];

const PACKAGES = {
  'landing-page': [
    {
      name: "Starter",
      price: "Rp 800.000",
      isRecommended: false,
      note: "Cocok untuk kamu yang baru mulai merintis bisnis dan ingin langsung tampil secara online",
      features: [
        "1 Halaman Landing Page (3-5 section)",
        "Tampilan Responsive untuk mobile & desktop",
        "Free Domain (.com)",
        "Hosting 3 bulan",
        "Contact form sederhana",
        "Loading speed optimal",
        "1x Revisi Gratis",
        "1 bulan support & maintenance",
        "Video Panduan Penggunaan Website"
      ]
    },
    {
      name: "Premium",
      price: "Rp 1.500.000",
      isRecommended: true,
      note: "Ideal untuk bisnis kamu yang ingin tampil lebih profesional",
      features: [
        "Semua yang ada di Paket Starter, plus:",
        "1-3 Halaman Tambahan",
        "Landing page dengan desain visual yang lebih kompleks",
        "Animasi & interaktivitas halaman",
        "Hosting 6 bulan",
        "Social media integration",
        "3x Revisi Gratis",
        "Basic SEO optimization",
        "3 bulan support & maintenance"
      ]
    },
    {
      name: "Pro",
      price: "Rp 2.500.000",
      isRecommended: false,
      note: "Sempurna untuk bisnis yang ingin tampil beda dan siap bersaing di pasar digital, serta ingin fitur jauh lebih lengkap",
      features: [
        "Semua yang ada di Paket Premium, plus:",
        "4-6 Halaman Tambahan",
        "Request fitur custom (chat, testimonial, dll)",
        "Blog integration (Opsional)",
        "1 Email Bisnis Profesional",
        "Speed optimization",
        "Advanced SEO optimization",
        "5x Revisi Gratis",
        "6 bulan support & maintenance"
      ]
    }
  ],
  'company-profile': [
    {
      name: "Basic",
      price: "Rp 1.500.000",
      isRecommended: false,
      note: "Cocok untuk yang baru merintis atau perusahaan kecil yang butuh web profesional",
      features: [
        "1-3 Halaman Company Profile (Home, About, Contact)",
        "Tampilan Responsive untuk mobile & desktop",
        "Free Domain (.com)",
        "Hosting 3 bulan",
        "Contact form sederhana",
        "Loading speed optimal",
        "1x Revisi Gratis",
        "1 bulan support & maintenance",
        "Video Panduan Penggunaan Website"
      ]
    },
    {
      name: "Bussiness",
      price: "Rp 2.500.000",
      isRecommended: true,
      note: "Best choice untuk perusahaan menengah yang ingin melakukan ekspansi secara digital",
      features: [
        "Semua yang ada di Paket Basic, plus:",
        "5-7 Halaman Company Profile",
        "Team & portfolio showcase",
        "Admin panel untuk update konten",
        "Multi-language support",
        "Implementasi SEO dasar",
        "Social media integration",
        "Animasi & interaktivitas halaman",
        "Hosting 6 bulan",
        "Social media integration",
        "Basic SEO optimization",
        "3x Revisi Gratis",
        "3 bulan support & maintenance"
      ]
    },
    {
      name: "Enterprise",
      price: "Rp 4.000.000",
      isRecommended: false,
      note: "Untuk korporasi yang butuh solusi web kompleks dan ingin tampil profesional, punya fitur lengkap dan ingin scale up",
      features: [
        "Semua yang ada di Paket Bussiness, plus:",
        "8-15 Halaman Company Profile",
        "Request fitur tambahan (Blog, Project, Announcement, Post, dll)",
        "Admin dashboard lengkap",
        "1 Email Bisnis Profesional",
        "Speed optimization",
        "Advanced SEO optimization",
        "5x Revisi Gratis",
        "6 bulan support & maintenance"
      ]
    }
  ],
  'toko-online': [
    {
      name: "Startup",
      price: "Rp 1.500.000",
      isRecommended: false,
      note: "Cocok untuk yang baru mau jualan online dan butuh website e-commerce sederhana",
      features: [
        "1 Halaman Landing Page dan Katalog Produk",
        "Tampilan Responsive untuk mobile & desktop",
        "Free Domain (.com)",
        "Hosting 3 bulan",
        "Contact form sederhana",
        "Loading speed optimal",
        "1x Revisi Gratis",
        "Tombol Beli Sekarang → Direct ke WhatsApp atau Link lainnya",
        "Section Testimoni, FAQ dan Promo",
        "1 bulan support & maintenance",
        "Video Panduan Penggunaan Website"
      ]
    },
    {
      name: "Growth",
      price: "Rp 4.500.000",
      isRecommended: true,
      note: "Perfect untuk bisnis yang siap scale up penjualan melalui website e-commerce profesional",
      features: [
        "Semua yang ada di Paket Startup, plus:",
        "3-8 Halaman Katalog Produk",
        "Hosting 6 bulan",
        "E-commerce dengan unlimited produk dinamis",
        "Fitur Search dan Filter produk",
        "Fitur 'Tambah ke Keranjang' & Checkout via WhatsApp",
        "Admin panel untuk manajemen produk, order & customer",
        "Advanced inventory & reporting",
        "Promo & discount system",
        "Affiliate program setup",
        "Email marketing integration",
        "Basic SEO optimization",
        "3x Revisi Gratis",
        "3 bulan support & maintenance"
      ]
    },
    {
      name: "Scale",
      price: "Rp 7.500.000",
      isRecommended: false,
      note: "Untuk bisnis besar yang butuh marketplace sendiri dengan fitur e-commerce lengkap dan sistem pembayaran yang terotomatisasi. Cocok untuk brand yang ingin serius mengembangkan bisnis online.",
      features: [
        "Semua yang ada di Paket Growth, plus:",
        "Sistem Akun dan Keranjang Belanja untuk Customer",
        "Integrasi dengan Payment Gateway (Midtrans, Xendit, dll)",
        "Metode Pembayaran Lengkap (Transfer, E-Wallet, Kartu Kredit)",
        "Admin dashboard lengkap untuk manajemen produk, order, diskon, customer, laporan & analytics",
        "Checkout Otomatis dengan Notifikasi Email",
        "Perhitungan Ongkir Otomatis",
        "Advanced SEO optimization",
        "5x Revisi Gratis",
        "6 bulan support & maintenance"
      ]
    }
  ],
  'event-seminar': [
    {
      name: "Event Basic",
      price: "Rp 1.000.000",
      isRecommended: false,
      note: "Cocok untuk branding event sederhana seperti seminar, workshop, meetup, dll",
      features: [
        "1 Halaman Landing Page Event",
        "Tampilan Responsive untuk mobile & desktop",
        "Free Domain (.com)",
        "Hosting 3 bulan",
        "Contact form sederhana",
        "Loading speed optimal",
        "1x Revisi Gratis",
        "1 bulan support & maintenance",
        "Full Support Selama Event"
      ]
    },
    {
      name: "Event Pro",
      price: "Rp 4.500.000",
      isRecommended: true,
      note: "Ideal untuk event profesional dengan kebutuhan fitur lengkap seperti pendaftaran, check-in, live streaming, dll",
      features: [
        "Semua yang ada di Paket Event Basic, plus:",
        "3-8 Halaman Landing Page Event",
        "Hosting 6 bulan",
        "Sistem Pendaftaran Online & Bukti Pembayaran secara Digital ",
        "Fitur Live Streaming dan Check-in Peserta",
        "Sistem Manajemen Peserta",
        "Sertifikat Digital Otomatis",
        "Admin dashboard lengkap",
        "Basic SEO optimization",
        "3x Revisi Gratis",
        "3 bulan support & maintenance",
        "Full Support Selama Event"
      ]
    },
    {
      name: "Event Enterprise",
      price: "Rp 7.000.000",
      isRecommended: false,
      note: "Untuk event besar dan kompleks seperti konferensi, festival, pameran, dengan kebutuhan fitur sangat lengkap dan kustomisasi tinggi",
      features: [
        "Semua yang ada di Paket Event Pro, plus:",
        "Sistem Pendaftaran Online & Pembayaran Terintegrasi dengan Payment Gateway (Midtrans, Xendit, dll)",
        "Request fitur tambahan (Tiket, Sponsorship, Kalendar, Badge, Paket, dll)",
        "Sistem Manajemen Peserta Lanjutan (Check-in, Badge, dll)",
        "Fitur Interaktif (Q&A, Polling, Networking, dll)",
        "Advanced SEO optimization",
        "5x Revisi Gratis",
        "6 bulan support & maintenance",
        "Full Support Selama Event"
      ]
    }
  ]
};

const SKILLS = [
  {
    name: "HTML5",
    type: "tech",
    icon: FaHtml5
  },
  {
    name: "CSS3",
    type: "tech",
    icon: FaCss3Alt
  },
  {
    name: "JavaScript",
    type: "tech",
    icon: FaJs
  },
  {
    name: "Wordpress",
    type: "tech",
    icon: SiWordpress
  },
  {
    name: "React",
    type: "tech",
    icon: FaReact
  },
  {
    name: "Next.js",
    type: "tech",
    icon: SiNextdotjs
  },
  {
    name: "Tailwind CSS",
    type: "tech",
    icon: SiTailwindcss
  },
  {
    name: "Node.js",
    type: "tech",
    icon: FaNodeJs
  },
  {
    name: "Express",
    type: "tech",
    icon: SiExpress
  },
  {
    name: "Laravel",
    type: "tech",
    icon: FaLaravel
  },
  {
    name: "PHP",
    type: "tech",
    icon: SiPhp
  },
  {
    name: "Firebase",
    type: "tech",
    icon: SiFirebase
  },
  {
    name: "PostgreSQL",
    type: "tech",
    icon: SiPostgresql
  },
  {
    name: "MySQL",
    type: "tech",
    icon: SiMysql
  },
  {
    name: "Docker",
    type: "tech",
    icon: FaDocker
  },
];

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "CEO, TechStart Indonesia",
    quote: "Website yang dibuat sangat profesional dan loading speednya luar biasa cepat. ROI naik 150% setelah launching!"
  },
  {
    name: "Sarah Wijaya",
    role: "Marketing Director, GrowthCo",
    quote: "Proses development sangat smooth, komunikasi excellent, dan hasil akhir melebihi ekspektasi. Highly recommended!"
  },
  {
    name: "Ahmad Rahman",
    role: "Founder, LocalBiz",
    quote: "From zero to hero! Website e-commerce yang dibangun meningkatkan sales online kami hingga 300% dalam 3 bulan."
  }
];

const FAQ_DATA = [
  {
    question: "Berapa lama waktu pengerjaan website?",
    answer: "Waktu pengerjaan bervariasi tergantung kompleksitas: Landing Page (1-2 minggu), Company Profile (2-3 minggu), Toko Online (3-4 minggu), Event Platform (2-3 minggu). Semua timeline sudah termasuk revisi dan testing."
  },
  {
    question: "Apakah website yang dibuat responsive dan SEO-friendly?",
    answer: "Ya, semua website yang saya buat 100% responsive (mobile-first design) dan sudah dioptimasi untuk SEO. Termasuk meta tags, structured data, sitemap, dan optimasi kecepatan loading."
  },
  {
    question: "Apakah saya bisa request fitur khusus yang tidak ada di paket?",
    answer: "Tentu! Saya sangat fleksibel dengan custom requirements. Kita bisa diskusikan kebutuhan spesifik Anda dan saya akan berikan quotation yang sesuai dengan fitur yang diinginkan. Silahkan hubungi saya melalui kontak yang telah disediakan."
  },
  {
    question: "Saya gaptek, apa bisa mengelola websitenya sendiri?",
    answer: "Bisa banget! Saya akan memberikan dokumentasi lengkap dan video tutorial cara mengelola website. Saya juga bisa adakan sesi training singkat agar Anda lebih paham."
  },
  {
    question: "Bagaimana sistem pembayaran dan apakah ada jaminan?",
    answer: "Pembayaran bisa dilakukan bertahap: 50% di awal, 50% setelah website selesai. Saya memberikan garansi bug-fix selama 3 bulan dan support teknis sesuai paket yang dipilih."
  },
  {
    question: "Apakah website akan diberikan source code dan tutorial?",
    answer: "Ya, Anda akan mendapatkan source code lengkap, dokumentasi, dan tutorial cara maintenance dasar. Saya juga menyediakan training session jika diperlukan."
  },
  {
    question: "Teknologi apa yang digunakan untuk membangun website?",
    answer: "Saya menggunakan teknologi modern seperti Wordpress/React/Next.js untuk frontend, Node.js/Laravel untuk backend, dan database PostgreSQL/MySQL. Semua dipilih berdasarkan kebutuhan project Anda."
  },
  {
    question: "Apakah saya perlu menyediakan hosting dan domain sendiri?",
    answer: "Tentu! Saya juga bisa mengelola hosting dan domain. Saya akan memberikan quotation yang sesuai dengan kebutuhan Anda. Silahkan hubungi saya melalui kontak yang telah disediakan."
  },
  {
    question: "Apakah bisa request desain khusus?",
    answer: "Tentu! Saya bisa bekerja dengan desain yang Anda sediakan atau membantu membuat desain sesuai brand identity Anda. Kita bisa diskusikan lebih lanjut mengenai kebutuhan desain Anda."
  }
];

export default function App() {
  const PROFILE_CONFIG = {
    profilePhoto: "/assets/metampan.png", // Add your profile photo here
    showProfilePhoto: true, // Set to true when you add your photo
    logoUrl: "/assets/bersite.png" // Your logo path
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const visibleProjects = 3;

  // Calculate max slides - untuk 6 projects, kita bisa slide sebanyak jumlah projects (seamless loop)
  const maxSlides = PROJECTS.length;

  // Helper function to get visible projects with circular looping
  const getVisibleProjects = (startIndex) => {
    const projects = [];
    for (let i = 0; i < visibleProjects; i++) {
      const index = (startIndex + i) % PROJECTS.length;
      projects.push(PROJECTS[index]);
    }
    return projects;
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide effect - only if more than 3 projects and not mobile
  useEffect(() => {
    if (PROJECTS.length > visibleProjects && !isMobile) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % maxSlides);
      }, 20000); // Memperlambat ke 20 detik

      return () => clearInterval(timer);
    }
  }, [PROJECTS.length, visibleProjects, isMobile, maxSlides]);

  // Navigation functions - scroll one project at a time with smooth transition
  const nextProject = () => {
    if (isTransitioning) return;
    setSlideDirection('right');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % maxSlides);
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection('');
    }, 500);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setSlideDirection('left');
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
    setTimeout(() => {
      setIsTransitioning(false);
      setSlideDirection('');
    }, 500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextProject();
    } else if (distance < -minSwipeDistance) {
      prevProject();
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    project: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedNiche, setSelectedNiche] = useState('landing-page');
  const [openFaq, setOpenFaq] = useState(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [currentCopyIndex, setCurrentCopyIndex] = useState(0);
  const [isClickScrolling, setIsClickScrolling] = useState(false);

  const roles = ['Full-Stack', 'Freelance', 'Professional', 'Experienced'];

  const copywritingMessages = [
    {
      mainText: "Website Profesional untuk",
      highlight: "Meningkatkan Penjualan Bisnis Anda",
      subtitle: "Dapatkan website yang tidak hanya terlihat menarik, tetapi juga menghasilkan leads dan meningkatkan omset bisnis Anda hingga 300% 🚀"
    },
    {
      mainText: "Solusi Digital Terpercaya untuk",
      highlight: "Mengembangkan Bisnis",
      subtitle: "Dari landing page sampai toko online, kami bantu wujudkan website impian yang bikin kompetitor iri 💼"
    },
    {
      mainText: "Website Modern & Responsif untuk",
      highlight: "Menjangkau Lebih Banyak Customer",
      subtitle: "80% pembeli browsing via mobile. Pastikan website Anda perfect di semua device untuk maksimalkan conversion 📱"
    },
    {
      mainText: "Partner Digital Agency untuk",
      highlight: "Kesuksesan Online Anda",
      subtitle: "Pengalaman mengembangkan lebih dari 15 project, memberikan support cepat dan komitmen memberikan hasil terbaik dalam waktu 1-4 minggu 💪"
    }
  ];

  // Function to highlight keywords in text
  const highlightText = (text) => {
    const keywords = {
      '300%': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      '80%': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      'kompetitor iri': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      'browsing via mobile': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      'kredibilitas tinggi': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      'otomatis': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      '5+ tahun': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      '50+ klien puas': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold',
      '1-4 minggu': 'text-yellow-300 bg-yellow-300/20 px-2 py-1 rounded font-bold'
    };

    let highlightedText = text;
    Object.keys(keywords).forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, `<span class="${keywords[keyword]}">$1</span>`);
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // Rotating text effect for roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Rotating copywriting messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCopyIndex((prev) => (prev + 1) % copywritingMessages.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Scroll handling and active section detection
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);

          // Skip scroll detection if user just clicked a navbar item
          if (isClickScrolling) {
            ticking = false;
            return;
          }

          // Get all sections
          const sections = ['about', 'projects', 'services', 'contact', 'faq'];
          const scrollPosition = window.scrollY + 200; // Fixed offset

          let currentSection = 'about'; // Default section

          // Find which section is currently in view
          sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
              const sectionTop = section.offsetTop;

              // Check if we've scrolled past this section
              if (scrollPosition >= sectionTop - 100) {
                currentSection = sectionId;
              }
            }
          });

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call to set active section on page load
    setTimeout(handleScroll, 100); // Delay to ensure DOM is ready

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClickScrolling]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Immediately set the active section
      setActiveSection(sectionId);

      // Set flag to prevent scroll listener from interfering
      setIsClickScrolling(true);

      // Start smooth scrolling
      element.scrollIntoView({ behavior: 'smooth' });

      // Reset the flag after scroll animation completes (typically 1-2 seconds)
      setTimeout(() => {
        setIsClickScrolling(false);
      }, 1500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Add form data to Firestore
      const docRef = await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        project: formData.project,
        timestamp: new Date(),
        status: 'new'
      });

      console.log('Document written with ID: ', docRef.id);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', project: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className="min-h-screen bg-white overflow-x-hidden pt-16 md:pt-20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <img
                src={PROFILE_CONFIG.logoUrl}
                alt="Logo"
                className="w-8 md:w-10"
              />
              <div className="text-xl md:text-3xl font-bold text-gray-900">
                Ber<span className="text-indigo-600">Studio</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-6 lg:space-x-10">
              <button onClick={() => scrollToSection('about')} className={`text-sm lg:text-lg font-medium transition-colors ${activeSection === 'about' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-700 hover:text-indigo-600'
                }`}>
                Tentang Saya
              </button>
              <button onClick={() => scrollToSection('projects')} className={`text-sm lg:text-lg font-medium transition-colors ${activeSection === 'projects' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-700 hover:text-indigo-600'
                }`}>
                Portfolio
              </button>
              <button onClick={() => scrollToSection('services')} className={`text-sm lg:text-lg font-medium transition-colors ${activeSection === 'services' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-700 hover:text-indigo-600'
                }`}>
                Paket Harga
              </button>
              <button onClick={() => scrollToSection('contact')} className={`text-sm lg:text-lg font-medium transition-colors ${activeSection === 'contact' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-700 hover:text-indigo-600'
                }`}>
                Kontak
              </button>
              <button onClick={() => scrollToSection('faq')} className={`text-sm lg:text-lg font-medium transition-colors ${activeSection === 'faq' ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1' : 'text-gray-700 hover:text-indigo-600'
                }`}>
                FAQ
              </button>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-indigo-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* Jumbotron Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 text-white pt-4 pb-16 sm:pt-12 sm:pb-20 lg:pt-12 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Dynamic Rotating Headlines */}
            <div className="min-h-[180px] sm:min-h-[220px] lg:min-h-[280px] flex items-center justify-center">
              <div key={currentCopyIndex} className="animate-fadeInUp">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {copywritingMessages[currentCopyIndex].mainText}{' '}
                  <span className="text-yellow-300">{copywritingMessages[currentCopyIndex].highlight}</span>
                </h1>
              </div>
            </div>

            <div key={`subtitle-${currentCopyIndex}`} className="animate-fadeInUp delay-300 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 md:mb-12 leading-loose px-2 mt-0 lg:-mt-16">
              {highlightText(copywritingMessages[currentCopyIndex].subtitle)}
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2 mb-8">
              {copywritingMessages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCopyIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentCopyIndex
                    ? 'bg-yellow-400 scale-125'
                    : 'bg-white/30 hover:bg-white/50'
                    }`}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl"
              >
                Lihat Portfolio Saya
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl text-base md:text-lg font-semibold hover:bg-white hover:text-indigo-600 transition-all"
              >
                Mulai Project Anda
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-3 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-1 md:mb-2">
                <IsolatedCounter end={15} suffix="+" />
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-900">Project Selesai</div>
              <div className="hidden md:block text-base text-gray-600 mt-1">Website berkualitas tinggi</div>
            </div>

            <div className="p-3 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-1 md:mb-2">
                <IsolatedCounter end={99} suffix="%" />
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-900">Client Puas</div>
              <div className="hidden md:block text-base text-gray-600 mt-1">Testimoni positif</div>
            </div>

            <div className="p-3 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-1 md:mb-2">
                <IsolatedCounter end={98} suffix="%" />
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-900">Tepat Waktu</div>
              <div className="hidden md:block text-base text-gray-600 mt-1">Sesuai deadline</div>
            </div>

            <div className="p-3 md:p-6">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-600 mb-1 md:mb-2">
                <IsolatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-base md:text-xl font-semibold text-gray-900">Fast Response</div>
              <div className="hidden md:block text-base text-gray-600 mt-1">Support siap membantu</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tentang Saya Section */}
      <section id="about" className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span
                  key={currentRole}
                  className="inline-block text-indigo-600 animate-fadeInUp"
                >
                  {roles[currentRole]}
                </span>
                <span className="text-gray-900"> Web Developer</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mt-4 lg:mt-6 leading-relaxed text-justify">
                Saya adalah web developer berpengalaman dalam membangun website profesional yang tidak hanya menarik secara visual, tetapi juga fungsional dan dioptimasi untuk performa tinggi. Dengan keahlian di berbagai teknologi web modern, saya berkomitmen untuk membantu bisnis Anda tumbuh dan sukses di dunia digital.
              </p>
              <div className="mt-6 lg:mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 p-4 lg:p-6 rounded-xl border-l-4 border-indigo-500">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span>
                  Mengapa Memilih Saya?
                </h3>
                <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 mr-3 lg:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Website live dalam 1-4 minggu</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 mr-3 lg:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Loading speed optimal & SEO ready</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600 mr-3 lg:mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Support & maintenance berkelanjutan</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:justify-self-end relative order-1 lg:order-2 flex justify-center lg:justify-end">
              {/* Decorative boxes */}
              <div className="absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-64 h-72 lg:w-72 lg:h-92 bg-indigo-200 rounded-2xl transform rotate-6 opacity-60"></div>
              <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-64 h-64 lg:w-72 lg:h-72 bg-purple-200 rounded-2xl transform -rotate-3 opacity-40"></div>

              {/* PROFILE PHOTO - Controlled by PROFILE_CONFIG */}
              <div className="relative w-64 h-80 lg:w-80 lg:h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 flex items-center justify-center overflow-hidden">
                {PROFILE_CONFIG.showProfilePhoto ? (
                  <img
                    src={PROFILE_CONFIG.profilePhoto}
                    alt="Profile Photo"
                    className="w-full object-fit object-top"
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="text-base lg:text-lg font-medium">Foto Profile</div>
                    <div className="text-xs lg:text-sm text-gray-600">Set showProfilePhoto: true</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Running Tech Stack Bar */}
      <div className="bg-indigo-600 py-6 lg:py-8 overflow-hidden">
        <div className="animate-scroll flex items-center space-x-8 lg:space-x-16">
          {/* First set */}
          {SKILLS.filter(skill => skill.type === 'tech').map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <div key={`first-${idx}`} className="flex items-center flex-shrink-0">
                <IconComponent className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
              </div>
            );
          })}

          {/* Second set for seamless loop */}
          {SKILLS.filter(skill => skill.type === 'tech').map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <div key={`second-${idx}`} className="flex items-center flex-shrink-0">
                <IconComponent className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
              </div>
            );
          })}

          {/* Third set for extra smoothness */}
          {SKILLS.filter(skill => skill.type === 'tech').map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <div key={`third-${idx}`} className="flex items-center flex-shrink-0">
                <IconComponent className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
              </div>
            );
          })}

          {/* Fourth set for maximum seamless effect */}
          {SKILLS.filter(skill => skill.type === 'tech').map((skill, idx) => {
            const IconComponent = skill.icon;
            return (
              <div key={`fourth-${idx}`} className="flex items-center flex-shrink-0">
                <IconComponent className="w-10 h-10 lg:w-14 lg:h-14 text-white" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects Section */}
      <section id="projects" className="pt-16 pb-24 lg:pt-20 lg:pb-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Beberapa project terpilih yang menunjukkan kemampuan dan kualitas kerja saya.
            </p>
          </div>

          {/* Desktop Carousel */}
          {!isMobile && (
            <div className="relative px-16 pb-16">
              {/* Navigation Buttons - Fixed position relative to carousel container */}
              {PROJECTS.length > visibleProjects && (
                <>
                  <button
                    onClick={prevProject}
                    className="absolute -left-4 top-48 z-20 bg-white hover:bg-indigo-50 text-indigo-600 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-2 border-indigo-100 hover:border-indigo-300"
                  >
                    <svg className="w-7 h-7 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextProject}
                    className="absolute -right-4 top-48 z-20 bg-white hover:bg-indigo-50 text-indigo-600 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group border-2 border-indigo-100 hover:border-indigo-300"
                  >
                    <svg className="w-7 h-7 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Projects Container with Smooth Sliding */}
              <div className="overflow-hidden">
                <div className={`flex transition-all duration-500 ease-out ${isTransitioning ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                  {getVisibleProjects(currentIndex).map((project, index) => (
                    <div
                      key={`${project.id}-${currentIndex}-${index}`}
                      className={`w-1/3 flex-shrink-0 px-4 ${isTransitioning && slideDirection === 'right' ? 'carousel-slide-right' : ''} ${isTransitioning && slideDirection === 'left' ? 'carousel-slide-left' : ''} ${isTransitioning ? 'carousel-fade-slide' : ''}`}
                    >
                      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl project-card-transition overflow-hidden border border-gray-100 hover:border-indigo-200 h-full">
                        {/* Image Container with Height Expand Effect - Expand downward only */}
                        <div className="relative overflow-hidden transition-all duration-700 ease-out h-48 group-hover:h-[350px]">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-cover object-top transition-none min-h-full group-hover:h-[350px]"
                          />

                          {/* Overlay with Demo Button - Fixed at bottom */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6 h-20">
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-gray-900 px-8 py-3 rounded-xl text-lg font-bold hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl z-10"
                            >
                              🚀 Live Demo
                            </a>
                          </div>

                          {/* Scroll Indicator */}
                          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500">
                            📄 Full Preview
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-indigo-100 text-indigo-800 text-sm px-4 py-2 rounded-full font-medium group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot Indicators - Show current position if more than 3 projects */}
              {PROJECTS.length > visibleProjects && (
                <div className="flex justify-center space-x-2 mt-8">
                  {PROJECTS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-indigo-600 scale-125'
                        : 'bg-gray-300 hover:bg-indigo-400'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Mobile Carousel */}
          {isMobile && (
            <div className="px-4 pb-12">
              <div
                className="overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className={`flex transition-all duration-500 ease-out ${isTransitioning ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                  {getVisibleProjects(currentIndex).slice(0, 1).map((project, index) => (
                    <div
                      key={project.id}
                      className={`w-full flex-shrink-0 px-2 ${isTransitioning && slideDirection === 'right' ? 'carousel-slide-right' : ''} ${isTransitioning && slideDirection === 'left' ? 'carousel-slide-left' : ''} ${isTransitioning ? 'carousel-fade-slide' : ''}`}
                    >
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 max-w-sm mx-auto project-card-transition">
                        {/* Mobile Image Container - Fixed height, no expand */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Buttons at bottom */}
                          <div className="pt-2 border-t border-gray-100">
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all duration-300"
                            >
                              🚀 Live Demo
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {Array.from({ length: maxSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                      ? 'bg-indigo-600 scale-125'
                      : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>

              {/* Mobile swipe indicator */}
              <div className="text-center mt-4 text-sm text-gray-500">
                Swipe untuk melihat project lainnya →
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Website Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket include responsive design dan SEO optimization.
          </p>

          {/* Niche Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { key: 'landing-page', label: 'Landing Page' },
              { key: 'company-profile', label: 'Company Profile' },
              { key: 'toko-online', label: 'Toko Online' },
              { key: 'event-seminar', label: 'Event & Seminar' }
            ].map((niche) => (
              <button
                key={niche.key}
                onClick={() => setSelectedNiche(niche.key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${selectedNiche === niche.key
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {niche.label}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES[selectedNiche].map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${pkg.isRecommended ? 'ring-2 ring-indigo-500' : 'border border-gray-200'
                  }`}
              >
                {pkg.isRecommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-5 py-2 rounded-full text-base font-semibold">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-indigo-600 mb-6">{pkg.price}</div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${pkg.isRecommended
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                      }`}
                  >
                    Pilih Paket
                  </button>
                  {pkg.note && (
                    <p className="text-sm text-gray-500 text-center mt-3 italic">
                      *{pkg.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section id="why-choose" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Kenapa Harus di Ber<span className="text-indigo-600">Studio</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beberapa alasan mengapa BerStudio menjadi pilihan terbaik untuk mengembangkan website Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pengerjaan Cepat</h3>
              <p className="text-gray-600">Website Anda siap dalam 1-4 minggu dengan quality assurance yang ketat dan testing menyeluruh</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kualitas Terjamin</h3>
              <p className="text-gray-600">Website yang dioptimasi untuk SEO dan loading speed, memastikan ranking tinggi di Google</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dukungan Penuh Untuk Anda</h3>
              <p className="text-gray-600">Mendapatkan support teknis dan maintenance hingga 6 bulan setelah website launch</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Harga Transparan</h3>
              <p className="text-gray-600">Pricing yang jelas tanpa biaya tersembunyi, dengan garansi uang kembali jika tidak puas</p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tinggal Terima Beres</h3>
              <p className="text-gray-600">Dari konsep hingga launching, semua ditangani profesional. Kamu tinggal fokus ke bisnis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Testimoni dari klien yang puas dengan hasil kerja dan service yang diberikan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6">
                  <svg className="w-8 h-8 text-indigo-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-base text-gray-500 font-medium">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Siap untuk membawa bisnis Anda ke level selanjutnya? Mari diskusikan project Anda!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          Terima kasih! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800">
                          Terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi melalui WhatsApp.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-3">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-base font-semibold text-gray-700 mb-3">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="081234567890 atau +6281234567890"
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-base font-semibold text-gray-700 mb-3">
                    Deskripsikan Project Anda
                  </label>
                  <textarea
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Ceritakan tentang website yang ingin Anda bangun..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transform hover:scale-105 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Pesan'
                  )}
                </button>
              </form>
            </div>

            <div className="lg:pl-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Kontak Langsung</h3>
              <div className="space-y-4">
                <a
                  href="mailto:berkaaldizar8@gmail.com"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-indigo-600 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">berkaaldizar8@gmail.com</div>
                  </div>
                </a>

                {/* WhatsApp contact button */}
                <a
                  href="https://wa.me/6289517839374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-green-600 mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">WhatsApp</div>
                    <div className="text-gray-600">+62 895-1783-9374</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/berka-aldizar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6 text-blue-600 mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">LinkedIn</div>
                    <div className="text-gray-600">linkedin.com/in/berka-aldizar</div>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-6 bg-indigo-50 rounded-xl">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Mengapa Memilih Saya?</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Response time maksimal 2 jam
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Konsultasi 100% Gratis
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Source code ownership penuh
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Pertanyaan yang Sering Ditanyakan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Temukan jawaban untuk pertanyaan-pertanyaan umum seputar jasa pembuatan website
            </p>
          </div>

          <div className="space-y-6">
            {FAQ_DATA.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Bottom CTA Jumbotron */}
      <section className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 text-white py-20 sm:py-32">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Siap Mengubah Bisnis Anda dengan{' '}
              <span className="text-yellow-400">Website Profesional?</span>
            </h2>
            <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Jangan biarkan kompetitor Anda unggul! Mulai sekarang dan rasakan perbedaan website yang{' '}
              <strong className="text-yellow-400">benar-benar menghasilkan</strong> untuk bisnis Anda
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center text-lg">
              <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Konsultasi Gratis</span>
            </div>
            <div className="flex items-center text-lg">
              <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Response Cepat</span>
            </div>
            <div className="flex items-center text-lg">
              <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Garansi Kepuasan</span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center">
            <a
              href="https://wa.me/6289517839374?text=Halo! Saya tertarik dengan jasa pembuatan website Anda. Bisa kita diskusi lebih lanjut?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all shadow-2xl"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Chat via WhatsApp Sekarang
            </a>
            <button
              onClick={() => scrollToSection('services')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              Lihat Paket Harga
            </button>
          </div>

          <div className="mt-8 text-base text-gray-300 font-medium">
            <p>💬 <strong>Online sekarang</strong> - Siap membantu Anda 24/7</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 border-t-4 border-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"><span className='text-gray-400'>Ber</span>Studio</div>
              <div className="text-lg text-gray-300">© 2025 BerStudio. All rights reserved.</div>
              <div className="text-base text-gray-400 mt-2">Crafted with ❤️ for your business success</div>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://github.com/brrrka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com/in/berka-aldizar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              <a
                href="mailto:berkaaldizar8@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/6289517839374?text=Halo,%20saya%20ingin%20menghubungi%20Anda."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
        aria-label="Contact via WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      </a>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
