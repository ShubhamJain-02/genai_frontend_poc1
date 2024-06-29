import React from 'react'
import './HowToUse.css'

const HowToUse = () => {
  return (
    <div className='card_out' id="get">
        <h1 className='text'>Steps to generate</h1>
        <ul className="cards">
  <li>
    <a href="" className="card">
      <img src="https://i.pinimg.com/736x/65/29/91/6529916b33968647129472d737c83706.jpg" className="card__image" alt="" height={300}/>
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>    
          <div className="card__header-text">
            <h3 className="card__title">Enter your topic</h3>            
            <span className="card__status">Give us the topic to generate via AI</span>
          </div>
        </div>
        <p className="card__description">Start by entering your main topic or prompt into the AI PowerPoint generator. This could be the central theme or subject of your presentation.</p>
      </div>
    </a>      
  </li>
  <li>
    <a href="" className="card">
      <img src="https://visme.co/blog/wp-content/uploads/2019/08/presentation-slides-Visual-Brand-Identity-Template.jpg" className="card__image" alt="" height={250}/>
      <div className="card__overlay">        
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>    
          <div className="card__header-text">
            <h3 className="card__title">Select slide number</h3>
            <span className="card__status">Choose the number of slides</span>
          </div>
        </div>
        <p className="card__description">Select the desired number of slides you want to include in your presentation. The range is uptil 12</p>
      </div>
    </a>
  </li>
  <li>
    <a href="" className="card">
      <img src="https://media.licdn.com/dms/image/D4D12AQEtqyWJqPcV7g/article-inline_image-shrink_1500_2232/0/1684128513205?e=1723075200&v=beta&t=a3qaMEJRzEHJVnTCKPHHAM7jxLsoYvQYEqMtIVRC0A8" className="card__image" alt="" height={300} />
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>  
          <div className="card__header-text">
            <h3 className="card__title">Select headers</h3>
            <span className="card__status">Give the headers to include</span>  
          </div>
        </div>
        <p className="card__description"> This could involve selecting from a list of suggested topics or entering your own custom topics to tailor the presentation to your needs.</p>
      </div>
    </a>
  </li>
  <li>
    <a href="" className="card">
      <img src="https://media.istockphoto.com/id/1304718530/video/3d-rendering-of-website-and-data.jpg?s=640x640&k=20&c=2vyeBm-GTJJnWIYZrOmgI4BCPWPxfQ0Slk_bINrdIvo=" className="card__image" alt="" height={300}/>
      <div className="card__overlay">
        <div className="card__header">
          <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>   
          <div className="card__header-text">
            <h3 className="card__title">Download and present</h3>
            <span className="card__status">Wait for 2-3 mins</span>
          </div>          
        </div>
        <p className="card__description">Once you've finalized the content and layout of your slides, you can download the presentation to your device. </p>
      </div>
    </a>
  </li>    
</ul>
    </div>
  )
}

export default HowToUse