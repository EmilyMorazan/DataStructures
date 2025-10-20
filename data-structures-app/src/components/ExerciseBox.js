import React, { useState } from 'react';
import './ExerciseBox.css';

const ExerciseBox = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('variables');

  // Sample exercises organized by categories
  const exercisesByCategory = {
    variables: [
      {
        id: 1,
        language: 'Java',
        instruction: 'Drag and drop the correct way to declare an integer variable in Java.',
        code: '',
        placeholder: 'declaration',
        correctAnswer: 'int age = 25;',
        options: ['int age = 25;', 'var age = 25;', 'age = 25;', 'integer age = 25;'],
        completeCode: 'int age = 25;'
      },
      {
        id: 2,
        language: 'Python',
        instruction: 'Drag and drop the correct way to declare a variable in Python.',
        code: '',
        placeholder: 'declaration',
        correctAnswer: 'name = "John"',
        options: ['name = "John"', 'var name = "John"', 'string name = "John"', 'name: str = "John"'],
        completeCode: 'name = "John"'
      },
      {
        id: 3,
        language: 'JavaScript',
        instruction: 'Drag and drop the correct way to declare a variable in JavaScript.',
        code: '',
        placeholder: 'declaration',
        correctAnswer: 'let count = 10;',
        options: ['let count = 10;', 'var count = 10;', 'int count = 10;', 'count = 10;'],
        completeCode: 'let count = 10;'
      }
    ],
    arrays: [
      {
        id: 4,
        language: 'Java',
        instruction: 'Drag and drop the correct way to create an array in Java.',
        code: '',
        placeholder: 'array',
        correctAnswer: 'int[] numbers = {1, 2, 3};',
        options: ['int[] numbers = {1, 2, 3};', 'int numbers = [1, 2, 3];', 'array numbers = {1, 2, 3};', 'numbers = [1, 2, 3];'],
        completeCode: 'int[] numbers = {1, 2, 3};'
      },
      {
        id: 5,
        language: 'Python',
        instruction: 'Drag and drop the correct way to create a list in Python.',
        code: '',
        placeholder: 'list',
        correctAnswer: 'fruits = ["apple", "banana"]',
        options: ['fruits = ["apple", "banana"]', 'fruits = {"apple", "banana"}', 'fruits = ("apple", "banana")', 'fruits = array("apple", "banana")'],
        completeCode: 'fruits = ["apple", "banana"]'
      },
      {
        id: 6,
        language: 'JavaScript',
        instruction: 'Drag and drop the correct way to create an array in JavaScript.',
        code: '',
        placeholder: 'array',
        correctAnswer: 'let colors = ["red", "blue"];',
        options: ['let colors = ["red", "blue"];', 'let colors = {"red", "blue"};', 'let colors = ("red", "blue");', 'colors = ["red", "blue"];'],
        completeCode: 'let colors = ["red", "blue"];'
      }
    ],
    functions: [
      {
        id: 7,
        language: 'Java',
        instruction: 'Drag and drop the correct way to define a function in Java.',
        code: 'public static void',
        placeholder: 'function',
        correctAnswer: 'sayHello()',
        options: ['sayHello()', 'function sayHello()', 'def sayHello()', 'sayHello: void'],
        completeCode: 'public static void sayHello() { }'
      },
      {
        id: 8,
        language: 'Python',
        instruction: 'Drag and drop the correct way to define a function in Python.',
        code: 'def',
        placeholder: 'function',
        correctAnswer: 'greet(name):',
        options: ['greet(name):', 'function greet(name)', 'greet(name)', 'greet(name) {'],
        completeCode: 'def greet(name):'
      },
      {
        id: 9,
        language: 'JavaScript',
        instruction: 'Drag and drop the correct way to define a function in JavaScript.',
        code: 'function',
        placeholder: 'function',
        correctAnswer: 'calculate(x, y)',
        options: ['calculate(x, y)', 'calculate(x, y):', 'def calculate(x, y)', 'calculate(x, y) {'],
        completeCode: 'function calculate(x, y) { }'
      }
    ]
  };

  const [currentExercise, setCurrentExercise] = useState(exercisesByCategory[selectedCategory][0]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentExercise(exercisesByCategory[category][0]);
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(null);
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
    setShowResult(false);
    setIsCorrect(null);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleNextExercise = () => {
    const currentExercises = exercisesByCategory[selectedCategory];
    const currentIndex = currentExercises.findIndex(ex => ex.id === currentExercise.id);
    const nextIndex = (currentIndex + 1) % currentExercises.length;
    setCurrentExercise(currentExercises[nextIndex]);
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(null);
  };

  const handleReset = () => {
    setSelectedAnswer('');
    setShowResult(false);
    setIsCorrect(null);
  };

  return (
    <div className="exercise-box">
      <div className="exercise-header">
        <h3>Exercise</h3>
        <div className="help-icon">?</div>
      </div>
      
      <div className="exercise-content">
        <div className="category-buttons">
          <button 
            className={`category-btn ${selectedCategory === 'variables' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('variables')}
          >
            Variables
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'arrays' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('arrays')}
          >
            Arrays
          </button>
          <button 
            className={`category-btn ${selectedCategory === 'functions' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('functions')}
          >
            Functions
          </button>
        </div>
        
        <p className="exercise-instruction">
          {currentExercise.instruction}
        </p>
        
        <div className="code-area">
          <div className="code-line">
            <span className="code-text">{currentExercise.code}</span>
            <div className={`code-placeholder ${selectedAnswer ? 'filled' : ''}`}>
              {selectedAnswer || currentExercise.placeholder}
            </div>
            {currentExercise.code && <span className="code-text">{currentExercise.code.includes('(') ? ')' : ';'}</span>}
          </div>
        </div>
        
        <div className="options-container">
          {currentExercise.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
              disabled={showResult}
            >
              {option}
            </button>
          ))}
        </div>
        
        <div className="exercise-actions">
          <button 
            className="submit-button"
            onClick={handleSubmit}
            disabled={!selectedAnswer || showResult}
          >
            Submit Answer »
          </button>
        </div>
        
        {showResult && (
          <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div>
                <p>✅ Correct! Well done!</p>
                <p className="complete-code">{currentExercise.completeCode}</p>
              </div>
            ) : (
              <div>
                <p>❌ Incorrect. Try again!</p>
                <p className="hint">Hint: The correct answer is "{currentExercise.correctAnswer}"</p>
              </div>
            )}
            <div className="result-actions">
              <button className="next-button" onClick={handleNextExercise}>
                Next Exercise
              </button>
              <button className="reset-button" onClick={handleReset}>
                Try Again
              </button>
            </div>
          </div>
        )}
        
        <div className="exercise-info">
          <span className="language-badge">{currentExercise.language}</span>
          <span className="exercise-counter">
            {exercisesByCategory[selectedCategory].findIndex(ex => ex.id === currentExercise.id) + 1} / {exercisesByCategory[selectedCategory].length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseBox;
