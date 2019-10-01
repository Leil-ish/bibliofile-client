import React from 'react'
import '../LandingPage/LandingPage.css'

export default class LandingPage extends React.Component {

  render() {
    return (
      <div className='Landing_Page'>
          <p>Bibliofile is a virtual library app that allows people to add books they 
            have in their personal libraries to a digital management system. Bibliofile
            users can search for and automatically add books that exist on Google books
            or add books manually. Once books are added, users can make notes about each 
            book and mark whether or not particular books have been borrowed. To get started, 
            just use the link at the top of the page to register!</p>
          <div className = 'contact'>
            <address>
                <a href="https://leilaanderson.dev" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/KTeC5RF.png" alt="Portfolio" id="portfolio-portrait-pic"/></a>
                <a href="mailto:leila@leilaanderson.dev" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/TJRUfCX.png" alt="Email" id="email-pic"/></a>
                <a href="https://www.linkedin.com/in/leilaanderson/" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/K9zNzW1.png" alt="LinkedIn" id="linkedin-pic"/></a>
                <a href="https://github.com/Leil-ish" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/jHZd0pE.png"  alt="GitHub" id="github-pic"/></a>
            </address>
          </div>
      </div>
    )
  }
}