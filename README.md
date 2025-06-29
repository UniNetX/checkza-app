# Checkza - Chess Training Platform

A modern, React-based chess training platform featuring infinite puzzles, openings, tactics, and comprehensive learning resources.

## 🎯 Features

### Infinite Chess Puzzles
- **Real Lichess Database**: Access to 1.5+ million high-quality puzzles from the official Lichess puzzle database
- **Advanced Filtering**: Filter puzzles by rating range and themes
- **Theme Categories**: 50+ puzzle themes including tactics, endgames, openings, and more
- **Rating Ranges**: From beginner (0-1200) to master (2500+) levels
- **Real-time Feedback**: Instant move validation and solution checking
- **Progress Tracking**: Track solved puzzles, streaks, and accuracy

### Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Beautiful dark interface with chess-inspired design
- **Smooth Animations**: Polished interactions and transitions
- **Accessibility**: Keyboard navigation and screen reader support

### Learning Resources
- **Chess Openings**: Comprehensive opening database with explanations
- **Tactics Training**: Pattern recognition and tactical exercises
- **Endgame Studies**: Essential endgame positions and techniques
- **Analysis Tools**: Position analysis and move evaluation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- The Lichess puzzle database CSV file (`lichess_db_puzzle.csv`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Checkza
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd checkza-app
   npm install
   ```

3. **Set up the puzzle database**
   - Download the Lichess puzzle database from [database.lichess.org](https://database.lichess.org/#puzzles)
   - Extract the CSV file to the project root as `lichess_db_puzzle.csv`

4. **Start the backend server**
   ```bash
   # From the project root
   node server.js
   ```

5. **Start the React app**
   ```bash
   # From checkza-app directory
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 Using the Puzzle System

### Filtering Puzzles
1. **Rating Range**: Select from predefined ranges or custom ranges
2. **Themes**: Choose from 50+ puzzle themes like:
   - Tactics: fork, pin, skewer, discovered attack
   - Endgames: mate, endgame, zugzwang
   - Openings: sicilian defense, queens gambit, etc.
   - Difficulty: short, very long, one move

### Solving Puzzles
1. **Move Pieces**: Click and drag pieces to make moves
2. **Get Feedback**: Instant feedback on correct/incorrect moves
3. **Track Progress**: View your solving statistics and streaks
4. **Next Puzzle**: Automatically load new puzzles with current filters

### Puzzle Statistics
- **Total Solved**: Number of puzzles completed successfully
- **Current Streak**: Consecutive correct solutions
- **Best Streak**: Longest streak achieved
- **Accuracy**: Percentage of correct moves

## 🛠️ Technical Stack

### Frontend
- **React 19**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **React Router**: Client-side routing
- **React Chessboard**: Chess board component
- **Chess.js**: Chess logic and move validation

### Backend
- **Node.js**: Server runtime
- **Express**: Web framework
- **CSV Parser**: Efficient streaming of puzzle database
- **CORS**: Cross-origin resource sharing

### Styling
- **CSS Modules**: Component-scoped styling
- **Custom CSS**: Modern design with gradients and animations
- **Responsive Design**: Mobile-first approach

## 📊 Puzzle Database

The system uses the official Lichess puzzle database containing:
- **1.5+ million puzzles** from real games
- **Rating ranges** from 0 to 3000+
- **50+ themes** for targeted training
- **UCI move format** for precise move validation

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Chess-inspired color schemes
- **Smooth Animations**: Polished user interactions
- **Dark Theme**: Easy on the eyes for extended use
- **Responsive Layout**: Adapts to any screen size

## 🔧 Development

### Project Structure
```
Checkza/
├── checkza-app/          # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── styles/       # CSS files
├── server.js             # Backend server
└── lichess_db_puzzle.csv # Puzzle database
```

### Key Components
- `EnhancedPuzzleBoard`: Main puzzle interface
- `PuzzleFilterBar`: Theme and rating filters
- `Chessboard`: Interactive chess board
- `PuzzleStats`: Progress tracking

## 🚀 Deployment

### Build for Production
```bash
cd checkza-app
npm run build
```

### Environment Variables
- `PORT`: Backend server port (default: 3001)
- `PUZZLE_DB_PATH`: Path to puzzle database CSV

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Lichess**: For providing the puzzle database and inspiration
- **React Chessboard**: For the excellent chess board component
- **Chess.js**: For robust chess logic implementation

---

**Happy Chess Training! ♟️**
