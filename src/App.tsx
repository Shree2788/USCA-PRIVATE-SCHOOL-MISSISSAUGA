/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  GraduationCap, 
  Users, 
  MapPin, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronDown, 
  X, 
  Phone, 
  Mail, 
  ArrowRight,
  Star,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

// --- Types ---
type Program = 
  | 'OSSD - Grade 9'
  | 'OSSD - Grade 10'
  | 'OSSD - Grade 11'
  | 'OSSD - Grade 12'
  | 'University Prep Program - Grade 12';

// --- Data ---
const faqs = [
  { question: "What’s the best private school in Mississauga, Toronto, and Ontario?", answer: "USCA Academy is one of the best private schools in Mississauga, Toronto, and Ontario. Families love our small class sizes, personalized learning, and excellent programs for local and international students." },
  { question: "Does USCA Academy accept international students?", answer: "Yes, USCA Academy is proud to welcome international students. We provide ESL, IELTS, and TOEFL programs to help them succeed in the Canadian education system." },
  { question: "What programs does USCA Academy offer for students?", answer: "USCA Academy provides: Elementary and middle school programs (Grades 1-8), High school programs for the Ontario Secondary School Diploma (OSSD), University preparation programs to help students get into top universities, Language coaching, including IELTS, TOEFL, and ESL, for international students." },
  { question: "Are extracurricular activities available at USCA Academy?", answer: "Yes, we provide a variety of extracurricular activities like sports, arts, and academic clubs. These activities help students grow beyond academics and develop leadership and teamwork skills." },
  { question: "Where USCA Academy student go after graduation?", answer: "USCA Academy is one of the international schools in Ontario and provides excellent guidance to students in choosing the right program for them. We have student get CAD$ 100,000 Scholarship from University of Toronto. We also have students get CAD$10,000-20,000 Scholarship from different universities, including University of Waterloo. After completing the secondary school program from our International School in Mississauga, students can apply to Canadian University/college. Most of our students have entered the University of Toronto, University of Waterloo, Mcmaster University, Queens University, University of British Columbia,University of Dalhouse, University of British Columbia, University of Alberta, Western University, York University, Ryerson University, University of Windsor, Trent University, University of Guelph, and so on." },
  { question: "How is USCA Academy different from other private schools in Mississauga?", answer: "USCA Academy has highly qualified and caring teachers/stuff with proven traceable results. USCA Academy has small class size, normally its 5-10 students in each class." },
  { question: "How much does it cost to attend USCA Academy?", answer: "The tuition fee varies depending on the grade level. For local students, It’s $7,000 per year for high school students." },
  { question: "What curriculum does USCA Academy follow?", answer: "We follow the Ontario curriculum, which is designed to meet the needs of all learners and prepares them for success in post-secondary education and beyond." },
  { question: "Is USCA Academy an accredited private school?", answer: "Yes, we are an accredited private school. Our accreditation ensures that we meet rigorous standards for academic excellence, student safety, and operational practices." },
  { question: "What is the class size at USCA Academy?", answer: "We maintain small class sizes to ensure that each student receives individualized attention and support. Our class sizes vary depending on the grade level and program, but typically range from 5 to 10 students per class." },
  { question: "What makes USCA Academy an ideal choice for Grade 9–12 and OSSD credit programs?", answer: "USCA Academy is ideal because we bridge the gap between high school and university very effectively. For students in Grade 9 through Grade 12, we offer a structured environment that builds strong study habits and time management skills early on. Our OSSD credit programs are rigorous but we provide the support system students need to excel. We are not just teaching to the test. We are teaching critical thinking skills that universities value. The small class sizes mean students cannot hide, so they stay engaged. Whether a student is looking to upgrade marks or fast track their education, our focused approach ensures they earn their OSSD with grades that open doors." },
  { question: "What are the top benefits of choosing a private school in Mississauga?", answer: "From what I have seen over the years, the biggest benefit is truly the personalized attention every student receives. In a larger setting, it is easy for a quiet student to get lost in the back of the room, but here we know exactly where every child stands academically and emotionally. Parents often tell me they chose us because they wanted an environment where their child is not just a number. We also offer a lot of flexibility that you do not find elsewhere. If a student is strong in a subject, we can let them move faster, or if they are struggling, we immediately offer extra support instead of waiting for a report card. The focused environment also helps because everyone is here to learn, which cuts down on the distractions and social issues you might see in larger schools." },
  { question: "How is a private school different from a public school in Ontario?", answer: "People often assume the curriculum is completely different, but in Ontario we actually follow the same Ministry of Education guidelines so students earn the exact same OSSD diploma. The real difference is in how we deliver that material. Public schools have to follow very rigid structures set by the school board, which means large class sizes and a one size fits all teaching style. At our private school, we have the freedom to adapt. We can tailor our teaching methods to fit the learning styles of the students in the room. We also move much faster when it comes to administration and communication. If a parent has a concern, they deal with me or my staff directly, not a bureaucratic system." },
  { question: "What is the average private school tuition fee in Mississauga?", answer: "This is a very common question because parents want to plan ahead. The honest answer is that it varies quite a bit depending on the grade level and the specific facilities of the school. However, for a reputable private high school in Mississauga like ours, you are generally looking at an annual tuition range between 15000 dollars and 30000 dollars. Some schools might be lower if they have fewer resources, and some elite boarding schools will be significantly higher. It is important to look at what is included in that fee, such as textbooks, extracurriculars, and university guidance support." },
  { question: "How much does private school cost per month in Mississauga?", answer: "Since tuition is usually quoted as a yearly figure, many parents ask me to break it down so they can manage their monthly budget. Most private schools, including USCA Academy, offer flexible payment plans to help families out. If you take a typical yearly tuition of around 18000 dollars, that breaks down to roughly 1800 dollars per month over a ten month school year. We work with families to create a payment schedule that fits their financial situation, whether that is monthly payments or splitting it into semesters. I always tell parents to come in and speak with us directly so we can build a plan that works for them without causing stress." },
  { question: "Is private school worth the investment for my child’s future?", answer: "This is the most important question a parent can ask, and from my years of experience, the answer is usually yes. I have seen countless students who were getting lost in the shuffle or feeling uninspired in other environments completely turn their lives around once they joined us. It is not just about the grades on a report card. It is about the confidence they build and the university preparation they receive. When I see a student who was struggling get accepted into their top choice engineering or business program because of the focused support we gave them, that investment clearly pays off. If it ensures your child is happy, motivated, and on the right path for their career, then it is worth every penny." },
  { question: "What facilities and learning environment do private schools offer?", answer: "When parents tour our facility, they often notice the difference in the learning environment right away. In many public schools, resources are stretched thin, but here we ensure our science labs, computer labs, and study spaces are modern and fully equipped. Beyond the physical building, the environment itself is much more focused. We do not have the overcrowding or the chaotic atmosphere you sometimes see in larger schools. The library is actually a quiet place to study, and classrooms are designed for discussion and interaction. We create a safe space where students feel comfortable focusing on their work without the distractions you might find elsewhere." },
  { question: "How do private schools support individual learning and smaller class sizes?", answer: "This is really the core of what we do. Because we maintain small class sizes, a teacher is not just lecturing to a crowd of thirty or forty students. They actually know how your child learns. If a student is a visual learner, we adjust. If they learn by doing, we provide hands-on activities. In a large public school, the teacher often has to teach to the middle of the class and hope for the best. Here, if a student is falling behind, we catch it immediately and offer one-on-one help. We do not wait for a midterm report card to realize a student is struggling. We support them in real time." },
  { question: "What curriculum do private schools in Mississauga follow (Ontario, IB, Cambridge, etc.)?", answer: "There is a bit of variety in the city, but the vast majority of reputable private schools in Mississauga, including USCA Academy, follow the Ontario Curriculum. This is the standard set by the Ministry of Education. We do this to ensure that when students graduate, they receive the Ontario Secondary School Diploma (OSSD), which is what universities recognize and require. While some schools might offer specialized programs like the International Baccalaureate or Advanced Placement (AP), we focus on delivering the Ontario curriculum with a high degree of rigor and university preparation. We are not reinventing the wheel regarding curriculum requirements, but we teach it with a much stronger focus on preparing students for the demands of university." },
  { question: "How do private schools prepare students for university and careers?", answer: "In my experience, the transition to university can be a shock for many students, but we work very hard to bridge that gap while they are still with us. We do not just focus on the curriculum content. We focus on the skills they need to survive and thrive in a university setting. This means time management, self advocacy, and independent study habits. Our teachers operate with university level expectations regarding deadlines and essay formatting, so students are not overwhelmed when they first step onto a campus. I also personally meet with students to review their career goals and help them choose the right courses. Because we have specific university guidance programs, we help them navigate the complex application process to ensure they get into the programs that actually match their career aspirations." },
  { question: "What is the student-teacher ratio in top private schools in Mississauga?", answer: "This is usually the biggest selling point for parents. In the public system, you often see classes of 25 to 30 students or even more. In top private schools here in Mississauga, we aim to keep that number much lower. On average, you will see ratios of about 15 to 1, and in many of our classes it is even lower than that. This does not just mean more space in the classroom. It means that when a teacher asks a question, they have the time to actually listen to the answer. It ensures that no student can hide in the back of the room. The teacher knows exactly who is understanding the material and who needs help, which makes a massive difference in learning outcomes." },
  { question: "What should parents look for when selecting the best private school in Mississauga?", answer: "I always tell parents to look beyond the marketing materials and visit the school in person. When you walk through the halls, do the students look happy and engaged? Do the teachers know the students names? You should ask about the university acceptance rate and specifically where graduates have been accepted. Look at the class sizes and ask about the qualifications of the teachers. It is also important to get a feel for the administration. Are they approachable? Do they listen to your concerns? The right school is not just about the best facilities, but about finding a partnership where the school supports your specific family values and your child’s specific learning needs." },
  { question: "How does the admission process work for private schools in Mississauga?", answer: "From my side of the desk, I try to keep the admission process as simple and stress free as possible for families. It generally starts with an initial inquiry where I ask to see the student’s previous report cards or transcripts. This gives me a clear picture of their academic history. We then sit down for an interview or an assessment to understand the student’s goals and personality. I am not just looking for high grades. I want to see if the student is willing to learn and if our school is the right fit for their needs. For international students, we might also assess their English proficiency to ensure they can handle the coursework. Once we decide to move forward, we handle the paperwork and enrollment forms to get them registered for their classes." },
  { question: "How does USCA Academy support international students with academics, accommodation, and visa guidance?", answer: "Supporting international students is a huge part of what we do here, and I treat every international student like they are my own child visiting a new country. Academically, we offer ESL courses and we modify our teaching to help students who are still mastering English. For accommodation, we work closely with trusted homestay families and local residences to ensure students have a safe and comfortable place to live. Regarding visas, while we cannot issue the study permit ourselves, we provide the official Letter of Acceptance and guide parents on the specific documents and requirements they need for their visa application. We walk them through the process step by step so they are not doing it alone." },
  { question: "What are the success rates of USCA Academy students in getting admissions to top universities in Canada, the USA, and the UK?", answer: "I am incredibly proud of the track record we have built at USCA Academy. Over the years, we have maintained a very high success rate for university admissions. The vast majority of our graduating students receive offers from their top choice universities. We regularly see students getting into top Canadian institutions like the University of Toronto, Waterloo, and McMaster. We also have a strong history of students heading to prestigious universities in the USA and the UK. Because we focus so heavily on preparing them for the academic rigors of these schools, they tend to handle the transition very well and succeed once they get there." },
  { question: "How flexible are course schedules at USCA Academy for transfer students and fast-track learners?", answer: "Flexibility is one of our greatest strengths. We understand that not every student follows the same timeline or path. For transfer students coming from different school systems or countries, we assess their previous credits carefully so they do not have to retake courses they have already mastered. We can create a custom schedule that fits their specific graduation timeline. For fast track learners who want to graduate early or upgrade a specific mark quickly, we offer semesters and opportunities to take extra credits throughout the year. We build the timetable around the student’s goals rather than forcing the student to fit into a rigid block schedule." }
];

// --- Components ---

const Button = ({ children, onClick, className = '', variant = 'primary' }: { children: React.ReactNode, onClick?: () => void, className?: string, variant?: 'primary' | 'secondary' | 'outline' }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-amber-500 text-blue-800 hover:bg-amber-400 focus:ring-amber-500 shadow-lg hover:shadow-xl",
    secondary: "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-600 shadow-lg hover:shadow-xl",
    outline: "bg-transparent border-2 border-blue-800 text-blue-800 hover:bg-blue-50 focus:ring-blue-800"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '' as Program | ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_calling_code) {
          setCountryCode(data.country_calling_code);
        }
      })
      .catch(err => console.error('Error fetching country code:', err));
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const utmData: Record<string, string> = {};
    const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'placement', 'utm_adgroup', 'matchtype', 'utm_device'];
    keys.forEach(key => {
      utmData[key] = params.get(key) || '';
    });

    const submissionData = {
      ...formData,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      ...utmData
    };

    // Push to dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_submit_success',
      form_data: submissionData
    });

    try {
      const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || "https://script.google.com/macros/s/AKfycbwW1mWRJji4j4bnqLa90hU79DkI-9XnKCvDHyT7EeIbs9cPVnvWHPm1nx3_rOFkHBpu/exec";
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
      } else {
        console.log("Form submission data (Webhook URL not set):", submissionData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', program: '' });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-blue-800/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="relative p-8">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">We've received your request. Our admissions team will contact you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-blue-800 mb-2">Book Your Campus Tour</h2>
                    <p className="text-gray-600 text-sm">Fill out the form below and we'll be in touch to schedule your visit.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm font-medium">
                          {countryCode}
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          required
                          className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">Interested Program *</label>
                      <select
                        id="program"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors bg-white"
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value as Program })}
                      >
                        <option value="" disabled>Select a program</option>
                        <option value="OSSD - Grade 9">OSSD - Grade 9</option>
                        <option value="OSSD - Grade 10">OSSD - Grade 10</option>
                        <option value="OSSD - Grade 11">OSSD - Grade 11</option>
                        <option value="OSSD - Grade 12">OSSD - Grade 12</option>
                        <option value="University Prep Program - Grade 12">University Prep Program - Grade 12</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg mt-6"
                    >
                      Secure Your Spot
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-blue-800 group-hover:text-blue-600 transition-colors">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-200 selection:text-blue-800">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white z-30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="https://www.uscaacademy.com/wp-content/uploads/2026/02/USCA-Academy-Logo.png" alt="USCA Academy Logo" className="w-auto h-12 object-contain" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=USCA&background=1e3a8a&color=fff'; }} />
            <span className="text-2xl font-bold text-blue-800 tracking-tight hidden sm:block">USCA Academy</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Button onClick={openModal} className="hidden md:flex px-6 py-2.5 text-sm">Book Tour</Button>
            <a 
              href="https://wa.me/19052320411?text=I%20am%20interested%20in%20USCA%20Academy%27s%20Primary%20School%20Program" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white p-2.5 rounded-full shadow-md hover:scale-105 transition-transform flex items-center justify-center"
              title="WhatsApp Us"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.061 3.962L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.004-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-blue-800">
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-800/80 to-transparent" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/50 border border-blue-800/50 text-amber-400 text-sm font-semibold mb-8 backdrop-blur-sm">
              <Star className="w-4 h-4 fill-amber-400" />
              Premier Private Education in Mississauga
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 leading-tight">
              Your Child Deserves More Than a <span className="text-amber-500 relative whitespace-nowrap">
                Number
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span> in a Classroom
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Small Classes. Big Results. Top University Acceptances. USCA Academy gives your child the individual attention they need to excel, without the $30K+ price tag of elite schools.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-2 mb-16">
              <Button onClick={openModal} className="w-full sm:w-auto text-lg px-10 py-5">
                Book Your Campus Tour <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-blue-200 font-medium">Takes only 30 seconds • No commitment required</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left mb-12">
              {[
                { icon: ShieldCheck, text: "Inspected & Accredited by Ontario Ministry of Education" },
                { icon: GraduationCap, text: "100% University Acceptance Rate" },
                { icon: Users, text: "Average Class Size: 5-15 Students" }
              ].map((badge, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <badge.icon className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-white leading-snug">{badge.text}</span>
                </div>
              ))}
            </div>

            <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/KBxl71OaDm0?start=65" 
                title="USCA Academy Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
              Is Your Child Getting Lost in the Public School System?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Large class sizes mean teachers can't give every student the attention they deserve. Bright students coast without being challenged. Struggling students fall behind without anyone noticing. And parents feel powerless watching their child's potential slip away.
            </p>
            <div className="inline-block bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <p className="text-xl font-semibold text-amber-900">
                At USCA Academy, we saw this problem and built something better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-slate-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
              A Private School Experience That Actually Fits Your Budget
            </h2>
            <p className="text-xl text-gray-600">What Makes USCA Academy Different</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Small Classes, Big Impact",
                desc: "With only 5-15 students per class, teachers know your child's strengths, challenges, and learning style. No one gets lost in the crowd."
              },
              {
                icon: GraduationCap,
                title: "University-Focused from Day One",
                desc: "Our graduates don't just get into university, they get into UofT, Waterloo, McMaster, and Western. Many with scholarships up to $100,000."
              },
              {
                icon: TrendingUp,
                title: "Affordable Excellence",
                desc: "Premium education at $7,000/year for high school (Grades 9-12), not $20,000-$30,000 like other private schools."
              },
              {
                icon: Clock,
                title: "Flexible Learning Paths",
                desc: "5 start dates per year (Sept, Nov, Feb, Apr, July). Your child can accelerate, catch up, or transfer credits seamlessly."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button onClick={openModal} className="px-8 py-4 text-lg">
              Discover the USCA Difference
            </Button>
            <p className="text-sm text-gray-500 mt-3 font-medium">Join 500+ successful graduates. Secure your spot today.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-blue-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Parents & Students Choose USCA Academy Because Results Matter</h2>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {[
              "6dF28MIP-GE?start=36",
              "Umt4CKxJUWI?start=48",
              "wSR24RXZWGQ?start=14",
              "592rw_UyG80?start=30",
              "pNbJXsyx35I?start=30"
            ].map((videoId, i) => (
              <div key={i} className="shrink-0 w-[300px] md:w-[450px] aspect-video snap-center rounded-2xl overflow-hidden shadow-xl bg-black border border-white/10">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${videoId}`} 
                  title={`Testimonial ${i+1}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-3xl py-8 shadow-xl">
            <div className="text-center mb-6">
              <p className="text-sm font-bold uppercase tracking-widest text-blue-800">Top University Acceptances</p>
            </div>
            <div className="overflow-hidden relative w-full">
              <div className="flex w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused] items-center gap-12 md:gap-24 px-12">
                {[
                  { name: 'University of Toronto', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/UofT.png' },
                  { name: 'University of Waterloo', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/Waterloo-2.png' },
                  { name: 'McMaster University', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/McMaster.png' },
                  { name: 'Queen\'s University', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/Queens-1.png' },
                  { name: 'University of British Columbia', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/UBC.png' },
                  { name: 'McGill University', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/McGill.png' },
                ].map((uni, i) => (
                  <img key={i} src={uni.url} alt={uni.name} className="h-16 md:h-20 object-contain shrink-0 hover:scale-105 transition-transform" />
                ))}
                {/* Duplicate for seamless scrolling */}
                {[
                  { name: 'University of Toronto', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/UofT.png' },
                  { name: 'University of Waterloo', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/Waterloo-2.png' },
                  { name: 'McMaster University', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/McMaster.png' },
                  { name: 'Queen\'s University', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/Queens-1.png' },
                  { name: 'University of British Columbia', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/UBC.png' },
                  { name: 'McGill University', url: 'https://www.uscaacademy.com/wp-content/uploads/2025/12/McGill.png' },
                ].map((uni, i) => (
                  <img key={`dup-${i}`} src={uni.url} alt={uni.name} className="h-16 md:h-20 object-contain shrink-0 hover:scale-105 transition-transform" />
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button onClick={openModal} className="px-8 py-4 text-lg bg-amber-500 hover:bg-amber-600 text-blue-800">
              Give Your Child This Same Advantage
            </Button>
            <p className="text-sm text-blue-200 mt-3 font-medium">100% University Acceptance Rate • Scholarships Available</p>
          </div>
        </div>
      </section>

      {/* Features/Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">Everything Your Child Needs to Succeed</h2>
              <div className="space-y-6">
                {[
                  { title: "Ontario Ministry of Education Curriculum", desc: "Same rigorous standards, better delivery" },
                  { title: "University Application Support", desc: "Guidance counselors help with OUAC, essays, and program selection" },
                  { title: "Prime Mississauga Location", desc: "10 min walk to Square One, 30 min to Downtown Toronto, easy transit access" },
                  { title: "Full-Time & Part-Time Options", desc: "Day school, night school, summer school, credit recovery" },
                  { title: "Grades 9-12 (OSSD Program)", desc: "Complete high school diploma recognized globally" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 bg-green-100 rounded-full p-1 shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="High school students studying" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xl">100%</p>
                    <p className="text-sm text-gray-600">Acceptance Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Premium Education Without the Premium Price Tag</h2>
            <p className="text-lg text-gray-600">Invest in your child's future without breaking the bank.</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-400 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-400 text-blue-800 text-xs font-bold px-4 py-1 rounded-bl-lg uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-2">USCA Academy</h3>
              <p className="text-gray-500 mb-6">High School (Grades 9-12)</p>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-gray-900">$7,000</span>
                <span className="text-gray-500"> CAD/Year</span>
              </div>
              <ul className="space-y-4 mb-8">
                {['All textbooks & materials', 'Extracurricular activities', 'University guidance & support', 'Small class sizes (5-15)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={openModal} className="w-full py-4 text-lg">Book a Tour</Button>
              <p className="text-center text-sm text-gray-500 mt-4 font-medium">Spots fill up fast. Reserve yours before the next intake.</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">The Alternatives</h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-gray-200">
                  <p className="font-semibold text-gray-900 mb-1">Other Mississauga Private Schools</p>
                  <p className="text-2xl font-bold text-gray-500">$15,000 - $30,000<span className="text-sm font-normal">/year</span></p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Public School</p>
                  <p className="text-2xl font-bold text-gray-500">Free</p>
                  <p className="text-sm text-gray-500 mt-1">But with 30+ students per class and limited individual attention.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-2 mb-8">
            {faqs.slice(0, showAllFaqs ? faqs.length : 5).map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          {!showAllFaqs && (
            <div className="text-center">
              <button 
                onClick={() => setShowAllFaqs(true)}
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors"
              >
                View More Questions <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">Limited Spots Available for September Intake</h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto mb-6">
            Our small class sizes mean limited enrollment. Families are already booking campus tours for fall admission.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-3xl mx-auto text-left">
            {[
              "1. Book your free campus tour",
              "2. Meet our teachers & see facilities",
              "3. Discuss academic goals",
              "4. Secure your spot"
            ].map((step, i) => (
              <div key={i} className="bg-white px-4 py-2 rounded-lg shadow-sm border border-amber-200 text-amber-900 font-medium">
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Give Your Child the Attention They Deserve</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={openModal} className="w-full sm:w-auto text-lg px-10 py-5">
              Book Your Free Campus Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="https://www.uscaacademy.com/wp-content/uploads/2026/02/USCA-Academy-Logo.png" alt="USCA Academy Logo" className="w-auto h-10 object-contain bg-white/95 px-3 py-1.5 rounded-lg" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="text-xl font-bold text-slate-300">USCA Academy</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Unit 2, 977 Pantera Dr, Mississauga, ON L4W 2W6</span>
            </div>
          </div>
        </div>
      </footer>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Sticky CTAs */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex md:hidden flex-row justify-center items-center gap-3 sm:gap-6">
        <div className="text-center flex-1 max-w-[250px]">
          <Button onClick={openModal} className="px-2 sm:px-8 py-2.5 sm:py-3 w-full text-xs sm:text-base">Secure Your Spot</Button>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium leading-tight">Limited seats available.</p>
        </div>
        <div className="text-center flex-1 max-w-[250px]">
          <Button onClick={openModal} variant="outline" className="px-2 sm:px-8 py-2.5 sm:py-3 w-full text-xs sm:text-base border-blue-800 text-blue-800">Request Info</Button>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1 font-medium leading-tight">Get answers to your questions.</p>
        </div>
      </div>
    </div>
  );
}

