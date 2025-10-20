import React, { useState } from 'react';
import './SyntaxBox.css';

const SyntaxBox = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  const syntaxExamples = {
    java: {
      name: 'Java',
      icon: '☕',
      examples: {
        variables: 'int age = 25;\nString name = "John";\nboolean isActive = true;',
        arrays: 'int[] numbers = {1, 2, 3};\nString[] fruits = {"apple", "banana"};\nint[][] matrix = new int[3][3];',
        functions: 'public static void main(String[] args) {\n    System.out.println("Hello World");\n}\n\npublic int add(int a, int b) {\n    return a + b;\n}',
        loops: 'for (int i = 0; i < 10; i++) {\n    System.out.println(i);\n}\n\nwhile (condition) {\n    // code\n}\n\nfor (String item : array) {\n    System.out.println(item);\n}'
      }
    },
    python: {
      name: 'Python',
      icon: '🐍',
      examples: {
        variables: 'age = 25\nname = "John"\nis_active = True',
        arrays: 'numbers = [1, 2, 3]\nfruits = ["apple", "banana"]\nmatrix = [[1, 2], [3, 4]]',
        functions: 'def main():\n    print("Hello World")\n\nif __name__ == "__main__":\n    main()\n\ndef add(a, b):\n    return a + b',
        loops: 'for i in range(10):\n    print(i)\n\nwhile condition:\n    # code\n    pass\n\nfor item in array:\n    print(item)'
      }
    },
    javascript: {
      name: 'JavaScript',
      icon: '🟨',
      examples: {
        variables: 'let age = 25;\nconst name = "John";\nvar isActive = true;',
        arrays: 'let numbers = [1, 2, 3];\nconst fruits = ["apple", "banana"];\nlet matrix = [[1, 2], [3, 4]];',
        functions: 'function main() {\n    console.log("Hello World");\n}\n\nconst add = (a, b) => {\n    return a + b;\n}',
        loops: 'for (let i = 0; i < 10; i++) {\n    console.log(i);\n}\n\nwhile (condition) {\n    // code\n}\n\nfor (let item of array) {\n    console.log(item);\n}'
      }
    },
    cpp: {
      name: 'C++',
      icon: '⚡',
      examples: {
        variables: 'int age = 25;\nstring name = "John";\nbool isActive = true;',
        arrays: 'int numbers[] = {1, 2, 3};\nvector<string> fruits = {"apple", "banana"};\nint matrix[3][3];',
        functions: 'int main() {\n    cout << "Hello World" << endl;\n    return 0;\n}\n\nint add(int a, int b) {\n    return a + b;\n}',
        loops: 'for (int i = 0; i < 10; i++) {\n    cout << i << endl;\n}\n\nwhile (condition) {\n    // code\n}\n\nfor (auto item : vector) {\n    cout << item << endl;\n}'
      }
    }
  };

  const syntaxCategories = [
    { key: 'variables', label: 'Variables' },
    { key: 'arrays', label: 'Arrays' },
    { key: 'functions', label: 'Functions' },
    { key: 'loops', label: 'Loops' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('variables');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="syntax-box">
      <div className="syntax-header">
        <h3>📝 Syntax Reference</h3>
        <p>Choose a programming language to view its syntax</p>
      </div>
      
      <div className="syntax-content">
        <div className="language-selector">
          <h4>Choose Language:</h4>
          <div className="language-buttons">
            {Object.entries(syntaxExamples).map(([key, lang]) => (
              <button
                key={key}
                className={`lang-btn ${selectedLanguage === key ? 'active' : ''}`}
                onClick={() => handleLanguageChange(key)}
              >
                {lang.icon} {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="syntax-categories">
          <h4>Syntax Categories:</h4>
          <div className="category-buttons">
            {syntaxCategories.map(category => (
              <button
                key={category.key}
                className={`category-btn ${selectedCategory === category.key ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="syntax-display">
          <div className="syntax-header-info">
            <h4>{syntaxExamples[selectedLanguage].icon} {syntaxExamples[selectedLanguage].name} - {syntaxCategories.find(cat => cat.key === selectedCategory)?.label}</h4>
          </div>
          <div className="code-display">
            <pre className="syntax-code">
              <code>{syntaxExamples[selectedLanguage].examples[selectedCategory]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyntaxBox;
