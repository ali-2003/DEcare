# Diabetes Endocare — Patient Check-In and Intake System

A website and digital check-in system I built for a diabetes and endocrinology clinic in the Chicago area. It replaces paper intake forms with an online flow that new patients can fill out from their phone before their appointment, and lets returning patients do a quick check-in with insurance card scanning. Everything gets emailed straight to the doctor.

---

## What This Project Is

The clinic was still doing patient intake on paper when I came in. Every new patient had to show up early, fill out a long packet at the front desk, and then the staff would spend time scanning or typing in the info afterwards. It was slow and made the front desk super busy during peak hours.

So I built them a full website with a digital check-in system. New patients get a link ahead of their appointment and fill out an intake form online from home. Returning patients walk in and use a quick check-in flow where they can just snap a picture of their insurance card with their phone camera. Everything they submit gets formatted into a clean email and sent straight to the doctor before the appointment even starts.

The goal was to save the clinic time, cut down on paper, and give patients a smoother experience.

---

## What It Does

- New patients can fill out an intake form online covering their personal info, medical history, current medications, allergies, diabetes type and treatment, emergency contacts, and insurance info
- Returning patients have a shorter check-in flow where they can scan their insurance card or ID using their phone camera
- Everything submitted gets auto-formatted and emailed to the doctor through Brevo
- New patients also get a welcome email with a direct link to the intake form
- Works on phones, tablets, and computers so patients can fill it out however they want
- Separate confirmation screens for both flows so patients know their info went through

---

## Tech Stack

- **Next.js 14** (App Router) for the frontend and API routes
- **TypeScript** because I wanted type safety across the form logic
- **Tailwind CSS** for styling
- **Brevo** for sending the transactional emails to the doctor
- **Browser MediaDevices API** for the camera/document scanning feature
- **Vercel** for hosting

---

## How I Built It

1. Met with the clinic first to understand their existing paper workflow and what fields actually mattered to the doctor
2. Designed two separate flows — one for new patients and one for returning patients — since their needs are totally different
3. Built the main clinic website and added a "Check-In" tab in the navbar as the entry point
4. Built the new patient intake form and split it into multiple steps so it wouldn't feel overwhelming
5. Added the camera feature for scanning insurance cards and IDs
6. Built two Next.js API routes — one for intake submissions and one for quick check-ins
7. Designed HTML email templates that format the submitted data so it's easy for the doctor to read at a glance
8. Integrated the Brevo API to actually send the emails
9. Added confirmation screens for both flows
10. Tested everything on real phones (iPhone and Android) to make sure the camera worked before handing it off

---

## Challenges and What I Learned

The camera feature was the hardest part. Mobile browsers only let you use the camera if the site is on HTTPS, so I had to make sure Vercel was serving everything over HTTPS end to end. I also had to handle the case where a patient denies camera permission — instead of the app just breaking, it shows a friendly fallback message telling them how to enable it or upload a photo instead.

The email templates were also surprisingly annoying. Gmail, Outlook, and Apple Mail all render HTML slightly differently, so I had to keep tweaking the template until it looked clean in all three.

Another thing I learned is that long forms scare people off. When I first built the intake form as one long page, people would bail halfway through. I broke it into a multi-step wizard with a progress bar, and completion rates went way up. It's a small UX thing but it made a real difference.

One more thing that came up later was dealing with file uploads in emails — the insurance card images had to be converted to base64 before attaching them to the Brevo email payload, which took some trial and error to get right.

---


## About

Built by **Ali Imran** — Computer Science student at the University of Illinois Chicago (Software Engineering concentration) and developer at **Luminate Systems LLC**, where I work on full-stack projects across e-commerce, healthcare, and international markets.
