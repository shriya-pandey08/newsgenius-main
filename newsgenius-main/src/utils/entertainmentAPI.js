/**
 * Utility for fetching entertainment news data with fallback to mock data
 */

/**
 * Fetch entertainment headlines from NewsAPI or use mock data if API fails
 */
export const getEntertainmentHeadlines = async () => {
  try {
    // Due to CORS issues or API limitations, we'll use mock data
    throw new Error("Using mock data instead");
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
        id: 1,
        title: "Shah Rukh Khan announces new film project",
        image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1000&auto=format&fit=crop",
        description: "Superstar Shah Rukh Khan reveals details of his upcoming action thriller set to begin filming next month."
      },
      {
        id: 2,
        title: "Deepika Padukone to star in period drama",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
        description: "Actress signs on for ambitious historical epic directed by acclaimed filmmaker Sanjay Leela Bhansali."
      },
      {
        id: 3,
        title: "Ranbir Kapoor and Alia Bhatt's next film together announced",
        image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop",
        description: "The star couple will appear together in a romantic drama scheduled for release next year."
      },
      {
        id: 4,
        title: "Karan Johar announces directorial comeback",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
        description: "The celebrated filmmaker returns to directing with a multi-starrer family drama."
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
        id: 1,
        title: "Marvel reveals Phase 5 lineup at Comic-Con",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
        description: "Studio announces slate of upcoming superhero films and Disney+ series for the next three years."
      },
      {
        id: 2,
        title: "Christopher Nolan begins casting for new sci-fi film",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop",
        description: "The acclaimed director is searching for leads in his mysterious new project backed by Universal Pictures."
      },
      {
        id: 3,
        title: "Tom Cruise trains for a year for Mission Impossible stunt",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
        description: "Actor reveals extensive preparation for what he calls 'the most dangerous stunt ever filmed'."
      },
      {
        id: 4,
        title: "Meryl Streep joins cast of anticipated adaptation",
        image: "https://images.unsplash.com/photo-1512070679279-8988d32161be?q=80&w=1000&auto=format&fit=crop",
        description: "The legendary actress takes on a challenging role in the upcoming literary adaptation."
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
  } catch (error) {
    console.warn('Using mock Tollywood news:', error);
    
    // Return mock data as fallback
    return [
      {
        id: 1,
        title: "SS Rajamouli announces next pan-Indian epic",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
        description: "Following RRR success, the director reveals plans for another period drama with major stars."
      },
      {
        id: 2,
        title: "Allu Arjun's Pushpa 2 breaks pre-release records",
        image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop",
        description: "The highly anticipated sequel sets new benchmarks for distribution deals across multiple territories."
      },
      {
        id: 3,
        title: "Prabhas signs three-film deal with major studio",
        image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop",
        description: "The Baahubali star commits to a trilogy of action films with international distribution."
      },
      {
        id: 4,
        title: "Jr NTR begins training for superhero role",
        image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1000&auto=format&fit=crop",
        description: "Actor undergoes physical transformation for first Telugu superhero franchise film."
      }
    ];
  }
};

/**
 * Get upcoming movie and series releases or use mock data if needed
 */
export const getUpcomingReleases = async () => {
  try {
    // Simulate API delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return updated mock data with 2025 projects
    return [
      {
        id: 1,
        title: "Avengers: Secret Wars",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "May 1, 2025",
        type: "Movie"
      },
      {
        id: 2,
        title: "Avatar 3",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "December 19, 2025",
        type: "Movie"
      },
      {
        id: 3,
        title: "House of the Dragon Season 3",
        image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "Summer 2025",
        type: "Series"
      },
      {
        id: 4,
        title: "Mission: Impossible 8",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "June 27, 2025",
        type: "Movie"
      },
      {
        id: 5,
        title: "The Last of Us Season 2",
        image: "https://images.unsplash.com/photo-1605806616949-59450989e6f7?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "February 2025",
        type: "Series"
      },
      {
        id: 6,
        title: "Joker: Folie à Deux",
        image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "October 4, 2025",
        type: "Movie"
      },
      {
        id: 7,
        title: "Black Panther 3",
        image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "November 2025",
        type: "Movie"
      },
      {
        id: 8,
        title: "Andor Season 2",
        image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "January 2025",
        type: "Series"
      }
    ];
  } catch (error) {
    console.warn('Error fetching upcoming releases, using mock data instead:', error);
    
    // Return backup mock data if needed
    return [
      {
        id: 1,
        title: "Avengers: Secret Wars",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "May 1, 2025",
        type: "Movie"
      },
      {
        id: 2,
        title: "Avatar 3",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop",
        releaseDate: "December 19, 2025",
        type: "Movie"
      }
    ];
  }
}; 