const mongoose = require('mongoose');
const connectDB = require('./config/db');
const { Publisher, Magazine, Tag, Article } = require('./models');

// Connect to MongoDB
connectDB();

// Sample data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Publisher.deleteMany({});
    await Magazine.deleteMany({});
    await Tag.deleteMany({});
    await Article.deleteMany({});
    
    console.log('Cleared existing data');

    // Create publishers
    const publishers = await Publisher.create([
      { name: 'Tech Publishing', location: 'San Francisco' },
      { name: 'Science Media', location: 'Boston' },
      { name: 'Fashion House', location: 'New York' }
    ]);
    
    console.log(`Created ${publishers.length} publishers`);

    // Create magazines linked to publishers
    const magazines = await Magazine.create([
      { 
        title: 'Tech Weekly', 
        issueNumber: 42, 
        publisher: publishers[0]._id 
      },
      { 
        title: 'Cutting Edge Science', 
        issueNumber: 15, 
        publisher: publishers[1]._id 
      },
      { 
        title: 'Tech Monthly', 
        issueNumber: 7, 
        publisher: publishers[0]._id 
      },
      { 
        title: 'Fashion Forward', 
        issueNumber: 23, 
        publisher: publishers[2]._id 
      }
    ]);
    
    console.log(`Created ${magazines.length} magazines`);

    // Create articles
    const articles = await Article.create([
      { 
        title: 'The Future of AI', 
        content: 'Artificial intelligence is rapidly evolving...' 
      },
      { 
        title: 'Quantum Computing Explained', 
        content: 'Quantum computers use quantum bits or qubits...' 
      },
      { 
        title: 'Spring Fashion Trends', 
        content: 'This spring, pastel colors dominate the runway...' 
      },
      { 
        title: 'Climate Change Research', 
        content: 'Recent studies indicate accelerating changes...' 
      }
    ]);
    
    console.log(`Created ${articles.length} articles`);

    // Create tags
    const tags = await Tag.create([
      { name: 'Technology' },
      { name: 'Science' },
      { name: 'Fashion' },
      { name: 'Climate' },
      { name: 'AI' }
    ]);
    
    console.log(`Created ${tags.length} tags`);

    // Associate tags with articles (many-to-many)
    
    // Technology tag for AI and Quantum articles
    tags[0].articles = [articles[0]._id, articles[1]._id];
    await tags[0].save();
    
    // Science tag for Quantum and Climate articles
    tags[1].articles = [articles[1]._id, articles[3]._id];
    await tags[1].save();
    
    // Fashion tag for Spring Fashion article
    tags[2].articles = [articles[2]._id];
    await tags[2].save();
    
    // Climate tag for Climate Change article
    tags[3].articles = [articles[3]._id];
    await tags[3].save();
    
    // AI tag for AI article
    tags[4].articles = [articles[0]._id];
    await tags[4].save();
    
    // Update articles with tags
    
    // AI article with Technology and AI tags
    articles[0].tags = [tags[0]._id, tags[4]._id];
    await articles[0].save();
    
    // Quantum article with Technology and Science tags
    articles[1].tags = [tags[0]._id, tags[1]._id];
    await articles[1].save();
    
    // Fashion article with Fashion tag
    articles[2].tags = [tags[2]._id];
    await articles[2].save();
    
    // Climate article with Science and Climate tags
    articles[3].tags = [tags[1]._id, tags[3]._id];
    await articles[3].save();
    
    console.log('Associated tags with articles (many-to-many relationship)');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 