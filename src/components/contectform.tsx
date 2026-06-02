"use client"

import { useState } from "react"
import TeaScene from './anim/TeaScene';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY_HERE"

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
    }
  }

  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Get in Touch
            </h2>
            <p className="text-gray-400">
              Let's plan a chai meeting
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-500 hover:border-blue-400/50 focus:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-500 hover:border-blue-400/50 focus:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none transition-all duration-500 hover:border-blue-400/50 focus:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/5"
                placeholder="Your Message here..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-6 py-2.5 font-medium rounded-2xl text-white bg-white/10 border border-white/20 transition-all duration-500 ease-in-out hover:-translate-y-1 hover:bg-transparent hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-green-400 text-sm mt-2">
                ✓ Message sent successfully! I'll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm mt-2">
                ✕ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

        <div className="md:col-span-5 w-full flex justify-center items-center">
          <TeaScene />
        </div>

      </div>
    </section>
  )
}