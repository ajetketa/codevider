import './contact-us.css'

export default function ContactUs() {
  return (
    <section id="contact-us">
      <div id="contact-us-div">
        <h1 id="header">Contact Us</h1>
        <div id="contact-options">
          <div class="contact-option">
            <img class="contact-icon" src="/address.svg" alt='email'></img>
            <p class="contact-text">
              <b>Address:</b> 198 West 21th Street, Suite 721 New York NY 10016
            </p>
          </div>
          <div class="contact-option">
            <img class="contact-icon" src="/email.svg" alt='email'></img>
            <p class="contact-text">
              <b>Email:</b> <a href="mailto:info@yoursite.com">info@yoursite.com</a>
            </p>
          </div>
          <div class="contact-option">
            <img class="contact-icon" src="/phone.svg" alt='email'></img>
            <p class="contact-text">
              <b>Phone:</b> + 1235 2355 98
            </p>
          </div>
        </div>
      </div>
    </section>
  )
  
}