import React from 'react';
import './home.css';

const CurriculumKit: React.FC = () => (
  <div className="cz-home" style={{ minHeight: '100vh', background: '#181c24', color: '#f3f4f6', padding: 0 }}>
    {/* Hero Section */}
    <section className="cz-hero" style={{ background: '#23263a', borderBottom: '1px solid #23263a', padding: '3rem 0 2rem 0' }}>
      <div className="cz-container" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🧠</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#7fa7ff', marginBottom: '0.7rem' }}>Complete Chess Curriculum Kit</h1>
        <p style={{ color: '#b3b8d0', fontSize: '1.2rem', marginBottom: '2rem' }}>
          A comprehensive 12-lesson curriculum designed by a 4-Year Lead Instructor. Everything you need to teach chess effectively.
        </p>
      </div>
    </section>

    {/* Table of Contents */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.6rem', marginBottom: '1.2rem' }}>📚 Curriculum Contents</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📖 Lesson Plans</h3>
          <p style={{ color: '#b3b8d0', fontSize: '0.9rem' }}>12 detailed lesson plans with objectives, activities, and assessments</p>
        </div>
        <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎯 Teaching Methods</h3>
          <p style={{ color: '#b3b8d0', fontSize: '0.9rem' }}>Proven teaching strategies and classroom management techniques</p>
        </div>
        <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📊 Assessment Tools</h3>
          <p style={{ color: '#b3b8d0', fontSize: '0.9rem' }}>Quizzes, progress tracking, and evaluation methods</p>
        </div>
        <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎮 Activities</h3>
          <p style={{ color: '#b3b8d0', fontSize: '0.9rem' }}>Interactive games, puzzles, and hands-on exercises</p>
        </div>
      </div>
    </section>

    {/* Detailed Lesson Plans */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>📋 Detailed Lesson Plans</h2>
      
      {/* Lesson 1 */}
      <div style={{ marginBottom: '3rem', padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
        <h3 style={{ color: '#43e97b', fontSize: '1.4rem', marginBottom: '1rem' }}>Lesson 1: Introduction to Chess & The Board</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎯 Learning Objectives</h4>
            <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
              <li>Understand the chessboard layout and coordinates</li>
              <li>Learn the names and positions of all pieces</li>
              <li>Develop spatial awareness and board orientation</li>
              <li>Practice proper board setup</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>⏱️ Duration: 60 minutes</h4>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>👥 Group Size: 8-20 students</h4>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📚 Materials Needed</h4>
            <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
              <li>Chessboards (one per 2 students)</li>
              <li>Chess pieces</li>
              <li>Coordinate cards</li>
              <li>Whiteboard/markers</li>
            </ul>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>📝 Lesson Activities</h4>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Warm-up (10 min):</strong> Board orientation game - students identify squares by coordinates</p>
            <p><strong>Main Activity (35 min):</strong> Piece identification and setup practice</p>
            <p><strong>Assessment (10 min):</strong> Setup race and coordinate quiz</p>
            <p><strong>Wrap-up (5 min):</strong> Review key concepts and preview next lesson</p>
          </div>
        </div>
      </div>

      {/* Lesson 2 */}
      <div style={{ marginBottom: '3rem', padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
        <h3 style={{ color: '#43e97b', fontSize: '1.4rem', marginBottom: '1rem' }}>Lesson 2: How the Pieces Move</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎯 Learning Objectives</h4>
            <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
              <li>Master the movement patterns of all pieces</li>
              <li>Understand piece values and relative strength</li>
              <li>Practice piece movement through interactive games</li>
              <li>Learn piece capture mechanics</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎮 Teaching Methods</h4>
            <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
              <li>Demonstration with large board</li>
              <li>Hands-on practice exercises</li>
              <li>Movement pattern games</li>
              <li>Piece value memory games</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lesson 3 */}
      <div style={{ marginBottom: '3rem', padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
        <h3 style={{ color: '#43e97b', fontSize: '1.4rem', marginBottom: '1rem' }}>Lesson 3: Basic Checkmates</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🎯 Learning Objectives</h4>
            <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
              <li>Understand the concept of checkmate</li>
              <li>Learn basic checkmate patterns</li>
              <li>Practice queen and rook checkmates</li>
              <li>Develop checkmate recognition skills</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#7fa7ff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>🏆 Key Patterns</h4>
            <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
              <li>Queen checkmate (2-move pattern)</li>
              <li>Rook checkmate (3-move pattern)</li>
              <li>Back rank checkmate</li>
              <li>Smothered checkmate</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Lessons Summary */}
      <div style={{ padding: '2rem', background: '#1a202c', borderRadius: 12, border: '1px solid #2d3748' }}>
        <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📚 Remaining Lessons Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 4: Opening Principles</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Center control, piece development, king safety</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 5: Capturing & Exchanges</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Piece values, exchange calculations, tactics</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 6: Castling & King Safety</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Castling rules, king protection, safety principles</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 7: Tactics</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Pins, forks, skewers, discovered attacks</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 8: Endgame Basics</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>King and pawn endgames, opposition</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 9: Piece Coordination</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Piece cooperation, attacking coordination</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 10: Planning & Strategy</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Long-term planning, strategic thinking</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 11: Common Mistakes</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Error prevention, defensive play</p>
          </div>
          <div style={{ padding: '1rem', background: '#2d3748', borderRadius: 8 }}>
            <h4 style={{ color: '#7fa7ff', fontSize: '1rem' }}>Lesson 12: Complete Game</h4>
            <p style={{ color: '#b3b8d0', fontSize: '0.85rem' }}>Full game analysis, tournament preparation</p>
          </div>
        </div>
      </div>
    </section>

    {/* Teaching Methodologies */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>🎓 Teaching Methodologies</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🏫 Classroom Management</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Establish clear rules and expectations from day one</li>
            <li>Use positive reinforcement and celebrate progress</li>
            <li>Implement a buddy system for peer learning</li>
            <li>Create a structured routine with consistent timing</li>
            <li>Use visual aids and demonstrations for complex concepts</li>
            <li>Maintain an organized classroom with designated areas</li>
            <li>Implement a fair rotation system for games and activities</li>
            <li>Address behavioral issues promptly and consistently</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Differentiated Instruction</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Assess individual skill levels and learning styles</li>
            <li>Provide multiple difficulty levels for activities</li>
            <li>Use visual, auditory, and kinesthetic learning methods</li>
            <li>Create small groups based on ability and interest</li>
            <li>Offer extension activities for advanced students</li>
            <li>Provide additional support for struggling learners</li>
            <li>Use technology to enhance learning experiences</li>
            <li>Encourage peer tutoring and collaborative learning</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📊 Assessment Strategies</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Use formative assessments throughout lessons</li>
            <li>Implement skill-based checklists and rubrics</li>
            <li>Conduct regular one-on-one evaluations</li>
            <li>Use game analysis to assess understanding</li>
            <li>Create portfolio assessments for long-term progress</li>
            <li>Use self-assessment and peer evaluation</li>
            <li>Track improvement through rating systems</li>
            <li>Provide constructive feedback and goal-setting</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎮 Engagement Techniques</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Use storytelling to explain chess concepts</li>
            <li>Incorporate competitive elements and tournaments</li>
            <li>Create themed lessons and special events</li>
            <li>Use technology and online resources</li>
            <li>Implement reward systems and achievements</li>
            <li>Create hands-on activities and projects</li>
            <li>Use humor and games to maintain interest</li>
            <li>Connect chess to real-world applications</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Interactive Activities */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>🎮 Interactive Activities & Games</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Warm-up Games</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Coordinate Hunt:</strong> Call out coordinates, students place pieces</p>
            <p><strong>Piece Memory:</strong> Identify pieces by touch or description</p>
            <p><strong>Setup Race:</strong> Timed board setup competitions</p>
            <p><strong>Movement Patterns:</strong> Follow-the-leader piece movement</p>
            <p><strong>Chess Simon Says:</strong> Movement commands with verification</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🧩 Puzzle Activities</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Mate in One:</strong> Simple checkmate puzzles</p>
            <p><strong>Capture Puzzles:</strong> Find the best captures</p>
            <p><strong>Defense Puzzles:</strong> Find ways to defend</p>
            <p><strong>Pattern Recognition:</strong> Identify tactical themes</p>
            <p><strong>Endgame Studies:</strong> Basic endgame positions</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🏆 Tournament Formats</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Swiss System:</strong> Fair pairing for all skill levels</p>
            <p><strong>Round Robin:</strong> Everyone plays everyone</p>
            <p><strong>Elimination:</strong> Single or double elimination</p>
            <p><strong>Team Events:</strong> Collaborative competitions</p>
            <p><strong>Blitz Tournaments:</strong> Fast-paced timed games</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📚 Educational Games</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Chess Bingo:</strong> Mark squares as pieces move</p>
            <p><strong>Value Trading:</strong> Practice piece exchanges</p>
            <p><strong>Position Memory:</strong> Recreate positions from memory</p>
            <p><strong>Opening Explorer:</strong> Try different opening moves</p>
            <p><strong>Endgame Race:</strong> First to checkmate wins</p>
          </div>
        </div>
      </div>
    </section>

    {/* Assessment Tools */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>📊 Assessment & Progress Tracking</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📋 Skill Assessment Rubric</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Beginner (0-500):</strong> Knows piece movements, basic rules</p>
            <p><strong>Novice (500-800):</strong> Understands tactics, opening principles</p>
            <p><strong>Intermediate (800-1200):</strong> Strategic thinking, endgame knowledge</p>
            <p><strong>Advanced (1200+):</strong> Deep analysis, tournament experience</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📈 Progress Tracking</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Weekly skill assessments</li>
            <li>Game analysis and improvement tracking</li>
            <li>Tournament performance records</li>
            <li>Puzzle solving statistics</li>
            <li>Attendance and participation logs</li>
            <li>Goal-setting and achievement tracking</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Evaluation Methods</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Written quizzes and tests</li>
            <li>Practical demonstrations</li>
            <li>Game analysis assignments</li>
            <li>Peer evaluations</li>
            <li>Self-assessment questionnaires</li>
            <li>Performance in tournaments</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📝 Feedback Systems</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Individual progress reports</li>
            <li>Parent-teacher conferences</li>
            <li>Student self-reflection journals</li>
            <li>Peer feedback sessions</li>
            <li>Online progress dashboards</li>
            <li>Regular check-ins and goal reviews</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Resources & Materials */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>📚 Resources & Materials</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Essential Equipment</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Tournament-size chessboards (20" x 20")</li>
            <li>Staunton chess pieces (3.75" king height)</li>
            <li>Chess clocks for timed games</li>
            <li>Score sheets and pencils</li>
            <li>Demonstration board (magnetic)</li>
            <li>Storage containers and organizers</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📖 Recommended Books</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>"Chess for Children" by Murray Chandler</li>
            <li>"Logical Chess" by Irving Chernev</li>
            <li>"My System" by Aron Nimzowitsch</li>
            <li>"Silman's Complete Endgame Course"</li>
            <li>"The Art of Attack" by Vladimir Vukovic</li>
            <li>"Zurich International Chess Tournament 1953"</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>💻 Digital Resources</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Chess.com for online play and puzzles</li>
            <li>Lichess.org for free analysis tools</li>
            <li>ChessBase for database management</li>
            <li>Stockfish engine for position analysis</li>
            <li>YouTube channels for video lessons</li>
            <li>Mobile apps for practice and study</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📊 Teaching Aids</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>PowerPoint presentations</li>
            <li>Printable worksheets and puzzles</li>
            <li>Video demonstrations</li>
            <li>Interactive whiteboard software</li>
            <li>Assessment templates</li>
            <li>Progress tracking spreadsheets</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Beginner-Focused Content */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>🎯 Essential Beginner Knowledge</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>❌ Common Beginner Mistakes</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Moving pawns randomly:</strong> Every pawn move should have a purpose</li>
            <li><strong>Ignoring center control:</strong> The center is the most important area</li>
            <li><strong>Moving the same piece multiple times:</strong> Develop all pieces before repeating moves</li>
            <li><strong>Not protecting the king:</strong> Castle early and keep your king safe</li>
            <li><strong>Playing too passively:</strong> Chess is a game of active play</li>
            <li><strong>Not calculating ahead:</strong> Always think about your opponent's responses</li>
            <li><strong>Ignoring piece coordination:</strong> Pieces work better together</li>
            <li><strong>Playing too quickly:</strong> Take time to think about each move</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🧠 Mental Preparation</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Stay calm:</strong> Don't panic when you make mistakes</li>
            <li><strong>Focus on the position:</strong> Don't dwell on previous moves</li>
            <li><strong>Think systematically:</strong> Check for checks, captures, and threats</li>
            <li><strong>Trust your instincts:</strong> Your first idea is often correct</li>
            <li><strong>Learn from losses:</strong> Every game is a learning opportunity</li>
            <li><strong>Practice patience:</strong> Improvement takes time and effort</li>
            <li><strong>Stay positive:</strong> Believe in your ability to improve</li>
            <li><strong>Enjoy the process:</strong> Chess should be fun, not stressful</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📅 Study Schedule for Beginners</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Daily (30 minutes):</strong></p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li>Solve 5-10 puzzles</li>
              <li>Play 1-2 games</li>
              <li>Review one of your games</li>
            </ul>
            <p><strong>Weekly (2-3 hours):</strong></p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li>Study one opening in depth</li>
              <li>Practice endgames</li>
              <li>Watch instructional videos</li>
            </ul>
            <p><strong>Monthly:</strong></p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li>Participate in a tournament</li>
              <li>Read a chess book</li>
              <li>Analyze master games</li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 First 100 Games Goals</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Games 1-25:</strong> Learn all piece movements and basic rules</li>
            <li><strong>Games 26-50:</strong> Focus on not hanging pieces and basic tactics</li>
            <li><strong>Games 51-75:</strong> Learn opening principles and king safety</li>
            <li><strong>Games 76-100:</strong> Practice endgames and strategic thinking</li>
            <li><strong>By game 100:</strong> You should understand basic chess concepts</li>
            <li><strong>Target rating:</strong> 800-1000 on online platforms</li>
            <li><strong>Key milestone:</strong> Winning your first game against a stronger player</li>
            <li><strong>Next step:</strong> Join a chess club or online community</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Practical Tips for Beginners */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>💡 Practical Tips for Beginners</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎮 How to Practice Effectively</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Quality over quantity:</strong> Better to play 1 good game than 5 rushed ones</li>
            <li><strong>Use time controls:</strong> Start with 10+0 or 15+10 time controls</li>
            <li><strong>Analyze your games:</strong> Review every game you play</li>
            <li><strong>Focus on one thing:</strong> Work on one weakness at a time</li>
            <li><strong>Play stronger opponents:</strong> You learn more from losses</li>
            <li><strong>Keep a chess journal:</strong> Write down what you learn</li>
            <li><strong>Use online resources:</strong> Take advantage of free training tools</li>
            <li><strong>Join a community:</strong> Learn from other players</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🔍 What to Look For in Positions</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Material count:</strong> Who has more pieces?</li>
            <li><strong>King safety:</strong> Are the kings protected?</li>
            <li><strong>Piece activity:</strong> Are pieces on good squares?</li>
            <li><strong>Pawn structure:</strong> Are pawns connected and protected?</li>
            <li><strong>Control of center:</strong> Who controls the center squares?</li>
            <li><strong>Development:</strong> Are all pieces developed?</li>
            <li><strong>Tactical opportunities:</strong> Are there any combinations?</li>
            <li><strong>Space advantage:</strong> Who controls more space?</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Opening Principles Simplified</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Control the center:</strong> Put pawns and pieces in the center</li>
            <li><strong>Develop pieces:</strong> Get knights and bishops out early</li>
            <li><strong>Protect your king:</strong> Castle within the first 10 moves</li>
            <li><strong>Don't move the same piece twice:</strong> Develop all pieces first</li>
            <li><strong>Connect your rooks:</strong> Move your king to connect rooks</li>
            <li><strong>Don't bring your queen out too early:</strong> She can be attacked</li>
            <li><strong>Control key squares:</strong> e4, e5, d4, d5 are important</li>
            <li><strong>Have a plan:</strong> Know what you're trying to achieve</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>⚡ Quick Improvement Tips</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Solve puzzles daily:</strong> Even 5 minutes helps</li>
            <li><strong>Learn basic endgames:</strong> King and queen vs king, etc.</li>
            <li><strong>Study one opening:</strong> Master one opening for each color</li>
            <li><strong>Play longer games:</strong> Give yourself time to think</li>
            <li><strong>Review master games:</strong> Learn from the best</li>
            <li><strong>Join a chess club:</strong> Play over-the-board chess</li>
            <li><strong>Use a chess coach:</strong> Get personalized instruction</li>
            <li><strong>Stay consistent:</strong> Practice regularly, even if briefly</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Motivation & Mindset */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>🌟 Motivation & Mindset</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>💪 Building Confidence</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Celebrate small wins:</strong> Every good move is progress</li>
            <li><strong>Focus on improvement:</strong> Not just winning</li>
            <li><strong>Learn from losses:</strong> They're opportunities to grow</li>
            <li><strong>Set realistic goals:</strong> Aim for gradual improvement</li>
            <li><strong>Track your progress:</strong> Keep a record of your games</li>
            <li><strong>Practice regularly:</strong> Consistency builds confidence</li>
            <li><strong>Join a community:</strong> Support from other players</li>
            <li><strong>Believe in yourself:</strong> You can improve with effort</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🧠 Growth Mindset</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Embrace challenges:</strong> Difficult positions help you grow</li>
            <li><strong>Learn from mistakes:</strong> Every error is a lesson</li>
            <li><strong>Seek feedback:</strong> Ask stronger players for advice</li>
            <li><strong>Stay curious:</strong> Always ask "why" moves work</li>
            <li><strong>Practice deliberately:</strong> Focus on specific skills</li>
            <li><strong>Be patient:</strong> Improvement takes time</li>
            <li><strong>Stay motivated:</strong> Remember why you started</li>
            <li><strong>Enjoy the journey:</strong> Chess is a lifelong learning process</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Setting Goals</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Short-term goals (1-3 months):</strong></p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li>Learn all piece movements perfectly</li>
              <li>Solve 100 puzzles</li>
              <li>Play 50 games</li>
              <li>Learn one opening for each color</li>
            </ul>
            <p><strong>Medium-term goals (3-6 months):</strong></p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li>Reach 1000 rating</li>
              <li>Master basic endgames</li>
              <li>Join a chess club</li>
              <li>Participate in a tournament</li>
            </ul>
            <p><strong>Long-term goals (6+ months):</strong></p>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li>Reach 1200 rating</li>
              <li>Win a tournament</li>
              <li>Teach others chess</li>
              <li>Become a club officer</li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🏆 Success Stories</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Bobby Fischer:</strong> Started playing at age 6, became World Champion at 29</p>
            <p><strong>Magnus Carlsen:</strong> Learned chess at 5, became Grandmaster at 13</p>
            <p><strong>Judit Polgár:</strong> Started at 5, became the strongest female player ever</p>
            <p><strong>Hikaru Nakamura:</strong> Began at 7, became Grandmaster at 15</p>
            <p><strong>Your story:</strong> Every master was once a beginner</p>
            <p><strong>Key lesson:</strong> Success comes from consistent practice and love for the game</p>
          </div>
        </div>
      </div>
    </section>

    {/* Online Resources for Beginners */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>🌐 Online Resources for Beginners</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎮 Free Online Platforms</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Chess.com:</strong> Largest chess community, free lessons</li>
            <li><strong>Lichess.org:</strong> Completely free, no ads, great analysis</li>
            <li><strong>Chess24.com:</strong> Professional content and live coverage</li>
            <li><strong>ChessTempo.com:</strong> Excellent puzzle training</li>
            <li><strong>ChessKid.com:</strong> Designed specifically for children</li>
            <li><strong>FICS:</strong> Free Internet Chess Server</li>
            <li><strong>ICC:</strong> Internet Chess Club (some free features)</li>
            <li><strong>Playchess:</strong> ChessBase online platform</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📚 Learning Resources</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>YouTube Channels:</strong> GothamChess, Daniel Naroditsky, Levy Rozman</li>
            <li><strong>Podcasts:</strong> Perpetual Chess, The Chess Experience</li>
            <li><strong>Books:</strong> "Logical Chess" by Chernev, "My System" by Nimzowitsch</li>
            <li><strong>Apps:</strong> Chess.com app, Lichess app, ChessTempo</li>
            <li><strong>Courses:</strong> Chess.com courses, Chessable courses</li>
            <li><strong>Databases:</strong> Lichess database, Chess.com games</li>
            <li><strong>Analysis Tools:</strong> Stockfish, Lc0, Komodo</li>
            <li><strong>Forums:</strong> Reddit r/chess, Chess.com forums</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎯 Training Tools</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Puzzle Rush:</strong> Fast-paced tactical training</li>
            <li><strong>Endgame Trainer:</strong> Practice specific endgames</li>
            <li><strong>Opening Trainer:</strong> Learn and practice openings</li>
            <li><strong>Game Analysis:</strong> Review your games with engine help</li>
            <li><strong>Position Trainer:</strong> Practice specific positions</li>
            <li><strong>Blitz Training:</strong> Improve speed and intuition</li>
            <li><strong>Correspondence Chess:</strong> Play with longer time controls</li>
            <li><strong>Simul Games:</strong> Play against multiple opponents</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>👥 Community & Support</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li><strong>Local Chess Clubs:</strong> Find clubs in your area</li>
            <li><strong>Online Communities:</strong> Discord servers, Facebook groups</li>
            <li><strong>Tournaments:</strong> Local, online, and rated events</li>
            <li><strong>Coaching:</strong> Find a chess coach or mentor</li>
            <li><strong>Study Groups:</strong> Form study groups with friends</li>
            <li><strong>Social Media:</strong> Follow chess players and organizations</li>
            <li><strong>Newsletters:</strong> Subscribe to chess news and tips</li>
            <li><strong>Forums:</strong> Ask questions and share experiences</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Advanced Topics */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>🚀 Advanced Topics & Extensions</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🧠 Chess Psychology</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Mental Preparation:</strong> Pre-game routines and focus techniques</p>
            <p><strong>Emotional Control:</strong> Managing wins, losses, and pressure</p>
            <p><strong>Decision Making:</strong> Time management and calculation</p>
            <p><strong>Confidence Building:</strong> Positive self-talk and visualization</p>
            <p><strong>Sportsmanship:</strong> Respect, etiquette, and fair play</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🏆 Tournament Preparation</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Opening Repertoire:</strong> Building a personal opening system</p>
            <p><strong>Time Management:</strong> Clock handling and time pressure</p>
            <p><strong>Physical Preparation:</strong> Nutrition, rest, and fitness</p>
            <p><strong>Mental Toughness:</strong> Handling pressure and setbacks</p>
            <p><strong>Game Analysis:</strong> Post-game review and improvement</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>📚 Chess History</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Famous Players:</strong> Study of great masters and their games</p>
            <p><strong>Historical Games:</strong> Analysis of classic encounters</p>
            <p><strong>Evolution of Theory:</strong> How chess understanding developed</p>
            <p><strong>Cultural Impact:</strong> Chess in literature, art, and society</p>
            <p><strong>Modern Era:</strong> Computer chess and AI impact</p>
          </div>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🔬 Chess Science</h3>
          <div style={{ color: '#b3b8d0', fontSize: '0.95rem' }}>
            <p><strong>Computer Analysis:</strong> Using engines for improvement</p>
            <p><strong>Database Management:</strong> Organizing and studying games</p>
            <p><strong>Statistical Analysis:</strong> Understanding probabilities</p>
            <p><strong>Pattern Recognition:</strong> Neural networks and AI</p>
            <p><strong>Research Methods:</strong> Studying chess literature</p>
          </div>
        </div>
      </div>
    </section>

    {/* Tips for Success */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '2rem' }}>💡 Tips for Successful Teaching</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>👨‍🏫 For Instructors</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Always be prepared with backup activities</li>
            <li>Keep lessons engaging and interactive</li>
            <li>Use positive reinforcement consistently</li>
            <li>Adapt to different learning styles</li>
            <li>Maintain high energy and enthusiasm</li>
            <li>Be patient and encouraging</li>
            <li>Create a safe learning environment</li>
            <li>Continuously improve your own chess skills</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>🎓 For Students</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Practice regularly, even for short periods</li>
            <li>Analyze your games to learn from mistakes</li>
            <li>Study endgames - they're crucial for improvement</li>
            <li>Play against stronger opponents when possible</li>
            <li>Keep a chess journal of your progress</li>
            <li>Don't be afraid to make mistakes</li>
            <li>Focus on understanding, not memorization</li>
            <li>Enjoy the learning process</li>
          </ul>
        </div>

        <div style={{ padding: '2rem', background: '#2d3748', borderRadius: 12, border: '1px solid #4a5568' }}>
          <h3 style={{ color: '#43e97b', fontSize: '1.3rem', marginBottom: '1rem' }}>👨‍👩‍👧‍👦 For Parents</h3>
          <ul style={{ color: '#b3b8d0', fontSize: '0.95rem', paddingLeft: '1.2rem' }}>
            <li>Support your child's interest in chess</li>
            <li>Provide opportunities for practice and play</li>
            <li>Attend tournaments and events together</li>
            <li>Encourage but don't pressure</li>
            <li>Celebrate progress, not just wins</li>
            <li>Help create a study routine</li>
            <li>Connect with other chess families</li>
            <li>Remember that chess is about learning and fun</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="cz-container" style={{ maxWidth: 900, margin: '2rem auto', background: '#23263a', borderRadius: 18, padding: '2.5rem', boxShadow: '0 4px 32px #10121a', textAlign: 'center' }}>
      <h2 style={{ color: '#7fa7ff', fontWeight: 700, fontSize: '1.8rem', marginBottom: '1rem' }}>🚀 Ready to Start Teaching?</h2>
      <p style={{ color: '#b3b8d0', fontSize: '1.1rem', marginBottom: '2rem' }}>
        This comprehensive curriculum provides everything you need to become an effective chess instructor. 
        Remember, the best teachers are those who continue to learn and grow alongside their students.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <a
          href="/assets/pdfs/reference/beginner-curriculum.pdf"
          className="cz-download-btn"
          target="_blank"
          rel="noopener noreferrer"
          download
          style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}
        >
          <span role="img" aria-label="Download">⬇️</span> Download Full PDF
        </a>
        <a
          href="/resources"
          className="cz-download-btn"
          style={{ fontSize: '1.1rem', padding: '1rem 2rem', background: '#43e97b', color: '#1a202c' }}
        >
          <span role="img" aria-label="Resources">📚</span> Explore More Resources
        </a>
      </div>
    </section>
  </div>
);

export default CurriculumKit; 