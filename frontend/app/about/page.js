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
            <div>
      <header>
        <h1>About Us</h1>
      </header>
      <main>
        <section>
          <h2>Our Story</h2>
          <p>
            Welcome to our about page! Here, we'll share our journey, mission, and values with you.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide the best products/services to our customers and make the world a better place.
          </p>
        </section>

        <section>
          <h2>Meet the Team</h2>
          <ul>
            <li>John Doe - CEO</li>
            <li>Jane Smith - CTO</li>
            <li>Alice Johnson - COO</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Company Name</p>
      </footer>
    </div>
        </div>
      );
}

export default AboutPage