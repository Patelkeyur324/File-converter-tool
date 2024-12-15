import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_li7qvro', 'template_exkqicm', form.current, 'hIB_r6V_6iLpDDCqh')
      .then((result) => {
        console.log('Email successfully sent!', result.text);
        alert('Your message has been sent!');
      }, (error) => {
        console.error('Error sending email:', error.text);
        alert('There was an error sending your message. Please try again later.');
      });

    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white m-8 shadow-xl rounded-md">
      {/* Form Section with Shadow */}
      <div className="w-full md:w-1/2 p-8 bg-gray-800 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Just say hi!</h2>
        <p className="text-gray-300 mb-8">
          Tell us more about you and we’ll contact you soon :)
        </p>
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm">Name</label>
              <input type="text" name="user_name" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Name" required />
            </div>
            <div className="w-1/2">
              <label className="block text-sm">Firstname</label>
              <input type="text" name="user_firstname" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Firstname" required />
            </div>
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" name="user_email" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="email@gmail.com" required />
          </div>
          <div>
            <label className="block text-sm">Phone Number</label>
            <input type="text" name="user_phone" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Phone Number" />
          </div>
          <div>
            <label className="block text-sm">Message</label>
            <textarea name="message" className="w-full p-2 mt-1 bg-gray-700 rounded border-none" placeholder="Your message" required></textarea>
          </div>
          <button type="submit" className="px-4 py-2 bg-yellow-500 text-black font-bold rounded">Submit</button>
        </form>
      </div>
      {/* Information Section with Shadow */}
      <div className="w-full md:w-1/2 p-8 bg-gray-100 text-gray-800 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
        <p className="mb-4">
          523 Rosemary Street<br />
          Mumbai, 67000<br />
          India<br />
          Call us: +91 7203895884<br />
          
        </p>
        <div className="flex space-x-4 text-2xl">
          <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="text-gray-800 hover:text-yellow-500"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
