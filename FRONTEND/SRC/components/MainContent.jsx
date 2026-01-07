import React from 'react'

export default function MainContent() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="container">
          <h1>
            Welcome to <span className="brand">YCCE</span>
          </h1>
          <p>
            Your trusted College of Engineering. Explore branches, achievements, and admissions.
          </p>
        </div>
      </section>

      <section className="section" id="admissions">
        <div className="container">
          <h2>Admissions</h2>
          <div className="grid">
            <div className="card">
              <h3>Eligibility</h3>
              <p>For UG programs, min 50% in qualifying exams (varies by category) with relevant subjects. Entrance test scores where applicable.</p>
            </div>
            <div className="card">
              <h3>Important Dates</h3>
              <p>Applications open in March; counseling in June–July. Check the official calendar for exact dates.</p>
            </div>
            <div className="card">
              <h3>Fees & Scholarships</h3>
              <p>UG fees from ₹60,000/year. Merit and need-based scholarships available; apply during admission.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="branches">
        <div className="container">
          <h2>Branches</h2>
          <div className="grid">
            {[
              'Computer Science & Engineering',
              'Information Technology',
              'Electronics & Communication Engineering',
              'Mechanical Engineering',
              'Civil Engineering',
              'Electrical Engineering',
              'Artificial Intelligence & Data Science',
            ].map((b) => (
              <div key={b} className="card">
                <h3>{b}</h3>
                <p>
                  Curriculum aligned with industry needs, labs, projects, and internships to build strong
                  fundamentals and practical skills.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="achievements">
        <div className="container">
          <h2>Achievements</h2>
          <div className="grid">
            {[
              {
                title: 'NAAC Accreditation',
                desc: 'Accredited with A+ grade, demonstrating excellence in teaching and infrastructure.',
              },
              {
                title: 'NBA Programs',
                desc: 'Multiple programs accredited by NBA for outcome-based education.',
              },
              {
                title: 'Top Placements',
                desc: 'Strong placement records with leading tech and core companies.',
              },
              {
                title: 'Research & Innovation',
                desc: 'Active research labs, funded projects, patents, and hackathon wins.',
              },
            ].map((a) => (
              <div key={a.title} className="card">
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <h2>Contact</h2>
          <div className="grid">
            <div className="card">
              <h3>Admissions Office</h3>
              <p>Phone: +91-XXXXXXXXXX<br/>Email: admissions@ycce.edu</p>
            </div>
            <div className="card">
              <h3>Campus</h3>
              <p>YCCE, Campus Road, Nagpur<br/>Mon–Fri: 9:00–17:00</p>
            </div>
            <div className="card">
              <h3>Helpdesk</h3>
              <p>For queries on courses, fees, or calendar, use the chatbot or mail helpdesk@ycce.edu.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
