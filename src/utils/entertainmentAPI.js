import axios from 'axios';

/**
 * Utility for fetching entertainment news data with fallback to mock data
 */

// Uses free NewsAPI for real data (you'll need to use your own API key in production)
const NEWS_API_KEY = '9e76e457ea734bd79ae1f3b784796948'; // This is limited to localhost development only
const NEWS_API_URL = 'https://newsapi.org/v2';

/**
 * Fetch entertainment headlines from NewsAPI or use mock data if API fails
 */
export const getEntertainmentHeadlines = async () => {
  try {
    // Due to CORS issues or API limitations, we'll use mock data for now
    // In a production app, you would properly implement API calls
    throw new Error("Using mock data instead");
    
    // Format the data for our app
    return response.data.articles.map(article => article.title);
  } catch (error) {
    console.warn('Using mock entertainment headlines:', error);
    
    // Return mock data as fallback
    return [
      "Avatar 3 production complete, release date announced for December 2025",
      "Rajinikanth announces new film with acclaimed director",
      "Scarlett Johansson to direct her first feature film in 2024",
      "Aamir Khan and Shah Rukh Khan to collaborate on new project",
      "Marvel announces next phase of superhero films at Comic-Con",
      "SS Rajamouli begins work on new epic following RRR success",
      "Christopher Nolan's next film to begin production in fall 2024",
      "Deepika Padukone signs three-film deal with international studio",
      "Tom Cruise confirms two more Mission Impossible sequels"
    ];
  }
};

/**
 * Fetch Bollywood news or use mock data if API fails
 */
export const getBollywoodNews = async () => {
  try {
    // Use mock data instead of API for demo purposes
    throw new Error("Using mock data instead");
    
  } catch (error) {
    console.warn('Using mock Bollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: "b1",
        title: "Shah Rukh Khan announces new film project",
        image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop",
        description: "Superstar Shah Rukh Khan reveals details of his upcoming action thriller set to begin filming next month.",
        category: "bollywood",
        datePublished: "March 15, 2024",
        content: `
          <h2>Shah Rukh Khan's Next Big Project Revealed</h2>
          <p>Bollywood superstar Shah Rukh Khan has officially announced his next film project, an action thriller tentatively titled "Black Knight." The film is set to begin production next month, marking his fourth major announcement since his triumphant return to the big screen in 2023.</p>
          
          <h3>Project Details</h3>
          <p>The film will be directed by Siddharth Anand, who previously collaborated with Khan on the blockbuster "Pathaan." According to sources close to the production, "Black Knight" will feature Khan as a former special forces operative who becomes entangled in a global conspiracy.</p>
          
          <h3>Star's Statement</h3>
          <p>"This is unlike anything I've done before," Khan stated during the announcement event in Mumbai. "The script immediately grabbed me because it combines the adrenaline rush of action with a deeply emotional core story about redemption and identity."</p>
          
          <h3>Production Scale</h3>
          <p>The film will be shot across multiple international locations including London, Dubai, and Kashmir, with a significant portion of filming taking place at Yash Raj Films' studios in Mumbai. The production budget is reportedly one of the highest ever for an Indian film.</p>
        `
      },
      {
        id: "b2",
        title: "Deepika Padukone to star in period drama",
        image: "https://images.unsplash.com/photo-1621873493371-9aaee9d508ae?q=80&w=1000&auto=format&fit=crop",
        description: "Actress signs on for ambitious historical epic directed by acclaimed filmmaker Sanjay Leela Bhansali.",
        category: "bollywood",
        datePublished: "March 14, 2024",
        content: `
          <h2>Deepika Padukone Takes on Epic Historical Role</h2>
          <p>Deepika Padukone has signed on to star in acclaimed director Sanjay Leela Bhansali's next historical epic, a project that promises to be one of the most ambitious Indian films ever made.</p>
          
          <h3>The Project</h3>
          <p>The yet-untitled film will be set in the Mughal era and will feature Padukone as a powerful historical figure. Bhansali, known for his grand vision and attention to detail, has been researching the project for over two years.</p>
          
          <h3>Production Details</h3>
          <p>The film will begin shooting in late 2024 and is expected to be released in 2025. The production will feature elaborate sets, authentic period costumes, and groundbreaking visual effects.</p>
          
          <h3>Star's Preparation</h3>
          <p>Padukone will undergo extensive preparation for the role, including learning classical dance forms and period-appropriate mannerisms. The actress will also train in sword fighting and horse riding for action sequences.</p>
        `
      },
      {
        id: "b3",
        title: "Ranbir Kapoor and Alia Bhatt's next film together announced",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
        description: "The star couple will appear together in a romantic drama scheduled for release next year.",
        category: "bollywood",
        datePublished: "March 13, 2024",
        content: `
          <h2>Power Couple Returns to Screen</h2>
          <p>Bollywood's beloved couple, Ranbir Kapoor and Alia Bhatt, have announced their next project together, a romantic drama that promises to push boundaries in Indian cinema.</p>
          
          <h3>The Film</h3>
          <p>Titled "Love in the Modern Age," the film will explore contemporary relationships through the lens of social media and technology. The project will be directed by an acclaimed indie filmmaker making their mainstream debut.</p>
          
          <h3>Unique Approach</h3>
          <p>The film will feature a non-linear narrative structure and incorporate elements of magical realism. Both actors have described it as their most challenging project to date.</p>
          
          <h3>Release Plans</h3>
          <p>The film is scheduled to begin production in mid-2024 and is targeting a Valentine's Day 2025 release. It will be simultaneously released in theaters and on streaming platforms.</p>
        `
      },
      {
        id: "b4",
        title: "Karan Johar announces directorial comeback",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop",
        description: "The celebrated filmmaker returns to directing with a multi-starrer family drama.",
        category: "bollywood",
        datePublished: "March 12, 2024",
        content: `
          <h2>Karan Johar's Grand Return to Direction</h2>
          <p>After a brief hiatus, celebrated filmmaker Karan Johar has announced his return to directing with an ambitious multi-starrer family drama that promises to redefine the genre.</p>
          
          <h3>Project Overview</h3>
          <p>The film, titled "Family Ties," will feature an ensemble cast of three generations of actors. Johar describes it as his most personal film yet, drawing from his experiences as both a son and a father.</p>
          
          <h3>Cast Assembly</h3>
          <p>The film will bring together veteran actors with current stars and newcomers, creating what Johar calls "a perfect blend of experience and fresh energy."</p>
          
          <h3>Production Details</h3>
          <p>Shooting will commence in October 2024 with a planned release in late 2025. The film will be shot entirely in India, with major portions in Mumbai and Delhi.</p>
        `
      }
    ];
  }
};

/**
 * Fetch Hollywood news or use mock data if API fails
 */
export const getHollywoodNews = async () => {
  try {
    // Use mock data instead of API for demo purposes
    throw new Error("Using mock data instead");
    
  } catch (error) {
    console.warn('Using mock Hollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: "h1",
        title: "Marvel reveals Phase 5 lineup at Comic-Con",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
        description: "Studio announces slate of upcoming superhero films and Disney+ series for the next three years.",
        category: "hollywood",
        datePublished: "March 16, 2024",
        content: `
          <h2>Marvel's Phase 5: A New Era of Superhero Entertainment</h2>
          <p>Marvel Studios President Kevin Feige took the stage at Comic-Con to unveil an ambitious slate of upcoming projects that will define Phase 5 of the Marvel Cinematic Universe. The announcement included both theatrical releases and Disney+ series planned through 2026.</p>
          
          <h3>Theatrical Releases</h3>
          <p>The studio announced several major film projects:</p>
          <ul>
            <li>Captain America: New World Order (May 2025)</li>
            <li>Thunderbolts (July 2025)</li>
            <li>Fantastic Four (November 2025)</li>
            <li>Avengers: Secret Wars (May 2026)</li>
          </ul>
          
          <h3>Disney+ Series</h3>
          <p>The streaming lineup includes:</p>
          <ul>
            <li>Agatha: House of Harkness</li>
            <li>Daredevil: Born Again</li>
            <li>Wonder Man</li>
            <li>Nova</li>
          </ul>
          
          <h3>Multiverse Saga</h3>
          <p>Feige confirmed that all these projects will contribute to what's being called "The Multiverse Saga," leading to an epic conclusion in Secret Wars.</p>
        `
      },
      {
        id: "h2",
        title: "Christopher Nolan begins casting for new sci-fi film",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop",
        description: "The acclaimed director is searching for leads in his mysterious new project backed by Universal Pictures.",
        category: "hollywood",
        datePublished: "March 15, 2024",
        content: `
          <h2>Nolan's Next: A New Sci-Fi Epic Takes Shape</h2>
          <p>Christopher Nolan has begun the casting process for his next film, a science fiction epic that promises to push the boundaries of the genre. Universal Pictures is backing the project with a reported budget of $200 million.</p>
          
          <h3>Project Details</h3>
          <p>While plot details are being kept under wraps, sources describe the film as "a mind-bending exploration of time and consciousness." The project will reunite Nolan with cinematographer Hoyte van Hoytema and composer Hans Zimmer.</p>
          
          <h3>Casting Process</h3>
          <p>The director is reportedly meeting with A-list talent for the lead roles. The film will require a cast of both established stars and new faces, with at least five major roles to be filled.</p>
          
          <h3>Technical Innovation</h3>
          <p>Nolan plans to shoot the entire film in IMAX format using newly developed cameras, continuing his commitment to practical effects and minimal CGI.</p>
        `
      },
      {
        id: "h3",
        title: "Tom Cruise trains for a year for Mission Impossible stunt",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
        description: "Actor reveals extensive preparation for what he calls 'the most dangerous stunt ever filmed'.",
        category: "hollywood",
        datePublished: "March 14, 2024",
        content: `
          <h2>Tom Cruise's Most Ambitious Stunt Yet</h2>
          <p>Tom Cruise has spent the past year preparing for what he describes as "the most challenging and dangerous stunt ever attempted in cinema." The sequence will be featured in the upcoming Mission: Impossible 8.</p>
          
          <h3>The Preparation</h3>
          <p>Cruise's training regimen has included:</p>
          <ul>
            <li>Advanced skydiving techniques</li>
            <li>High-altitude conditioning</li>
            <li>Specialized equipment training</li>
            <li>Months of physical conditioning</li>
          </ul>
          
          <h3>Technical Details</h3>
          <p>The stunt involves multiple elements including aerial sequences, high-speed vehicles, and practical effects. A special camera system was developed specifically to capture the sequence.</p>
          
          <h3>Safety Measures</h3>
          <p>Despite the extreme nature of the stunt, extensive safety protocols have been put in place, with multiple backup systems and emergency procedures ready.</p>
        `
      },
      {
        id: "h4",
        title: "Meryl Streep joins cast of anticipated adaptation",
        image: "https://images.unsplash.com/photo-1615414047026-802692414b29?q=80&w=1000&auto=format&fit=crop",
        description: "The legendary actress takes on a challenging role in the upcoming literary adaptation.",
        category: "hollywood",
        datePublished: "March 13, 2024",
        content: `
          <h2>Meryl Streep Takes on Challenging New Role</h2>
          <p>Three-time Academy Award winner Meryl Streep has joined the cast of the highly anticipated adaptation of the Pulitzer Prize-winning novel "The Echo of Memory." The film will be directed by an acclaimed international filmmaker making their English-language debut.</p>
          
          <h3>The Role</h3>
          <p>Streep will portray a complex character spanning three different time periods, requiring extensive makeup and prosthetic work. The role is being described as one of the most challenging of her illustrious career.</p>
          
          <h3>Production Details</h3>
          <p>Filming will begin in fall 2024 across locations in New England and Europe. The production will utilize both period sets and cutting-edge digital technology to create the film's multiple time periods.</p>
          
          <h3>Director's Vision</h3>
          <p>The director has described the film as "a meditation on memory, identity, and the passage of time," themes that resonated strongly with Streep when she first read the script.</p>
        `
      }
    ];
  }
};

/**
 * Fetch Tollywood/South Indian cinema news or use mock data if API fails
 */
export const getTollywoodNews = async () => {
  try {
    // Use mock data instead of API for demo purposes
    throw new Error("Using mock data instead");
    
    // Format the data for our app
    return response.data.articles.map(article => ({
      id: article.url,
      title: article.title,
      image: article.urlToImage || "https://cdn.pixabay.com/photo/2013/11/28/10/36/camera-220052_1280.jpg",
      description: article.description || "Latest South Indian cinema updates",
      category: "tollywood"
    }));
  } catch (error) {
    console.warn('Using mock Tollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: "t1",
        title: "SS Rajamouli announces next pan-Indian epic",
        image: "https://images.unsplash.com/photo-1611523658822-385aa008324c?q=80&w=1000&auto=format&fit=crop",
        description: "Following RRR success, the director reveals plans for another period drama with major stars.",
        category: "tollywood"
      },
      {
        id: "t2",
        title: "Allu Arjun's Pushpa 2 breaks pre-release records",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
        description: "The highly anticipated sequel sets new benchmarks for distribution deals across multiple territories.",
        category: "tollywood"
      },
      {
        id: "t3",
        title: "Prabhas signs three-film deal with major studio",
        image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1000&auto=format&fit=crop",
        description: "The Baahubali star commits to a trilogy of action films with international distribution.",
        category: "tollywood"
      },
      {
        id: "t4",
        title: "Jr NTR begins training for superhero role",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop",
        description: "Actor undergoes physical transformation for first Telugu superhero franchise film.",
        category: "tollywood"
      }
    ];
  }
};

/**
 * Get upcoming movie and series releases or use mock data if needed
 */
export const getUpcomingReleases = async () => {
  try {
    // Use mock data for demo purposes
    // In a real app, you would implement this with The Movie Database API
    
    // Simulate API delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock data
    return [
      {
        id: "1",
        title: "Avengers: Secret Wars",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "May 1, 2025",
        type: "Movie",
        category: "hollywood"
      },
      {
        id: "2",
        title: "Avatar 3",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "December 19, 2025",
        type: "Movie",
        category: "hollywood"
      },
      {
        id: "3",
        title: "House of the Dragon Season 3",
        image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "Summer 2025",
        type: "Series",
        category: "television"
      },
      {
        id: "4",
        title: "Mission: Impossible 8",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "June 27, 2025",
        type: "Movie",
        category: "hollywood",
        description: "Tom Cruise returns for the explosive finale to the Mission: Impossible saga"
      },
      {
        id: "5",
        title: "The Last of Us Season 2",
        image: "https://images.unsplash.com/photo-1605806616949-59450989e6f7?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "February 2025",
        type: "Series",
        category: "television",
        description: "Pedro Pascal and Bella Ramsey return in the acclaimed adaptation of the hit game"
      },
      {
        id: "6",
        title: "Joker: Folie à Deux",
        image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "October 4, 2025",
        type: "Movie",
        category: "hollywood"
      },
      {
        id: "7",
        title: "Black Panther 3",
        image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "November 2025",
        type: "Movie",
        category: "hollywood"
      },
      {
        id: "8",
        title: "Andor Season 2",
        image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "January 2025",
        type: "Series",
        category: "television"
      }
    ];
  } catch (error) {
    console.error('Error fetching upcoming releases:', error);
    return [];
  }
}; 