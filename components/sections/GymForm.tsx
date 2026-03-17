"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MessageCircle, MapPin, Clock, Target, Zap, User, Dumbbell, ChevronDown } from "lucide-react"

export default function GymSection() {
  const [mode, setMode] = useState<"form" | "bmi">("form")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membership: "",
    fitnessGoal: "",
    trainingTime: "",
    experience: ""
  })

  const calculateBMI = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h && w) {
      const result = w / (h * h)
      setBmi(parseFloat(result.toFixed(2)))
    }
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-blue-400" }
    if (bmi < 25) return { label: "Healthy Weight", color: "text-green-400" }
    if (bmi < 30) return { label: "Overweight", color: "text-yellow-400" }
    return { label: "Obese", color: "text-red-400" }
  }

  return (
    <section className="w-full bg-black text-white py-24 px-6 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start relative z-10">

        {/* LEFT SIDE */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl font-bold leading-tight tracking-tight">
              Build The Body
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 mt-2">
                You Always Wanted
              </span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-400 text-lg leading-relaxed max-w-lg"
          >
            Join an elite community focused on strength, discipline, and results. 
            Our professional coaches help you unlock your true potential with personalized training programs.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-8 py-6 border-y border-zinc-800"
          >
            <div>
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Expert Trainers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">2k+</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-zinc-500 uppercase tracking-wider">Weekly Classes</div>
            </div>
          </motion.div>

          {/* CONTACT BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="https://wa.me/1234567890"
              className="group flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-105"
            >
              <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
              WhatsApp
            </a>

            <a
              href="tel:+911234567890"
              className="group flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-700 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-zinc-700 hover:border-zinc-600 hover:scale-105"
            >
              <Phone size={18} className="group-hover:rotate-12 transition-transform" />
              Call Us
            </a>

            <a
              href="mailto:gym@email.com"
              className="group flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-700 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-zinc-700 hover:border-zinc-600 hover:scale-105"
            >
              <Mail size={18} className="group-hover:rotate-12 transition-transform" />
              Email
            </a>
          </motion.div>

          {/* Location Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-start gap-3 text-zinc-400"
          >
            <MapPin className="mt-1 text-zinc-500" size={20} />
            <div>
              <p className="text-white font-medium">Jaipur, Rajasthan</p>
              <p className="text-sm">Muscle Nation Gym, Gulab vs tower, 112 SP, near cheezy crazy cafe, Kumbha Marg, Sanganer, Sector 11, Pratap Nagar, Jaipur, Rajasthan 302033</p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Clock size={14} />
                <span>Open 24/7</span>
              </div>
            </div>
          </motion.div>

          {/* MAP */}
          <div className="rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition">

  <a
    href="https://www.google.com/maps/place/Muscle+Nation+Gym/"
    target="_blank"
    rel="noopener noreferrer"
  >

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d222.57536636715344!2d75.82470241964525!3d26.80157300428769!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc994096f3027%3A0x2880722b397aeef4!2sMuscle%20Nation%20Gym!5e0!3m2!1sen!2sin!4v1773647296985!5m2!1sen!2sin"
      className="w-full h-[260px] pointer-events-none"
      loading="lazy"
      style={{ border: 0 }}
    />
  </a>

</div>

        </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">
          
          {/* TOGGLE */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <span className={`font-semibold text-sm tracking-wider transition-colors ${mode === "form" ? "text-white" : "text-zinc-600"}`}>
              JOIN NOW
            </span>
            
            <button
              onClick={() => setMode(mode === "form" ? "bmi" : "form")}
              className="relative w-16 h-9 bg-zinc-800 rounded-full p-1 transition-colors duration-300 border border-zinc-700 hover:border-zinc-600"
            >
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-7 h-7 bg-gradient-to-br from-white to-zinc-300 rounded-full shadow-lg"
                style={{
                  marginLeft: mode === "bmi" ? "28px" : "0px"
                }}
              />
            </button>
            
            <span className={`font-semibold text-sm tracking-wider transition-colors ${mode === "bmi" ? "text-white" : "text-zinc-600"}`}>
              BMI CALC
            </span>
          </div>


          {/* FORM CARD - Glassmorphism Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-zinc-900/50 backdrop-blur-xl border border-zinc-700/50 rounded-3xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden"
          >
            {/* Gradient overlays */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              
              {mode === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 relative z-10"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Start Your Transformation</h3>
                    <p className="text-zinc-500 text-sm">Fill in your details and we'll contact you within 24 hours</p>
                  </div>

                  {/* NAME */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className={`transition-colors ${focusedField === 'name' ? 'text-white' : 'text-zinc-600'}`} />
                    </div>
                    <input
                      type="text"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-transparent focus:border-white focus:bg-black/60 outline-none transition-all duration-300"
                    />
                    <label className="absolute left-12 top-4 text-zinc-500 text-sm transition-all duration-300 
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-zinc-400
                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                      Full Name
                    </label>
                  </div>

                  {/* EMAIL */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className={`transition-colors ${focusedField === 'email' ? 'text-white' : 'text-zinc-600'}`} />
                    </div>
                    <input
                      type="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-transparent focus:border-white focus:bg-black/60 outline-none transition-all duration-300"
                    />
                    <label className="absolute left-12 top-4 text-zinc-500 text-sm transition-all duration-300 
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-zinc-400
                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                      Email Address
                    </label>
                  </div>

                  {/* PHONE */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className={`transition-colors ${focusedField === 'phone' ? 'text-white' : 'text-zinc-600'}`} />
                    </div>
                    <input
                      type="tel"
                      placeholder=" "
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="peer w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-transparent focus:border-white focus:bg-black/60 outline-none transition-all duration-300"
                    />
                    <label className="absolute left-12 top-4 text-zinc-500 text-sm transition-all duration-300 
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                    peer-focus:top-1 peer-focus:text-xs peer-focus:text-zinc-400
                    peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                      Phone Number
                    </label>
                  </div>

                  {/* FITNESS GOAL - New Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Target size={18} className="text-zinc-600" />
                    </div>
                    <select 
                      value={formData.fitnessGoal}
                      onChange={(e) => setFormData({...formData, fitnessGoal: e.target.value})}
                      className="w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-10 text-white appearance-none focus:border-white focus:bg-black/60 outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled>Select Fitness Goal</option>
                      <option value="weight-loss">Weight Loss</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="strength">Strength Training</option>
                      <option value="endurance">Endurance & Stamina</option>
                      <option value="general">General Fitness</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={18} />
                  </div>

                  {/* EXPERIENCE LEVEL - New Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Zap size={18} className="text-zinc-600" />
                    </div>
                    <select 
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      className="w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-10 text-white appearance-none focus:border-white focus:bg-black/60 outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled>Experience Level</option>
                      <option value="beginner">Beginner (0-6 months)</option>
                      <option value="intermediate">Intermediate (6 months - 2 years)</option>
                      <option value="advanced">Advanced (2+ years)</option>
                      <option value="athlete">Professional Athlete</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={18} />
                  </div>

                  {/* PREFERRED TIME - New Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Clock size={18} className="text-zinc-600" />
                    </div>
                    <select 
                      value={formData.trainingTime}
                      onChange={(e) => setFormData({...formData, trainingTime: e.target.value})}
                      className="w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-10 text-white appearance-none focus:border-white focus:bg-black/60 outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled>Preferred Training Time</option>
                      <option value="morning">Morning (6AM - 12PM)</option>
                      <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      <option value="evening">Evening (5PM - 9PM)</option>
                      <option value="night">Night (9PM - 12AM)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={18} />
                  </div>

                  {/* MEMBERSHIP */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Dumbbell size={18} className="text-zinc-600" />
                    </div>
                    <select 
                      value={formData.membership}
                      onChange={(e) => setFormData({...formData, membership: e.target.value})}
                      className="w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-10 text-white appearance-none focus:border-white focus:bg-black/60 outline-none transition-all duration-300 cursor-pointer"
                    >
                      <option value="" disabled>Select Membership Plan</option>
                      <option value="monthly">Monthly - ₹2,999</option>
                      <option value="quarterly">3 Months - ₹7,999</option>
                      <option value="half-yearly">6 Months - ₹13,999</option>
                      <option value="yearly">Yearly - ₹24,999 (Best Value)</option>
                      <option value="personal">Personal Training</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" size={18} />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-white via-zinc-200 to-white text-black font-bold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] relative overflow-hidden group"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-300 via-white to-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <p className="text-center text-zinc-600 text-xs mt-4">
                    By submitting, you agree to our Terms & Privacy Policy
                  </p>
                </motion.div>
              )}



              {mode === "bmi" && (
                <motion.div
                  key="bmi"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 relative z-10"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">BMI Calculator</h3>
                    <p className="text-zinc-500 text-sm">Check your body mass index</p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-zinc-400 text-sm mb-2 ml-1">Height (cm)</label>
                      <input
                        type="number"
                        placeholder="175"
                        value={height}
                        onChange={(e)=>setHeight(e.target.value)}
                        className="w-full p-4 rounded-xl bg-black/40 border border-zinc-700 text-white text-center text-2xl font-bold focus:border-white focus:bg-black/60 outline-none transition-all duration-300 placeholder-zinc-800"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-zinc-400 text-sm mb-2 ml-1">Weight (kg)</label>
                      <input
                        type="number"
                        placeholder="70"
                        value={weight}
                        onChange={(e)=>setWeight(e.target.value)}
                        className="w-full p-4 rounded-xl bg-black/40 border border-zinc-700 text-white text-center text-2xl font-bold focus:border-white focus:bg-black/60 outline-none transition-all duration-300 placeholder-zinc-800"
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={calculateBMI}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-zinc-700 to-zinc-600 text-white font-semibold border border-zinc-600 hover:border-zinc-500 transition-all duration-300"
                  >
                    Calculate BMI
                  </motion.button>

                  <AnimatePresence>
                    {bmi && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center pt-6 pb-2"
                      >
                        <div className="inline-block p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700">
                          <p className="text-zinc-400 text-sm uppercase tracking-wider mb-2">Your BMI</p>
                          <h3 className="text-5xl font-bold mb-2">{bmi}</h3>
                          <p className={`text-lg font-medium ${getBMICategory(bmi).color}`}>
                            {getBMICategory(bmi).label}
                          </p>
                        </div>
                        
                        <div className="mt-6 flex justify-between text-xs text-zinc-500 px-4">
                          <span>Underweight<br/>18.5</span>
                          <span>Normal<br/>18.5-24.9</span>
                          <span>Overweight<br/>25-29.9</span>
                          <span>Obese<br/>30+</span>
                        </div>
                        <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500"
                            style={{ width: '100%' }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  )
}