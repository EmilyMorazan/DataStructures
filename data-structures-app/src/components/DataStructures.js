import React, { useState } from 'react';
import './DataStructures.css';

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

  const addOperation = (operation) => {
    setOperationHistory(prev => [...prev.slice(-4), operation]);
  };

  const handleOperation = (operation) => {
    const ds = dataStructures[activeTab];
    let result = '';

    switch (operation) {
      case 'push':
        if (inputValue) {
          ds.push(inputValue);
          addOperation(`Pushed: ${inputValue}`);
          setInputValue('');
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
        }
        break;
      case 'dequeue':
        result = ds.dequeue();
        if (result !== undefined) {
          addOperation(`Dequeued: ${result}`);
        } else {
          addOperation('Dequeue failed: queue empty');
        }
        break;
      case 'add':
        if (inputValue) {
          ds.add(inputValue);
          addOperation(`Added: ${inputValue}`);
          setInputValue('');
        }
        break;
      case 'remove':
        if (inputValue) {
          const success = ds.remove(inputValue);
          addOperation(success ? `Removed: ${inputValue}` : `Remove failed: ${inputValue} not found`);
          setInputValue('');
        }
        break;
      case 'insert':
        if (inputValue) {
          ds.insert(inputValue);
          addOperation(`Inserted: ${inputValue}`);
          setInputValue('');
        }
        break;
      case 'search':
        if (inputValue) {
          let index = -1;
          if (activeTab === 'array') {
            index = ds.search(inputValue);
          } else if (activeTab === 'linkedList') {
            index = ds.search(inputValue);
          } else if (activeTab === 'binaryTree') {
            const found = ds.search(inputValue);
            addOperation(found ? `Found: ${inputValue}` : `Not found: ${inputValue}`);
            setInputValue('');
            return;
          }
          
          if (index !== -1) {
            addOperation(`Found: ${inputValue} at index ${index}`);
          } else {
            addOperation(`Not found: ${inputValue}`);
          }
          setInputValue('');
        }
        break;
      default:
        break;
    }

    setDataStructures({...dataStructures});
  };

  const clearStructure = () => {
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
      return (
        <div className="tree-visualization">
          {data.map((value, index) => (
            <div key={index} className="tree-node">
              {value}
            </div>
          ))}
        </div>
      );
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
          <div className="tab-buttons">
            <button 
              className={activeTab === 'array' ? 'active' : ''}
              onClick={() => setActiveTab('array')}
            >
              📊 Array
            </button>
            <button 
              className={activeTab === 'stack' ? 'active' : ''}
              onClick={() => setActiveTab('stack')}
            >
              📚 Stack
            </button>
            <button 
              className={activeTab === 'queue' ? 'active' : ''}
              onClick={() => setActiveTab('queue')}
            >
              🎯 Queue
            </button>
            <button 
              className={activeTab === 'linkedList' ? 'active' : ''}
              onClick={() => setActiveTab('linkedList')}
            >
              🔗 Linked List
            </button>
            <button 
              className={activeTab === 'binaryTree' ? 'active' : ''}
              onClick={() => setActiveTab('binaryTree')}
            >
              🌳 Binary Tree
            </button>
          </div>
        </div>

        <div className="content-area">
          <div className="structure-header">
            <h2>{getTitle()}</h2>
            <button className="clear-btn" onClick={clearStructure}>
              🗑️ Clear All
            </button>
          </div>

          <div className="visualization-container">
            {renderVisualization()}
          </div>

          <div className="controls">
            <div className="input-group">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="💫 Enter a value to add..."
                className="value-input"
              />
            </div>
            
            <div className="operation-buttons">
              {getOperations().map(op => (
                <button
                  key={op}
                  onClick={() => handleOperation(op)}
                  className="operation-btn"
                >
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </button>
              ))}
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
    </div>
  );
};

export default DataStructures;
