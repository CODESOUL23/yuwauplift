import React from 'react';
import './FirstPage.css';

const FirstPage = () => {
  return (
    <div className="firstpage">
      <nav className="navbar">
      <img src="favicon.ico" alt="Yuwauplift Logo" className="navbar-logo" />
        <a href="#" className="navbar-brand1">Yuwa Uplift</a>
        <div className="navbar-menu">
          <a href="#" className="navbar-link">Home</a>
          <a href="#" className="navbar-link">About Us</a>
          <a href="#" className="navbar-link">Team</a>
          <a href="#" className="navbar-link">Contact Us</a>
          <a href="#" className="navbar-link">Student Stories</a>
          <a href="/login" className="navbar-cta">Login</a>
          <a href="/login" className="navbar-cta">Sign Up</a>
        </div>
      </nav>

      <main className="hero1">
        <div className="hero-content1">
          <h1 className="hero-title1">Welcome Warrior!</h1>
          <p className="hero-subtitle1">Providing guidance and resources needed to help students overcome academic challenges and succeed in their educational journey.</p>
          <div className="hero-cta1">
            <a href="/login" className="btn btn-primary1">Get Support</a>
            <a href="/login" className="btn btn-secondary1">Join Us</a>
          </div>
        </div>
      </main>
      <section className="quote-section1">
        <h2 className="quote1">Education is the most powerful weapon which you can use to change the world <br></br> - Nelson Mandela</h2>
      </section>
      <div class="our-stories-container">
      <div className="card1">
      <div className="card-image-container1">
      </div>
      <div className="card-content1">
        <h2 className="card-title1">The dream turned into reality: Anish Das</h2>
        <p className="card-text1">
          A proud wireman who transformed his aspirations into tangible achievements. Coming from a humble background in a small village in Sindhudurg district of Maharashtra, Dnyaneshwar's journey is a symbol of determination and hard work. After enrolling in a wireman course at Yuva Parivartan, he secured a job at the Maharashtra State Electricity Board.
          Today, Dnyaneshwar's dedication has paid off. He earns a respectable monthly income of 15 to 20,000 rupees. Dnyaneshwar's success story serves as an example of hope and inspiration for countless youth across the nation. It underscores the transformative power of education, hard work, and perseverance in achieving one's dreams.
        </p>
      </div>
      <div className="card-actions1">
        <a href="https://www.youtube.com/watch?v=7SC5w0Q7bzM" target="_blank" rel="noopener noreferrer" className="card-button1">
          Watch on YouTube
        </a>
      </div>
     </div>
     </div>
      <h2 className="testimonials-title">What Our Students Say</h2>
      <section className="testimonials">
        <div className="testimonial">
          <p className="testimonial-text">"Yuwa Uplift has been a game-changer for my academic journey. The support and resources provided have helped me excel in my studies."</p>
          <p className="testimonial-author">- Student A</p>
        </div>
        <div className="testimonial">
          <p className="testimonial-text">"The AI-Mentor and mental health support have been invaluable. I feel more confident and prepared for my future."</p>
          <p className="testimonial-author">- Student B</p>
        </div>
        <div className="testimonial">
          <p className="testimonial-text">"The AI-Mentor and mental health support have been invaluable. I feel more confident and prepared for my future."</p>
          <p className="testimonial-author">- Student B</p>
        </div>
        <div className="testimonial">
          <p className="testimonial-text">"The AI-Mentor and mental health support have been invaluable. I feel more confident and prepared for my future."</p>
          <p className="testimonial-author">- Student B</p>
        </div>
        <div className="testimonial">
          <p className="testimonial-text">"The AI-Mentor and mental health support have been invaluable. I feel more confident and prepared for my future."</p>
          <p className="testimonial-author">- Student B</p>
        </div>
        </section>
        <div className="quote-gif-section">
        <div className="quote-gif-content">
          <div className="quote-gif-text">"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt</div>
        </div>
      </div>
      <div className="about-yuwa-container">
      <div class="about-bg"></div>
      <div className="text-sectiony">
        <h1 className="titley">About Yuwa Uplift</h1>
        <p className="descriptiony">
          Yuwa, which means "youth" in Hindi, works specifically with girls from
          impoverished families in rural Jharkhand, India—a place where girls
          are at risk of child marriage and human trafficking. It is a program
          that uses team sports and education to build character, confidence,
          and courage. It is a place where girls who don't yet know their worth
          can meet to compete, achieve goals, and create brighter futures. Yuwa
          prepares girls to break the cycle of poverty—permanently.
        </p>
      </div>
    </div>
    
        <section className="sponsorship-banner">
          <div className="sponsorship-content">
            <h2 className="sponsorship-title">Become a Sponsor</h2>
            <p className="sponsorship-text">Join us in making a difference in students' lives. Your sponsorship can help provide the resources and support they need to succeed.</p>
            <a href="/sponsor" className="btn btn-primary">Sponsor Now</a>
          </div>
        </section>
      
        <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>What We Do</h4>
            <ul>
              <li>AI-Mentor</li>
              <li>Mental Health Support</li>
              <li>Scholarship Awarness</li>
              <li>Academic Guidance</li>
              <li>Peer Connections</li>
              <li>Sponsorships</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>About Us</h4>
            <ul>
              <li>Our Mission</li>
              <li>Meet the Team</li>
              <li>Partners</li>
              <li>Success Stories</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Impact</h4>
            <ul>
              <li>Student Stories</li>
              <li>Statistics</li>
              <li>Testimonials</li>
              <li>Annual Report</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Reach Us</h4>
            <ul>
              <li>Contact Us</li>
              <li>Support</li>
              <li>FAQ's</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="links">
            <a href="#">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#">Terms and Conditions</a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} YuwaUplift. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FirstPage;