'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, Home, User, Mail, Briefcase, Book } from "lucide-react"
import { CircleMenu } from "@/components/ui/circle-menu"

export default function MobileMenu() {

  const [overlayOpen, setOverlayOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const openMenu = () => {

    setOverlayOpen(true)

    setTimeout(() => {
      setMenuOpen(true)
    }, 200)

  }

  const closeMenu = () => {

    setMenuOpen(false)

    setTimeout(() => {
      setOverlayOpen(false)
    }, 1200)

  }

  return (
    <>
      {/* HAMBURGER */}
      {!overlayOpen && (
        <button
          onClick={openMenu}
          className="fixed top-6 right-6 z-[100] bg-black text-white p-3 rounded-full"
        >
          <Menu size={20}/>
        </button>
      )}

      <AnimatePresence>

        {overlayOpen && (

          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[90] flex items-center justify-center"
          >

            <CircleMenu
              forceOpen={menuOpen}
              onClose={closeMenu}
              items={[
                { label: "Home", icon: <Home size={18}/>, href: "/" },
                { label: "Projects", icon: <Briefcase size={18}/>, href: "/projects" },
                { label: "Articles", icon: <Book size={18}/>, href: "/blog" },
                { label: "About", icon: <User size={18}/>, href: "/about" },
                { label: "Contact", icon: <Mail size={18}/>, href: "/contact" }
              ]}
            />

          </motion.div>

        )}

      </AnimatePresence>
    </>
  )
}