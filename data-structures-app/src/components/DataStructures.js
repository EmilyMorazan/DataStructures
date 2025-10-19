import React, { useState, useEffect } from 'react';
import './DataStructures.css';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  serializeDataStructures,
  deserializeDataStructures,
  saveSession,
  getSessionNames,
  deleteSession,
  loadSessions
} from '../utils/localStorage';
import { getComplexity } from '../utils/complexity';

// Data Structure Classes
class ArrayDS {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  insertAt(index, item) {
    this.items.splice(index, 0, item);
  }

  deleteAt(index) {
    return this.items.splice(index, 1)[0];
  }

  search(item) {
    return this.items.indexOf(item);
  }
}

class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
    const node = { value, next: null };
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  remove(value) {
    if (!this.head) return false;
    
    if (this.head.value === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }
    return false;
  }

  search(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const node = { value, left: null, right: null };
    
    if (!this.root) {
      this.root = node;
      return;
    }

    this._insertNode(this.root, node);
  }

  _insertNode(parent, node) {
    if (node.value < parent.value) {
      if (!parent.left) {
        parent.left = node;
      } else {
        this._insertNode(parent.left, node);
      }
    } else {
      if (!parent.right) {
        parent.right = node;
      } else {
        this._insertNode(parent.right, node);
      }
    }
  }

  search(value) {
    return this._searchNode(this.root, value);
  }

  _searchNode(node, value) {
    if (!node) return false;
    if (node.value === value) return true;
    if (value < node.value) return this._searchNode(node.left, value);
    return this._searchNode(node.right, value);
  }

  toArray() {
    const result = [];
    this._inOrderTraversal(this.root, result);
    return result;
  }

  _inOrderTraversal(node, result) {
    if (node) {
      this._inOrderTraversal(node.left, result);
      result.push(node.value);
      this._inOrderTraversal(node.right, result);
    }
  }
}

const DataStructures = () => {
  const [activeTab, setActiveTab] = useState('array');
  const [inputValue, setInputValue] = useState('');
  const [dataStructures, setDataStructures] = useState({
    array: new ArrayDS(),
    stack: new Stack(),
    queue: new Queue(),
    linkedList: new LinkedList(),
    binaryTree: new BinaryTree()
  });

  const [operationHistory, setOperationHistory] = useState([]);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState([]);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionName, setSessionName] = useState('');

  // Load data on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage('ds_current_state');
    if (savedData) {
      const classes = { ArrayDS, Stack, Queue, LinkedList, BinaryTree };
      const loadedStructures = deserializeDataStructures(savedData, classes);
      setDataStructures(loadedStructures);
    }
    
    // Load saved sessions
    const savedSessions = getSessionNames();
    setSessions(savedSessions);
  }, []);

  // Auto-save on data structure changes
  useEffect(() => {
    const serialized = serializeDataStructures(dataStructures);
    saveToLocalStorage('ds_current_state', serialized);
  }, [dataStructures]);

  const addOperation = (operation) => {
    setOperationHistory(prev => [...prev.slice(-4), operation]);
  };

  const validateInput = (operation) => {
    if (!inputValue.trim()) {
      setError('Please enter a value');
      return false;
    }

    // Binary tree requires numeric values
    if (activeTab === 'binaryTree') {
      if (isNaN(inputValue)) {
        setError('Binary tree requires numeric values');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleOperation = (operation) => {
    const ds = dataStructures[activeTab];
    let result = '';

    // Operations that require input
    const requiresInput = ['push', 'enqueue', 'add', 'insert', 'search', 'remove'];
    if (requiresInput.includes(operation) && !validateInput(operation)) {
      return;
    }

    switch (operation) {
      case 'push':
        if (inputValue) {
          ds.push(inputValue);
          addOperation(`Pushed: ${inputValue}`);
          setInputValue('');
          setError('');
        }
        break;
      case 'pop':
        result = ds.pop();
        if (result !== undefined) {
          addOperation(`Popped: ${result}`);
        } else {
          addOperation('Pop failed: structure empty');
        }
        break;
      case 'enqueue':
        if (inputValue) {
          ds.enqueue(inputValue);
          addOperation(`Enqueued: ${inputValue}`);
          setInputValue('');
          setError('');
        }
        break;
      case 'dequeue':
        result = ds.dequeue();
        if (result !== undefined) {
          addOperation(`Dequeued: ${result}`);
        } else {
          addOperation('Dequeue failed: queue empty');
        }
        setError('');
        break;
      case 'add':
        if (inputValue) {
          ds.add(inputValue);
          addOperation(`Added: ${inputValue}`);
          setInputValue('');
          setError('');
        }
        break;
      case 'remove':
        if (inputValue) {
          const success = ds.remove(inputValue);
          addOperation(success ? `Removed: ${inputValue}` : `Remove failed: ${inputValue} not found`);
          setInputValue('');
          setError('');
        }
        break;
      case 'insert':
        if (inputValue) {
          const value = activeTab === 'binaryTree' ? parseFloat(inputValue) : inputValue;
          ds.insert(value);
          addOperation(`Inserted: ${inputValue}`);
          setInputValue('');
          setError('');
        }
        break;
      case 'search':
        if (inputValue) {
          let index = -1;
          const searchValue = activeTab === 'binaryTree' ? parseFloat(inputValue) : inputValue;
          
          if (activeTab === 'array') {
            index = ds.search(searchValue);
          } else if (activeTab === 'linkedList') {
            index = ds.search(searchValue);
          } else if (activeTab === 'binaryTree') {
            const found = ds.search(searchValue);
            addOperation(found ? `Found: ${inputValue}` : `Not found: ${inputValue}`);
            setInputValue('');
            setError('');
            return;
          }
          
          if (index !== -1) {
            addOperation(`Found: ${inputValue} at index ${index}`);
          } else {
            addOperation(`Not found: ${inputValue}`);
          }
          setInputValue('');
          setError('');
        }
        break;
      default:
        break;
    }

    setDataStructures({...dataStructures});
  };

  const handleSaveSession = () => {
    if (!sessionName.trim()) {
      setError('Please enter a session name');
      return;
    }
    
    const serialized = serializeDataStructures(dataStructures);
    saveSession(sessionName, serialized);
    
    const savedSessions = getSessionNames();
    setSessions(savedSessions);
    setSessionName('');
    setShowSessionModal(false);
    addOperation(`Session saved: ${sessionName}`);
  };

  const handleLoadSession = (name) => {
    const allSessions = loadSessions();
    const session = allSessions[name];
    
    if (session) {
      const classes = { ArrayDS, Stack, Queue, LinkedList, BinaryTree };
      const loadedStructures = deserializeDataStructures(session.data, classes);
      setDataStructures(loadedStructures);
      addOperation(`Session loaded: ${name}`);
      setShowSessionModal(false);
    }
  };

  const handleDeleteSession = (name) => {
    deleteSession(name);
    const savedSessions = getSessionNames();
    setSessions(savedSessions);
    addOperation(`Session deleted: ${name}`);
  };

  const clearStructure = () => {
    setError('');
    setInputValue('');
    switch (activeTab) {
      case 'array':
        setDataStructures({...dataStructures, array: new ArrayDS()});
        break;
      case 'stack':
        setDataStructures({...dataStructures, stack: new Stack()});
        break;
      case 'queue':
        setDataStructures({...dataStructures, queue: new Queue()});
        break;
      case 'linkedList':
        setDataStructures({...dataStructures, linkedList: new LinkedList()});
        break;
      case 'binaryTree':
        setDataStructures({...dataStructures, binaryTree: new BinaryTree()});
        break;
      default:
        break;
    }
    addOperation('Structure cleared');
  };

  const getCurrentData = () => {
    const ds = dataStructures[activeTab];
    switch (activeTab) {
      case 'array':
        return ds.items;
      case 'stack':
        return ds.items;
      case 'queue':
        return ds.items;
      case 'linkedList':
        return ds.toArray();
      case 'binaryTree':
        return ds.toArray();
      default:
        return [];
    }
  };

  const getOperations = () => {
    switch (activeTab) {
      case 'array':
        return ['push', 'pop', 'insert', 'search'];
      case 'stack':
        return ['push', 'pop'];
      case 'queue':
        return ['enqueue', 'dequeue'];
      case 'linkedList':
        return ['add', 'remove', 'search'];
      case 'binaryTree':
        return ['insert', 'search'];
      default:
        return [];
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'array': return 'Dynamic Array';
      case 'stack': return 'Stack (LIFO)';
      case 'queue': return 'Queue (FIFO)';
      case 'linkedList': return 'Linked List';
      case 'binaryTree': return 'Binary Search Tree';
      default: return 'Data Structure';
    }
  };

  const calculateTreeLayout = (node, x = 300, y = 40, level = 0, offset = 150) => {
    if (!node) return [];
    
    const positions = [{ value: node.value, x, y, level }];
    const newOffset = offset / 2;
    
    if (node.left) {
      positions.push({ type: 'line', x1: x, y1: y, x2: x - offset, y2: y + 80 });
      positions.push(...calculateTreeLayout(node.left, x - offset, y + 80, level + 1, newOffset));
    }
    
    if (node.right) {
      positions.push({ type: 'line', x1: x, y1: y, x2: x + offset, y2: y + 80 });
      positions.push(...calculateTreeLayout(node.right, x + offset, y + 80, level + 1, newOffset));
    }
    
    return positions;
  };

  const renderBinaryTree = () => {
    const ds = dataStructures.binaryTree;
    if (!ds.root) {
      return <div className="empty-tree">Tree is empty</div>;
    }

    const positions = calculateTreeLayout(ds.root);
    const lines = positions.filter(p => p.type === 'line');
    const nodes = positions.filter(p => !p.type);

    return (
      <svg className="tree-svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
        {lines.map((line, index) => (
          <line
            key={`line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#667eea"
            strokeWidth="2"
          />
        ))}
        {nodes.map((node, index) => (
          <g key={`node-${index}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill="url(#treeGradient)"
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="16"
              fontWeight="600"
            >
              {node.value}
            </text>
          </g>
        ))}
        <defs>
          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fd7e14" />
            <stop offset="100%" stopColor="#e83e8c" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  const renderVisualization = () => {
    const data = getCurrentData();
    
    if (activeTab === 'linkedList') {
      return (
        <div className="linked-list-visualization">
          {data.map((value, index) => (
            <div key={index} className="linked-list-node">
              <div className="node-value">{value}</div>
              {index < data.length - 1 && <div className="arrow">→</div>}
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === 'binaryTree') {
      return renderBinaryTree();
    }

    return (
      <div className="array-visualization">
        {data.map((value, index) => (
          <div key={index} className="array-item">
            <div className="item-index">{index}</div>
            <div className="item-value">{value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="data-structures-app">
      <header className="app-header">
        <h1>🌸 Data Structures Visualizer 🌸</h1>
        <p>✨ Learn and explore fundamental data structures with our friendly interface! ✨</p>
      </header>

      <div className="main-content">
        <div className="sidebar">
          <h3>🌟 Choose a Data Structure 🌟</h3>
          <div className="tab-buttons" role="tablist" aria-label="Data structure selection">
            <button 
              className={activeTab === 'array' ? 'active' : ''}
              onClick={() => {
                setActiveTab('array');
                setError('');
                setInputValue('');
              }}
              role="tab"
              aria-selected={activeTab === 'array'}
              aria-label="Select Array data structure"
            >
              📊 Array
            </button>
            <button 
              className={activeTab === 'stack' ? 'active' : ''}
              onClick={() => {
                setActiveTab('stack');
                setError('');
                setInputValue('');
              }}
              role="tab"
              aria-selected={activeTab === 'stack'}
              aria-label="Select Stack data structure"
            >
              📚 Stack
            </button>
            <button 
              className={activeTab === 'queue' ? 'active' : ''}
              onClick={() => {
                setActiveTab('queue');
                setError('');
                setInputValue('');
              }}
              role="tab"
              aria-selected={activeTab === 'queue'}
              aria-label="Select Queue data structure"
            >
              🎯 Queue
            </button>
            <button 
              className={activeTab === 'linkedList' ? 'active' : ''}
              onClick={() => {
                setActiveTab('linkedList');
                setError('');
                setInputValue('');
              }}
              role="tab"
              aria-selected={activeTab === 'linkedList'}
              aria-label="Select Linked List data structure"
            >
              🔗 Linked List
            </button>
            <button 
              className={activeTab === 'binaryTree' ? 'active' : ''}
              onClick={() => {
                setActiveTab('binaryTree');
                setError('');
                setInputValue('');
              }}
              role="tab"
              aria-selected={activeTab === 'binaryTree'}
              aria-label="Select Binary Tree data structure"
            >
              🌳 Binary Tree
            </button>
          </div>
        </div>

        <div className="content-area">
          <div className="structure-header">
            <h2>{getTitle()}</h2>
            <div className="header-buttons">
              <button 
                className="save-btn" 
                onClick={() => setShowSessionModal(true)}
                aria-label="Save or load sessions"
              >
                💾 Sessions
              </button>
              <button 
                className="clear-btn" 
                onClick={clearStructure}
                aria-label="Clear all elements from current data structure"
              >
                🗑️ Clear All
              </button>
            </div>
          </div>

          <div className="visualization-container">
            {renderVisualization()}
          </div>

          <div className="controls">
            <div className="input-group">
              <input
                type={activeTab === 'binaryTree' ? 'number' : 'text'}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const operations = getOperations();
                    const defaultOp = operations[0]; // First operation as default
                    handleOperation(defaultOp);
                  } else if (e.key === 'Escape') {
                    setInputValue('');
                    setError('');
                  }
                }}
                placeholder={activeTab === 'binaryTree' ? '💫 Enter a number...' : '💫 Enter a value to add...'}
                className={error ? 'value-input error' : 'value-input'}
                aria-label="Input value for data structure operation"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'input-error' : undefined}
              />
              {error && <div className="error-message" id="input-error" role="alert">{error}</div>}
            </div>
            
            <div className="operation-buttons" role="group" aria-label="Data structure operations">
              {getOperations().map(op => {
                const complexity = getComplexity(activeTab, op);
                return (
                  <button
                    key={op}
                    onClick={() => handleOperation(op)}
                    className="operation-btn"
                    aria-label={`${op.charAt(0).toUpperCase() + op.slice(1)} operation`}
                    title={complexity ? `Time: ${complexity.time}, Space: ${complexity.space}` : ''}
                  >
                    <span>{op.charAt(0).toUpperCase() + op.slice(1)}</span>
                    {complexity && (
                      <span className="complexity-badge">{complexity.time}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complexity Information Section */}
          <div className="complexity-info">
            <h3>⏱️ Complexity Analysis</h3>
            <div className="complexity-grid">
              {getOperations().map(op => {
                const complexity = getComplexity(activeTab, op);
                if (!complexity) return null;
                return (
                  <div key={op} className="complexity-card">
                    <h4>{op.charAt(0).toUpperCase() + op.slice(1)}</h4>
                    <div className="complexity-details">
                      <div className="complexity-item">
                        <span className="label">Time:</span>
                        <span className="value time">{complexity.time}</span>
                      </div>
                      <div className="complexity-item">
                        <span className="label">Space:</span>
                        <span className="value space">{complexity.space}</span>
                      </div>
                    </div>
                    <p className="complexity-description">{complexity.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="operation-history">
            <h3>📝 Recent Operations</h3>
            <div className="history-list">
              {operationHistory.map((op, index) => (
                <div key={index} className="history-item">
                  {op}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Session Modal */}
      {showSessionModal && (
        <div className="modal-overlay" onClick={() => setShowSessionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>💾 Save & Load Sessions</h3>
            
            <div className="save-session-section">
              <h4>Save Current State</h4>
              <div className="session-input-group">
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  placeholder="Enter session name..."
                  className="session-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveSession();
                  }}
                />
                <button onClick={handleSaveSession} className="modal-btn save">
                  Save
                </button>
              </div>
            </div>

            <div className="load-session-section">
              <h4>Saved Sessions</h4>
              {sessions.length === 0 ? (
                <p className="no-sessions">No saved sessions yet</p>
              ) : (
                <div className="sessions-list">
                  {sessions.map((session) => (
                    <div key={session.name} className="session-item">
                      <div className="session-info">
                        <span className="session-name">{session.name}</span>
                        <span className="session-date">
                          {new Date(session.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="session-actions">
                        <button 
                          onClick={() => handleLoadSession(session.name)}
                          className="modal-btn load"
                        >
                          Load
                        </button>
                        <button 
                          onClick={() => handleDeleteSession(session.name)}
                          className="modal-btn delete"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setShowSessionModal(false)}
              className="modal-btn close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataStructures;
