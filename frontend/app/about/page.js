import React from 'react'

const AboutPage = () => {
    const data = {
        name: "Aleksandr (Alex) Stepanov",
        email: "stepanov.hw@gmail.com",
        headshot: "https://i.imgur.com/7BssNrB.jpg",
        logo: "https://i.imgur.com/UrCB4To.png",
        location: "Calgary, AB",
        bio: "I am a results-oriented, agile-driven Product Owner, focused on UX design and customer needs in a fast-paced and demanding environment. 5 years of Canadian and international software product management and technical sales experience, supplemented with a petroleum engineering background, informs everything that I do: from my ability to adjust plans quickly to finding efficient, concise solutions for challenging problems, ensuring optimal outcomes for both product users and business growth."
      };
    
      return (
        <div>
            The Child Hare is a nimble companion with long ears, designed to assist you in discovering child care options for your kids in Alberta, Canada. This app is optimized for both small and desktop screens. With it, you can zoom into specific areas of interest, apply filters, search for child care facilities, and access detailed information, including Google reviews and photos.
          {/* <h1>About {data.name}</h1>
          <img src={data.headshot} alt={data.name} />
    
          <h2>Contact</h2>
          <p>Email: <a href={`mailto:${data.email}`}>{data.email}</a></p>
    
          <h2>About Me</h2>
          <p>{data.bio}</p>
    
          <h2>Location</h2>
          <p>{data.location}</p>
    
          <h2>Logo</h2>
          <img src={data.logo} alt="Logo" /> */}
        </div>
      );
}

export default AboutPage