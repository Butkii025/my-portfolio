"use client"

import { useState } from "react"
import emailjs from '@emailjs/browser'

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || ''
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || ''

type Status = "idle" | "loading" | "success" | "error"
interface FormData { name: string; email: string; message: string }
interface Errors   { name?: string; email?: string; message?: string }

function validate(f: FormData): Errors {
  const e: Errors = {}
  if (!f.name.trim())    e.name    = "Name is required"
  if (!f.email.trim())   e.email   = "Email is required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Enter a valid email"
  if (!f.message.trim()) e.message = "Message is required"
  return e
}

interface Props { onSuccess?: () => void }

export default function ContactForm({ onSuccess }: Props) {
  const [form,    setForm]    = useState<FormData>({ name: "", email: "", message: "" })
  const [errors,  setErrors]  = useState<Errors>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [status,  setStatus]  = useState<Status>("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus("loading")
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name,
        reply_to:  form.email,
        message:   form.message,
      }, PUBLIC_KEY)
      setStatus("success")
      setForm({ name: "", email: "", message: "" })
      onSuccess?.()
    } catch {
      setStatus("error")
    }
  }

  const inputBase = `w-full rounded-xl border text-sm px-3 py-3 pl-9 outline-none transition-all duration-300 font-inherit`

  const darkInput = `dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500`
  const lightInput = `bg-zinc-50 text-zinc-800 placeholder:text-zinc-400`

  const borderIdle  = `dark:border-zinc-600 border-zinc-300`
  const borderFocus = `dark:border-blue-400 dark:shadow-[0_0_0_3px_rgba(96,165,250,0.15)] border-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.1)]`
  const borderErr   = `dark:border-red-400/70 border-red-400/70`

  const inputCls = (id: string) =>
    `${inputBase} ${darkInput} ${lightInput} ${errors[id as keyof Errors] ? borderErr : focused === id ? borderFocus : borderIdle}`

  const iconCls = (id: string) =>
    `absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-300
    ${focused === id ? 'text-blue-400' : 'dark:text-zinc-400 text-zinc-400'}`

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-14 text-center animate-in fade-in zoom-in duration-500
        rounded-2xl dark:bg-zinc-800/60 dark:border dark:border-zinc-700 bg-zinc-50 border border-zinc-200 p-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center
          dark:bg-blue-400/20 bg-blue-50 border-2 dark:border-blue-400/40 border-blue-200">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
            <path d="M5 13l4 4L19 7" strokeDasharray="40" strokeDashoffset="0"
              style={{ animation: 'checkDraw 0.6s ease forwards' }} />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold dark:text-white text-black mb-1">Message sent !</p>
          <p className="text-sm dark:text-zinc-400 text-zinc-500">I'll get back to you shortly</p>
        </div>
        <p className="font-['Alex_Brush',_cursive] text-xl dark:text-zinc-300 text-zinc-500 italic">
          " — have a nice day "
        </p>
        <button onClick={() => setStatus('idle')}
          className="px-5 py-2 rounded-xl text-sm transition duration-200 cursor-pointer
            dark:border dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700
            border border-zinc-300 text-zinc-600 hover:bg-zinc-100">
          Send another
        </button>
        <style>{`@keyframes checkDraw { from { stroke-dashoffset: 40; } to { stroke-dashoffset: 0; } }`}</style>
      </div>
    )
  }

  return (
    <div className="relative rounded-2xl overflow-hidden p-6
      dark:bg-zinc-800/60 dark:border dark:border-zinc-700
      bg-white border border-zinc-200
      shadow-lg dark:shadow-zinc-900/50 mt-25">

      <div className="absolute top-0 left-0 right-0 h-px
        dark:bg-gradient-to-r dark:from-transparent dark:via-blue-400/50 dark:to-transparent
        bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none
        dark:bg-blue-400/8 bg-blue-400/5" />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 relative z-10">

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {([
            { id: 'name',  type: 'text',  label: 'Name',  placeholder: 'Your name',       Icon: UserIcon },
            { id: 'email', type: 'email', label: 'Email', placeholder: 'you@example.com',  Icon: MailIcon },
          ] as const).map(({ id, type, label, placeholder, Icon }) => (
            <div key={id}>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2
                dark:text-zinc-300 text-zinc-500">{label}</label>
              <div className="relative">
                <input id={id} type={type} value={form[id]}
                  onChange={e => setForm({ ...form, [id]: e.target.value })}
                  onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
                  placeholder={placeholder} className={inputCls(id)} />
                <span className={iconCls(id)}><Icon /></span>
              </div>
              {errors[id] && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertIcon /> {errors[id]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-2
            dark:text-zinc-300 text-zinc-500">Message</label>
          <div className="relative">
            <textarea id="message" rows={5} value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
              placeholder="Your message here..."
              className={`${inputCls('message').replace('pl-9','pl-9')} resize-none pt-3`} />
            <span className={`absolute left-3 top-3.5 pointer-events-none transition-colors duration-300
              ${focused === 'message' ? 'text-blue-400' : 'dark:text-zinc-400 text-zinc-400'}`}>
              <MessageIcon />
            </span>
          </div>
          {errors.message && (
            <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
              <AlertIcon /> {errors.message}
            </p>
          )}
          <p className="text-xs dark:text-zinc-500 text-zinc-400 mt-1.5 text-right">
            {form.message.length} chars
          </p>
        </div>

        {/* Submit */}
        <button type="submit" disabled={status === 'loading'}
          className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer relative overflow-hidden group
            dark:bg-zinc-700 dark:border dark:border-zinc-500 dark:text-white dark:hover:bg-zinc-600 dark:hover:border-blue-400/60 dark:hover:shadow-[0_0_16px_rgba(96,165,250,0.2)] dark:disabled:opacity-50
            bg-zinc-100 border border-zinc-300 text-zinc-700 hover:bg-zinc-200 hover:border-blue-400/60 hover:shadow-[0_0_12px_rgba(96,165,250,0.15)] disabled:opacity-50
            flex items-center justify-center gap-2">
          {/* Shimmer sweep */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent
            -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          {status === 'loading' && <SpinnerIcon />}
          <span className="relative z-10 flex items-center gap-2">
            {status === 'loading' ? 'Sending...' : 'Send Message →'}
          </span>
        </button>

        {status === 'error' && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 animate-in fade-in duration-300">
            <AlertIcon /> Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  )
}

function UserIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> }
function MailIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg> }
function MessageIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> }
function SpinnerIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{animation:'spin 0.8s linear infinite'}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> }
function AlertIcon()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg> }