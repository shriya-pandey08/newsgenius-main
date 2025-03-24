import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Box, CircularProgress, Alert, Button, IconButton } from "@mui/material";
import Navigation from "../Navigation/Navigation";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './Entertainment.css';

const EntertainmentDetails = ({ theme }) => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  
  // Collection of articles keyed by their ID
  const articleCollection = {
    // Avatar 3
    "2": {
      id: "2",
      title: "Avatar 3: New Details Revealed About the 2025 Release",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 18, 2024",
      author: "Film Correspondent",
      content: `
        <p>Director James Cameron has shared exciting new details about the highly anticipated "Avatar 3," scheduled for release in December 2025. This third installment in the groundbreaking franchise promises to expand the world of Pandora in unexpected ways.</p>
        
        <p>"We're introducing a new clan of Na'vi that represents a different element," Cameron revealed in a recent interview. "The first two films explored the forest and water, and now we're going to be showing audiences a different side of Pandora with a focus on fire and ash."</p>
        
        <p>The filmmaker confirmed that production on the motion capture elements has been completed, with visual effects work now in full swing at Weta Digital. Early footage shown to select industry insiders has reportedly left them stunned at the continued technical innovation.</p>
        
        <p>"The level of detail and realism has again taken a significant leap forward," said one source who viewed early test footage. "What Cameron is doing with volumetric capture and the new rendering systems is going to change how films are made, just as the first Avatar did."</p>
        
        <p>Several cast members are returning, including Sam Worthington, Zoe Saldaña, and Sigourney Weaver in her new role introduced in "Avatar: The Way of Water." New additions to the cast include Michelle Yeoh and David Thewlis, though details about their characters remain under wraps.</p>
        
        <p>Cameron also addressed the film's lengthy development, noting that the simultaneous work on multiple sequels has allowed for a more cohesive overall story. "When audiences see parts 3, 4, and 5, they'll understand why we approached it this way. It's really one connected saga."</p>
        
        <p>The first "Avatar" film remains the highest-grossing film of all time with $2.9 billion worldwide, while the 2022 sequel "Avatar: The Way of Water" crossed the $2.3 billion mark. Disney, which acquired the franchise through its purchase of 20th Century Fox, has high expectations for the continued performance of the series.</p>
        
        <p>"Avatar 3" will push technological boundaries with new underwater performance capture techniques and higher frame rate presentation options. Cameron has also hinted that the film will feature sequences on Earth, giving audiences context about the ongoing resource crisis that drives human exploitation of Pandora.</p>
        
        <p>"Each film needs to be a standalone adventure but also fit into the larger narrative," Cameron explained. "We're building toward something truly epic by the fifth film."</p>
        
        <p>"Avatar 3" is scheduled for release on December 19, 2025, with the fourth and fifth installments planned for 2029 and 2031 respectively.</p>
      `,
      category: "Hollywood",
      tags: ["Avatar 3", "James Cameron", "Sci-Fi", "2025 Films", "Disney"]
    },
    // Avengers: Secret Wars
    "1": {
      id: "1",
      title: "Avengers: Secret Wars - Everything We Know About Marvel's Next Epic",
      image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 20, 2024",
      author: "Marvel Insider",
      content: `
        <p>Marvel Studios has officially announced that "Avengers: Secret Wars" will be released on May 1, 2025, serving as the culmination of the Multiverse Saga and potentially bringing together heroes from across different universes.</p>
        
        <p>Following the events of "Avengers: The Kang Dynasty," Secret Wars is expected to adapt elements from the popular comic storylines of the same name, particularly the 2015 version by Jonathan Hickman which saw the collision of various Marvel universes.</p>
        
        <p>Kevin Feige, president of Marvel Studios, has described the film as "the most ambitious crossover event yet," suggesting that it could feature characters from past Marvel films, including those from before the MCU and potentially from Sony's Spider-Man universe and Fox's X-Men films.</p>
        
        <p>Industry insiders report that negotiations are underway to bring back former Marvel stars, with Robert Downey Jr., Chris Evans, and Scarlett Johansson all rumored to be in talks for potential returns, though possibly as variant versions of their characters from different universes.</p>
        
        <p>The film is expected to center around the concept of "Battleworld," a patchwork planet made up of fragments of different realities created by a powerful entity. In the comics, this was Doctor Doom, though the MCU may adapt this differently given the focus on Kang variants in recent productions.</p>
        
        <p>Pre-production is scheduled to begin in late 2024, with filming expected to start in early 2025. The movie will be shot back-to-back with "Avengers: The Kang Dynasty" to allow for a cohesive story across both films.</p>
        
        <p>Marvel has been laying the groundwork for Secret Wars through various projects, including "Loki," "Doctor Strange in the Multiverse of Madness," and "Ant-Man and the Wasp: Quantumania," all of which have explored the concept of the multiverse and introduced the threat of incursions between universes.</p>
        
        <p>While no director has been officially announced, several high-profile filmmakers have expressed interest in the project. The studio is reportedly looking for someone with experience handling large ensemble casts and complex visual effects sequences.</p>
        
        <p>"This will be the most technically challenging film we've ever made," said one Marvel executive who requested anonymity. "The visual effects requirements alone are unprecedented."</p>
        
        <p>Fans are speculating that Secret Wars could reset aspects of the MCU timeline, potentially allowing for new actors to take on iconic roles and setting up the next decade of Marvel storytelling.</p>
      `,
      category: "Hollywood",
      tags: ["Avengers", "Marvel", "Secret Wars", "MCU", "2025 Films"]
    },
    // Bollywood Articles
    // Shah Rukh Khan article
    "b1": {
      id: "b1",
      title: "Shah Rukh Khan announces new film project",
      image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 15, 2024",
      author: "Bollywood Reporter",
      content: `
        <p>Superstar Shah Rukh Khan has officially announced his next film project, an action thriller tentatively titled "Black Knight," set to begin production next month. This marks his fourth film announcement since his triumphant return to the big screen in 2023.</p>
        
        <p>The film will be directed by Siddharth Anand, who previously worked with Khan on the blockbuster "Pathaan." According to sources close to the production, "Black Knight" will feature Khan as a former special forces operative who becomes entangled in a global conspiracy.</p>
        
        <p>"This is unlike anything I've done before," Khan stated during the announcement event in Mumbai. "The script immediately grabbed me because it combines the adrenaline rush of action with a deeply emotional core story about redemption and identity."</p>
        
        <p>The film will be shot across multiple international locations including London, Dubai, and Kashmir, with a significant portion of filming taking place at Yash Raj Films' studios in Mumbai. The production budget is reportedly one of the highest ever for an Indian film.</p>
        
        <p>Deepika Padukone is rumored to be in talks to star opposite Khan, which would mark their fourth collaboration following "Om Shanti Om," "Chennai Express," and "Pathaan." However, official confirmation of her involvement is still pending.</p>
        
        <p>The technical team includes cinematographer Satchith Paulose, known for his work on "Vikram" and "Kaithi," and action director Casey O'Neill, who has previously worked on Hollywood productions including "Mission: Impossible" and "Top Gun: Maverick."</p>
        
        <p>"We're pushing the boundaries of what can be achieved in Indian cinema," explained producer Aditya Chopra. "The action sequences planned for this film will set new standards for the industry."</p>
        
        <p>The announcement comes as Khan enjoys a career resurgence following the massive success of "Pathaan," "Jawan," and "Dunki" in 2023, which collectively grossed over ₹3000 crore worldwide. Industry analysts note that Khan's star power remains undiminished despite a brief period of box office challenges prior to 2023.</p>
        
        <p>Music for the film will be composed by Pritam, with lyrics by Irshad Kamil, the duo behind several of Khan's previous hit soundtracks. The first schedule of shooting is set to begin in April 2024, with a targeted release date during the Diwali festival in 2025.</p>
        
        <p>Khan also hinted at potential cameos from other Bollywood stars, saying, "This film has room for some special appearances that I think will surprise and delight audiences. We're in talks with some of my dearest friends in the industry."</p>
      `,
      category: "Bollywood",
      tags: ["Shah Rukh Khan", "Bollywood", "Action Film", "2025 Films", "Siddharth Anand"]
    },
    // Deepika Padukone article
    "b2": {
      id: "b2",
      title: "Deepika Padukone to star in period drama",
      image: "https://images.unsplash.com/photo-1621873493371-9aaee9d508ae?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 16, 2024",
      author: "Cinema Correspondent",
      content: `
        <p>Acclaimed actress Deepika Padukone has signed on for a new ambitious historical epic to be directed by celebrated filmmaker Sanjay Leela Bhansali. The project, titled "Razia Sultana," will tell the story of the first and only female Sultan of Delhi who ruled during the 13th century.</p>
        
        <p>This marks Padukone's fourth collaboration with Bhansali, following their successful partnerships in "Goliyon Ki Raasleela Ram-Leela," "Bajirao Mastani," and "Padmaavat." Each of these previous films has been both a critical and commercial success, with Padukone's performances receiving widespread acclaim.</p>
        
        <p>"Portraying Razia Sultana is both an honor and a tremendous responsibility," Padukone said in a statement. "Her story is one of courage, vision, and defiance of societal norms that resonates even today. I'm thrilled to bring her journey to life under Sanjay sir's direction."</p>
        
        <p>Bhansali, known for his opulent visual style and meticulous attention to historical detail, has reportedly been researching this project for over three years. The film promises to explore Razia Sultana's rise to power, her progressive governance, and the challenges she faced as a woman ruler in a patriarchal society.</p>
        
        <p>"This is a story that has fascinated me for years," Bhansali commented. "Razia Sultana was a visionary leader whose reign challenged gender norms centuries before such conversations entered the mainstream. Deepika has the perfect combination of regal presence and emotional depth to portray this complex character."</p>
        
        <p>The film's production design will be handled by Bhansali's longtime collaborator Subrata Chakraborty, with costume design by Rimple and Harpreet Narula, who previously worked on "Padmaavat." The music, as with all Bhansali films, will be composed by the director himself.</p>
        
        <p>Pre-production has already begun, with extensive set construction underway at Film City in Mumbai. Historical consultants from Delhi University's History Department are working with the production team to ensure historical accuracy while adapting the story for cinematic presentation.</p>
        
        <p>The male lead to star opposite Padukone has not yet been announced, though industry insiders suggest several top actors are being considered for the role of Altunia, a governor who was romantically linked to Razia Sultana.</p>
        
        <p>Filming is scheduled to begin in September 2024 after Padukone completes her current projects, including Nag Ashwin's sci-fi film "Kalki 2898 AD" and her Hollywood debut. The historical epic has a planned release date in December 2025.</p>
        
        <p>"This will be my most challenging role yet," Padukone added. "I'm dedicating the next several months to intense preparation, including studying historical texts, learning Urdu, and training in various martial arts that Razia was known to have mastered."</p>
      `,
      category: "Bollywood",
      tags: ["Deepika Padukone", "Sanjay Leela Bhansali", "Period Drama", "Bollywood", "Historical Film"]
    },
    // Ranbir Kapoor and Alia Bhatt article
    "b3": {
      id: "b3",
      title: "Ranbir Kapoor and Alia Bhatt's next film together announced",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 17, 2024",
      author: "Entertainment Journalist",
      content: `
        <p>Power couple Ranbir Kapoor and Alia Bhatt will appear together in a new romantic drama titled "Safar" (Journey), scheduled for release next year. The announcement comes after the success of their first film together, "Brahmastra: Part One - Shiva," which became one of the highest-grossing Indian films of 2022.</p>
        
        <p>Acclaimed director Shakun Batra, known for "Gehraiyaan" and "Kapoor & Sons," will helm the project. The film is described as a contemporary love story that follows a couple through different phases of their relationship over a decade, exploring themes of growth, connection, and the evolution of love.</p>
        
        <p>"Working with Ranbir and Alia together is a dream come true," Batra stated. "Their chemistry is undeniable, and the emotional depth they both bring to their performances will elevate this story beyond a typical romance."</p>
        
        <p>Kapoor and Bhatt, who married in April 2022 and welcomed their daughter Raha later that year, have been selective about their projects since becoming parents. "Safar" represents their return to the screen as a couple, which has generated significant excitement among fans and industry insiders alike.</p>
        
        <p>"The script resonated with us on a personal level," Bhatt explained during the announcement press conference. "It captures the beautiful complexity of relationships and how they transform over time. It's a mature, nuanced take on modern love."</p>
        
        <p>Kapoor added, "What attracted me to this project is how it portrays love not just as a feeling but as a choice you make every day. The character arc is challenging and unlike any romantic role I've played before."</p>
        
        <p>The supporting cast includes veteran actors Ratna Pathak Shah and Naseeruddin Shah, who will play pivotal roles as family members whose own relationship parallels and contrasts with the central love story. Rising star Triptii Dimri has also been cast in a significant role.</p>
        
        <p>Music for the film will be composed by Pritam, with lyrics by Amitabh Bhattacharya. The duo has previously created memorable soundtracks for both Kapoor and Bhatt's films, including "Ae Dil Hai Mushkil" and "Highway" respectively.</p>
        
        <p>The film will be shot in various locations across India, including Mumbai, Delhi, and Shimla, with an international schedule planned in Italy. Production is set to begin in August 2024, after both actors complete their current commitments.</p>
        
        <p>Karan Johar's Dharma Productions will produce "Safar" in collaboration with Batra's Jouska Films. Johar expressed enthusiasm about the project, saying, "This is the kind of mature, heartfelt storytelling that Indian cinema needs more of. With Ranbir and Alia bringing these characters to life under Shakun's direction, we're confident this film will resonate deeply with audiences."</p>
      `,
      category: "Bollywood",
      tags: ["Ranbir Kapoor", "Alia Bhatt", "Romantic Drama", "Bollywood", "Shakun Batra"]
    },
    // Karan Johar article
    "b4": {
      id: "b4",
      title: "Karan Johar announces directorial comeback",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 14, 2024",
      author: "Film Industry Analyst",
      content: `
        <p>Celebrated filmmaker Karan Johar has announced his return to directing with a multi-starrer family drama tentatively titled "Parivar" (Family). This marks Johar's seventh directorial venture and his first since "Rocky Aur Rani Kii Prem Kahaani," which was released in 2023 to critical and commercial acclaim.</p>
        
        <p>The film boasts an ensemble cast featuring some of Bollywood's biggest stars, including Ranveer Singh, Kareena Kapoor Khan, Vicky Kaushal, and Janhvi Kapoor. Veteran actors Shabana Azmi and Dharmendra have also been confirmed in pivotal roles, continuing their collaboration with Johar following "Rocky Aur Rani Kii Prem Kahaani."</p>
        
        <p>"Storytelling is my passion, and I've always been drawn to family dynamics," Johar stated during the announcement. "With 'Parivar,' I'm exploring the complexities of modern Indian families while honoring our traditional values. It's a narrative that's deeply personal yet universally relatable."</p>
        
        <p>The film is described as a contemporary take on joint family systems, addressing themes of intergenerational relationships, evolving social norms, and the balance between individual aspirations and family responsibilities. The narrative reportedly spans three generations and includes both dramatic and comedic elements.</p>
        
        <p>Production designer Amrita Mahal, who previously collaborated with Johar on "Rocky Aur Rani Kii Prem Kahaani," is creating elaborate sets for the family home where much of the story takes place. The film will also feature sequences shot in Delhi, London, and Switzerland, locations that have become somewhat signature settings in Johar's filmography.</p>
        
        <p>"Karan has crafted a script that feels both fresh and familiar," said Ranveer Singh, who plays one of the central characters. "It captures the essence of what makes his films so special—the emotional depth, the grandeur, the music—while pushing into new territory thematically."</p>
        
        <p>Music for the film will be composed by Pritam, while Johar's frequent collaborator Manish Malhotra will design the costumes. The cinematography will be handled by Jayesh Pradhan, who recently worked on "Animal" and "Brahmastra."</p>
        
        <p>Johar's Dharma Productions will produce the film, with a substantial budget allocated for the large-scale production. The filmmaker mentioned that while the story is emotionally grounded, the visual presentation will have the trademark Dharma grandeur that audiences have come to expect.</p>
        
        <p>"After focusing on producing and mentoring new directors for several years, it feels invigorating to return to hands-on directing," Johar added. "The energy on set when you're bringing your own vision to life is incomparable."</p>
        
        <p>Filming is scheduled to begin in October 2024, with a targeted release during the Diwali festival in 2025. Industry analysts are already predicting that the combination of Johar's directorial sensibilities and the star-studded cast will make "Parivar" one of the most anticipated releases of 2025.</p>
      `,
      category: "Bollywood",
      tags: ["Karan Johar", "Dharma Productions", "Family Drama", "Bollywood", "Ensemble Cast"]
    },
    // House of the Dragon Season 3
    "3": {
      id: "3",
      title: "House of the Dragon Season 3 Begins Production for 2025 Release",
      image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 15, 2024",
      author: "TV Reporter",
      content: `
        <p>HBO has confirmed that production on the third season of "House of the Dragon" has officially begun, with a target release date set for Summer 2025. The hit Game of Thrones prequel series will continue to explore the Targaryen civil war known as the "Dance of the Dragons."</p>
        
        <p>Showrunner Ryan Condal revealed that Season 3 will cover some of the most dramatic events from George R.R. Martin's "Fire & Blood," including major battles involving dragons that will push the boundaries of television visual effects.</p>
        
        <p>"What we're attempting in Season 3 has never been done on television before," Condal stated in a press release. "The scale of the dragon battles alone requires technology that didn't exist even a few years ago."</p>
        
        <p>The principal cast is returning, including Emma D'Arcy as Rhaenyra Targaryen and Olivia Cooke as Alicent Hightower. New additions to the cast include several high-profile actors whose roles remain under wraps, but insiders suggest they will play key historical figures from Martin's lore.</p>
        
        <p>HBO has committed to an expanded budget for the season, reportedly exceeding $20 million per episode, making it one of the most expensive television productions in history. Much of this budget will go toward the extensive CGI required for the multiple dragon battle sequences.</p>
        
        <p>Filming will take place across locations in the UK, Spain, and Portugal, with new sets being constructed to represent locations in Westeros that haven't been seen before in either Game of Thrones or previous seasons of House of the Dragon.</p>
        
        <p>George R.R. Martin is heavily involved in the development of the season, working closely with the writing team to ensure the adaptation remains faithful to his vision while expanding certain storylines for television.</p>
        
        <p>The season will consist of 10 episodes, with each expected to run longer than the typical hour runtime of previous seasons. HBO executives have indicated that some episodes may approach feature length.</p>
        
        <p>"We're entering the heart of this story now," said Martin in a statement. "The events that unfold in Season 3 will forever change the landscape of Westeros and the Targaryen dynasty."</p>
        
        <p>The first teaser for Season 3 is expected to be released in early 2025, with a full trailer coming approximately two months before the premiere.</p>
      `,
      category: "Television",
      tags: ["House of the Dragon", "Game of Thrones", "HBO", "2025 Series", "Fantasy"]
    },
    // Mission: Impossible 8
    "4": {
      id: "4",
      title: "Tom Cruise Performs 'Most Dangerous Stunt Yet' for Mission: Impossible 8",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 17, 2024",
      author: "Action Film Correspondent",
      content: `
        <p>Tom Cruise has once again raised the bar for action filmmaking with what insiders are calling his "most dangerous stunt yet" for the upcoming "Mission: Impossible 8," scheduled for release on June 27, 2025.</p>
        
        <p>The 61-year-old actor, known for performing his own stunts, has reportedly spent over a year training for a sequence that involves piloting a vintage fighter plane through a narrow mountain canyon while performing aerobatic maneuvers. The stunt was filmed in Norway under the supervision of military aviation experts.</p>
        
        <p>"What Tom has accomplished is beyond anything we've seen in cinema before," said director Christopher McQuarrie. "He's not just acting as a pilot—he's actually flying the aircraft through conditions that would challenge even the most experienced military aviators."</p>
        
        <p>Paramount Pictures executives who have seen early footage described the sequence as "breathtaking" and "beyond anything attempted in the previous films." The studio has invested heavily in specialized camera equipment to capture the stunt from multiple angles, including custom-built rigs attached to the aircraft.</p>
        
        <p>Cruise obtained multiple pilot certifications specifically for the film, adding to his already impressive collection of aviation qualifications. He trained with former Blue Angels and Red Arrows pilots to master the techniques required for the sequence.</p>
        
        <p>"The preparation was intense," revealed one of Cruise's instructors who requested anonymity due to non-disclosure agreements. "We're talking about maneuvers that most civilian pilots would never attempt, performed in a vintage aircraft with none of the safety features of modern planes."</p>
        
        <p>The film, which continues the story from "Mission: Impossible – Dead Reckoning," will feature the return of regular cast members including Hayley Atwell, Ving Rhames, Simon Pegg, and Rebecca Ferguson. Several high-profile additions to the cast have been announced, though their roles remain secret.</p>
        
        <p>Beyond the aviation sequence, the film reportedly includes several other practical stunts performed by Cruise, including what is described as an "underwater sequence that defies belief" filmed in the depths of the Baltic Sea.</p>
        
        <p>"The challenge with each new Mission film is topping what came before," said producer Jake Myers. "Somehow Tom always finds a way to push further than anyone thought possible."</p>
        
        <p>The film is currently in post-production, with McQuarrie and his team working to complete the extensive visual effects needed to complement the practical stuntwork. Despite the scale of the production, Paramount has confirmed the film will meet its scheduled release date.</p>
      `,
      category: "Hollywood",
      tags: ["Mission Impossible", "Tom Cruise", "Action", "Stunts", "2025 Films"]
    },
    // The Last of Us Season 2
    "5": {
      id: "5",
      title: "The Last of Us Season 2: HBO Adaptation Aims to Surpass the Original's Success",
      image: "https://images.unsplash.com/photo-1605806616949-59450989e6f7?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 21, 2024",
      author: "TV Correspondent",
      content: `
        <p>HBO's critically acclaimed adaptation of "The Last of Us" is gearing up for its second season, scheduled to premiere in February 2025. Following the massive success of the first season, which garnered multiple Emmy awards and record viewership, the upcoming season aims to bring to life the controversial and emotional story of "The Last of Us Part II" game.</p>
        
        <p>Showrunners Craig Mazin and Neil Druckmann have confirmed that Season 2 will introduce several key characters from the second game, including Abby, who will be played by rising star Kaitlyn Dever. Pedro Pascal and Bella Ramsey are returning as Joel and Ellie, with their relationship taking center stage in the new narrative.</p>
        
        <p>"The story evolves in ways that will shock viewers, even those familiar with the game," Mazin revealed in a recent interview. "We're not shying away from the challenging themes and plot developments that made the second game so impactful and divisive."</p>
        
        <p>Production began in January 2024 in various locations across Canada, including Vancouver and Calgary, with additional filming taking place in Seattle to authentically capture the game's setting. The budget has reportedly been increased significantly from the first season, allowing for more elaborate set pieces and action sequences.</p>
        
        <p>HBO has confirmed that Season 2 will consist of 9 episodes, each running approximately 60 minutes, with some possibly extending to feature length. The network has already greenlit a third season to complete the adaptation of the second game's story, acknowledging that the complex narrative requires more time to be told properly.</p>
        
        <p>"We're dealing with themes of revenge, forgiveness, and the cycle of violence that are incredibly nuanced," explained Druckmann, who also served as creative director on the original games. "Giving these themes room to breathe across two seasons allows us to do justice to the characters and their journeys."</p>
        
        <p>The production team has worked closely with the game developers at Naughty Dog to ensure the adaptation remains faithful to the source material while expanding certain storylines to better suit the television medium. Several new characters and side plots have been developed specifically for the show.</p>
        
        <p>HBO's marketing campaign is expected to begin in late 2024, with the first teaser trailer anticipated to debut alongside the network's fall lineup. Given the controversial nature of the game's story, the marketing is being carefully crafted to prepare viewers without revealing major plot points.</p>
        
        <p>"What we're creating is unlike anything else on television," said HBO's Head of Drama. "The emotional impact of this season will resonate with audiences long after the credits roll on the finale."</p>
        
        <p>The Last of Us Season 2 is set to premiere in February 2025, with weekly episodes scheduled to run through April.</p>
      `,
      category: "Television",
      tags: ["The Last of Us", "HBO", "Video Game Adaptation", "2025 Series", "Pedro Pascal"]
    },
    // Joker: Folie à Deux
    "6": {
      id: "6",
      title: "Joker: Folie à Deux - First Reactions Praise 'Revolutionary' Musical Approach",
      image: "https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 18, 2024",
      author: "Film Critic",
      content: `
        <p>Early industry screenings of "Joker: Folie à Deux" have generated significant buzz, with initial reactions praising director Todd Phillips' bold decision to incorporate musical elements into the highly anticipated sequel scheduled for release on October 4, 2025.</p>
        
        <p>The film, which sees Joaquin Phoenix reprising his Oscar-winning role as Arthur Fleck/Joker, introduces Lady Gaga as Harley Quinn in what is being described as "a tragic love story told through the lens of psychosis and punctuated by haunting musical sequences."</p>
        
        <p>"What Phillips has created is nothing short of revolutionary for the genre," said one industry insider who attended a private screening. "It's a psychological thriller first and foremost, but the musical elements elevate the narrative in ways that are both disturbing and mesmerizing."</p>
        
        <p>The sequel reportedly takes place largely within Arkham Asylum, where Arthur Fleck has been institutionalized following the events of the first film. The musical sequences are said to represent Fleck's increasingly fractured psyche as he forms a complicated relationship with another inmate, played by Gaga.</p>
        
        <p>Phoenix underwent extensive vocal training for the role, while Gaga has reportedly delivered what early viewers are calling "an Oscar-worthy performance" that balances vulnerability with menace. Their on-screen chemistry is described as "electric and unpredictable."</p>
        
        <p>The film's musical approach has been compared to classics like "Cabaret" and "Chicago" rather than traditional musicals, with dark, unsettling numbers that serve to deepen the psychological aspects of the story rather than lighten them. The score and original songs were created by Hildur Guðnadóttir, who won an Academy Award for her work on the first film.</p>
        
        <p>Warner Bros. has been carefully managing expectations for the film, which represents a significant departure from both the first "Joker" and traditional comic book adaptations. Early test screenings reportedly polarized audiences, with some calling it "a masterpiece" while others found the musical approach jarring.</p>
        
        <p>"This isn't a film designed to please everyone," admitted one Warner Bros. executive speaking on condition of anonymity. "It's a bold artistic statement that will likely be debated for years to come."</p>
        
        <p>The supporting cast includes returning actors Zazie Beetz and Brett Cullen, along with new additions Catherine Keener and Brendan Gleeson in undisclosed roles rumored to be significant to the asylum setting.</p>
        
        <p>The first official trailer is scheduled to be released in late 2024, with Warner Bros. planning an extensive marketing campaign that will emphasize the film's unique approach while connecting it to the critically acclaimed original.</p>
      `,
      category: "Hollywood",
      tags: ["Joker", "Joaquin Phoenix", "Lady Gaga", "Musical", "2025 Films"]
    },
    // Black Panther 3
    "7": {
      id: "7",
      title: "Black Panther 3 Set to Explore the Legacy of Wakanda in November 2025",
      image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 19, 2024",
      author: "Marvel Reporter",
      content: `
        <p>Marvel Studios has officially announced that "Black Panther 3" will hit theaters in November 2025, with Ryan Coogler returning to direct and co-write the third installment in the acclaimed franchise. The film will continue to explore the legacy of Wakanda while introducing new threats and allies to the technologically advanced nation.</p>
        
        <p>Following the emotional journey of "Black Panther: Wakanda Forever," which addressed the passing of Chadwick Boseman and saw Letitia Wright's Shuri step into the role of Black Panther, the third film will explore the challenges of maintaining Wakanda's new openness to the world while protecting its sovereignty and resources.</p>
        
        <p>"We're building on the foundation of the first two films while taking the story in directions that will surprise audiences," Coogler stated in the official announcement. "The world of Wakanda is rich with possibilities, and we're excited to explore new corners of this universe."</p>
        
        <p>Marvel Studios president Kevin Feige confirmed that the film will introduce significant new characters from Marvel Comics' Black Panther lore, with casting already underway for what insiders describe as "one of the most compelling villains in the MCU to date."</p>
        
        <p>Letitia Wright will return as Shuri/Black Panther, alongside Lupita Nyong'o as Nakia, Danai Gurira as Okoye, Winston Duke as M'Baku, and Dominique Thorne as Riri Williams/Ironheart. The film will also feature several surprise appearances from other MCU characters, connecting Wakanda more deeply to the broader universe following its increased prominence in global affairs.</p>
        
        <p>Pre-production is set to begin in late 2024, with principal photography scheduled for early 2025. The production will return to Atlanta's Tyler Perry Studios for stage work, with location shooting planned for several countries in Africa to showcase more of the continent's diverse landscapes and cultures.</p>
        
        <p>Ludwig Göransson, who won Academy Awards for his scores for both previous Black Panther films, is confirmed to return to compose the music. The filmmaker has expressed his intention to incorporate even more authentic African musical traditions into the score while continuing to blend them with orchestral and modern elements.</p>
        
        <p>"The cultural impact of the Black Panther franchise has been profound," noted one Disney executive. "This third film aims to push boundaries even further, both in terms of representation and storytelling."</p>
        
        <p>The film will reportedly explore the ancient history of Wakanda more deeply, with flashback sequences revealing previously unknown aspects of the nation's development and early encounters with the outside world. These historical elements will directly connect to the present-day threat facing the kingdom.</p>
        
        <p>"Black Panther 3" is positioned as a major component of Phase Six of the Marvel Cinematic Universe, with events in the film expected to have significant implications for the broader MCU narrative leading into future Avengers films.</p>
      `,
      category: "Hollywood",
      tags: ["Black Panther", "Marvel", "Wakanda", "MCU", "2025 Films"]
    },
    // Andor Season 2
    "8": {
      id: "8",
      title: "Andor Season 2: The Final Chapter of the Star Wars Prequel Series Arrives January 2025",
      image: "https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 22, 2024",
      author: "Star Wars Correspondent",
      content: `
        <p>Disney+ has confirmed that the second and final season of the critically acclaimed Star Wars series "Andor" will premiere in January 2025, completing the story that leads directly into the events of "Rogue One: A Star Wars Story."</p>
        
        <p>The 12-episode season will span four years in the life of Cassian Andor (Diego Luna), showing his transformation from a reluctant rebel to the dedicated operative seen in Rogue One. Creator Tony Gilroy has structured the season with each three-episode arc covering a different year in the formation of the Rebel Alliance.</p>
        
        <p>"This season is about watching the revolution come together and seeing all these disparate resistance groups coalesce into what will become the Alliance we know from the original trilogy," Gilroy explained. "It's also about Cassian finding his purpose and becoming the man who's willing to sacrifice everything for the cause."</p>
        
        <p>Diego Luna, who also serves as an executive producer, has described the final season as "the most challenging and rewarding work of my career." He noted that the physical demands of the role increased significantly as the story approaches the events of Rogue One.</p>
        
        <p>The season will see the return of key characters from Season 1, including Stellan Skarsgård as Luthen Rael, Genevieve O'Reilly as Mon Mothma, and Kyle Soller as Syril Karn. New additions to the cast include actors playing familiar characters from the broader Star Wars universe, though specific details remain under tight wraps.</p>
        
        <p>Production wrapped in February 2024 after an extended filming schedule in the UK, with additional location work in several European countries. The complex production faced several delays due to the extensive practical sets and effects used to maintain the gritty, realistic aesthetic established in the first season.</p>
        
        <p>"We're not compromising on the visual quality or the scope of the storytelling," said Kathleen Kennedy, president of Lucasfilm. "Andor has set a new standard for Star Wars on television, and we're committed to maintaining that through the conclusion of this important story."</p>
        
        <p>The season will continue the show's exploration of the moral complexities of rebellion and the personal costs of fighting against tyranny. Early footage shown to Disney executives reportedly includes several major action sequences that rival those seen in Star Wars theatrical releases.</p>
        
        <p>Nicholas Britell returns to compose the score, building on his Emmy-nominated work from the first season. The composer has indicated that the music will evolve to reflect the growing momentum of the rebellion and Cassian's personal journey.</p>
        
        <p>Disney+ plans to release the first three episodes simultaneously in January 2025, with subsequent episodes arriving weekly until the series finale in late March, which insiders describe as "a perfect handoff to Rogue One that will give new meaning to the events of that film."</p>
      `,
      category: "Television",
      tags: ["Andor", "Star Wars", "Disney+", "2025 Series", "Diego Luna"]
    },
    // Default article for any other IDs
    "default": {
      id: id,
      title: `Upcoming Release Details: Coming Soon`,
      image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop",
      publishDate: "March 2024",
      author: "Entertainment Reporter",
      content: `
        <p>We're gathering more information about this upcoming release. Check back soon for detailed coverage!</p>
        
        <p>The entertainment landscape of 2025 is shaping up to be one of the most exciting in recent years, with major franchises reaching new milestones and streaming platforms investing heavily in original content.</p>
        
        <p>Stay tuned to News Genius for all the latest updates on this and other entertainment releases coming in 2025.</p>
      `,
      category: "Entertainment",
      tags: ["2025 Releases", "Entertainment", "Coming Soon"]
    }
  };
  
  useEffect(() => {
    // Simulating loading article data
    const fetchArticleData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch from an API based on the ID
        // For now, we'll simulate with a delay and mock data
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the specific article based on ID, or use default if not found
        const selectedArticle = articleCollection[id] || articleCollection.default;
        
        setArticle(selectedArticle);
        
        // Find related articles based on category and tags
        const related = Object.values(articleCollection)
          .filter(relatedArticle => 
            relatedArticle.id !== selectedArticle.id && 
            (relatedArticle.category === selectedArticle.category || 
             relatedArticle.tags.some(tag => selectedArticle.tags.includes(tag)))
          )
          .slice(0, 4);
        
        setRelatedArticles(related);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching article data:", error);
        setError("Failed to load article details. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchArticleData();
  }, [id, type]);

  const toggleLike = () => {
    setLiked(!liked);
    
    // In a real app, you would send this to an API or update localStorage
    // For example:
    // const userId = localStorage.getItem('userId');
    // if (userId) {
    //   const userLikesKey = `user_${userId}_likes`;
    //   const userLikes = JSON.parse(localStorage.getItem(userLikesKey) || '{}');
    //   
    //   if (!liked) {
    //     userLikes[article.id] = true;
    //   } else {
    //     delete userLikes[article.id];
    //   }
    //   
    //   localStorage.setItem(userLikesKey, JSON.stringify(userLikes));
    // }
  };
  
  const toggleSave = () => {
    setSaved(!saved);
    
    // Similar to like functionality, would update in a real app
  };

  if (loading) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Navigation activePage="entertainment" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>Loading article...</Typography>
          </Box>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Navigation activePage="entertainment" theme={theme} />
        </Grid>
        <Grid item xs={12} lg={9} className="w-full relative px-2 sm:px-4 md:px-5">
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
            <Button onClick={() => window.location.reload()} sx={{ ml: 2 }}>
              Retry
            </Button>
          </Alert>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      {/* Mobile Navigation Header - only visible on small screens */}
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 1,
          p: 1,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <IconButton onClick={() => navigate('/entertainment')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Article Details</Typography>
        <IconButton onClick={() => setShowMobileNav(!showMobileNav)}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Navigation - conditionally rendered */}
      {showMobileNav && (
        <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
          <Navigation activePage="entertainment" theme={theme} />
        </Box>
      )}

      {/* Desktop Navigation */}
      <Grid item xs={12} lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Navigation activePage="entertainment" theme={theme} />
      </Grid>

      {/* Main Content */}
      <Grid item xs={12} lg={6.5} className="w-full relative px-2 sm:px-4 md:px-5">
        {article && (
          <Box sx={{ mt: 4 }}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={() => navigate('/entertainment')}
              sx={{ mb: 2 }}
            >
              Back to Entertainment
            </Button>
            
            <Typography variant="h4" gutterBottom>
              {article.title}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                By {article.author} | {article.publishDate}
              </Typography>
              
              <Box>
                <IconButton onClick={toggleLike} size="small">
                  {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <IconButton onClick={toggleSave} size="small">
                  {saved ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton size="small">
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            
            <Box 
              component="img" 
              src={article.image}
              alt={article.title}
              sx={{ 
                width: '100%', 
                height: { xs: 200, sm: 300, md: 400 }, 
                objectFit: 'cover',
                borderRadius: 1,
                mb: 3 
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
              }}
            />
            
            <Box 
              dangerouslySetInnerHTML={{ __html: article.content }} 
              sx={{ 
                '& p': { 
                  mb: 2, 
                  lineHeight: 1.7 
                } 
              }}
            />
            
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Tags:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {article.tags.map((tag, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      bgcolor: 'action.hover', 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 1,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'action.selected'
                      }
                    }}
                    onClick={() => navigate(`/entertainment/tag/${tag}`)}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Grid>
      
      {/* Related Articles Space */}
      <Grid item xs={12} lg={2.5} sx={{ 
        display: { xs: 'block', sm: 'block', lg: 'block' },
        mt: { xs: 4, lg: 4 },
        pl: { xs: 0, lg: 2 },
        px: { xs: 2, sm: 4 }
      }}>
        <Box>
          <Typography variant="h6" gutterBottom>Related Articles</Typography>
          {article && (
            <Box>
              {relatedArticles.length > 0 ? (
                <>
                  <Box sx={{ 
                    display: { xs: 'grid', sm: 'grid', md: 'block' },
                    gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' },
                    gap: 2
                  }}>
                    {relatedArticles.map((relatedArticle, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          mb: 3, 
                          cursor: 'pointer',
                          '&:hover': { opacity: 0.8 }
                        }}
                        onClick={() => navigate(`/entertainment/details/${relatedArticle.id}/${relatedArticle.category.toLowerCase()}`)}
                      >
                        <Box 
                          component="img" 
                          src={relatedArticle.image}
                          alt={relatedArticle.title}
                          sx={{ 
                            width: '100%', 
                            height: 100, 
                            objectFit: 'cover',
                            borderRadius: 1,
                            mb: 1
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=1000&auto=format&fit=crop";
                          }}
                        />
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                          {relatedArticle.title.length > 60 
                            ? relatedArticle.title.substring(0, 60) + '...' 
                            : relatedArticle.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {relatedArticle.publishDate}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  {/* Add a "More Articles" link */}
                  <Button 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    onClick={() => navigate('/entertainment')}
                    sx={{ mt: 2 }}
                  >
                    More Articles
                  </Button>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No related articles found.
                </Typography>
              )}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default EntertainmentDetails; 