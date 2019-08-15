import React from 'react'
import { Link } from 'react-router-dom'
import '../LandingPage/LandingPage.css'

export default class LandingPage extends React.Component {

  render() {
    return (
      <div className='Landing_Page'>
          <h2>Your Personal Virtual Library</h2>
          <p>Bibliofile is a virtual library app that allows people to add any books they have in their personal 
              libraries to a digital management system. From there, they have options to post notes about each book - 
              such as, "Borrowed by John on 6/20" or "Give away." People can see all of their personal library in one 
              space and sort, filter, and organize their books to their hearts' desires. </p>
          <div className = 'options'>
            <h3>Ready to get started?</h3>
            <Link className = 'SignUp_link'
              to='/signup'>
              Sign Up
            </Link>
            <h3>Already using Bibliofile?</h3>
            <Link className = 'Login_link'
              to='/login'>
              Login
            </Link>
            <h3>Questions? Get in touch!</h3>
            <address>
                <a href="https://leilaanderson.dev" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/KTeC5RF.png" alt="Portfolio" id="linkedin-pic"/></a>
                <a href="mailto:leila@leilaanderson.dev" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/TJRUfCX.png" alt="Email" id="email-pic"/></a>
                <a href="https://www.linkedin.com/in/leilaanderson/" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/K9zNzW1.png" alt="LinkedIn" id="linkedin-pic"/></a>
                <a href="https://github.com/Leil-ish" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/jHZd0pE.png"  alt="GitHub" id="github-pic"/></a>
            </address>
          </div>
      </div>
    )
  }
}