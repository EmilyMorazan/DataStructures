import React, { useState, useEffect } from 'react';
import './Algorithms.css';

const Algorithms = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('bubble');
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  // Generate random array
  const generateArray = (size = 30) => {
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setSortedIndices([]);
    setHighlightedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  useEffect(() => {
    generateArray();
  }, []);

  // Sleep utility for animations
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, 101 - ms));

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setHighlightedIndices([j, j + 1]);
        compCount++;
        setComparisons(compCount);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
          await sleep(speed);
        }
      }
      setSortedIndices(prev => [...prev, arr.length - i - 1]);
    }
    setSortedIndices(prev => [...prev, 0]);
    setHighlightedIndices([]);
    setSorting(false);
  };

  // Quick Sort Algorithm
  const quickSort = async () => {
    setSorting(true);
    const arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    const partition = async (low, high) => {
      const pivot = arr[high];
      setHighlightedIndices([high]);
      let i = low - 1;

      for (let j = low; j < high; j++) {
        setHighlightedIndices([high, j]);
        compCount++;
        setComparisons(compCount);
        await sleep(speed);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swapCount++;
          setSwaps(swapCount);
          setArray([...arr]);
          await sleep(speed);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swapCount++;
      setSwaps(swapCount);
      setArray([...arr]);
      setSortedIndices(prev => [...prev, i + 1]);
      await sleep(speed);
      return i + 1;
    };

    const quickSortHelper = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await quickSortHelper(low, pi - 1);
        await quickSortHelper(pi + 1, high);
      } else if (low === high) {
        setSortedIndices(prev => [...prev, low]);
      }
    };

    await quickSortHelper(0, arr.length - 1);
    setHighlightedIndices([]);
    setSorting(false);
  };

  // Merge Sort Algorithm
  const mergeSort = async () => {
    setSorting(true);
    const arr = [...array];
    let compCount = 0;
    let swapCount = 0;

    const merge = async (start, mid, end) => {
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;

      while (i < left.length && j < right.length) {
        setHighlightedIndices([start + i, mid + 1 + j]);
        compCount++;
        setComparisons(compCount);
        await sleep(speed);

        if (left[i] <= right[j]) {
          arr[k] = left[i];
          i++;
        } else {
          arr[k] = right[j];
          j++;
        }
        swapCount++;
        setSwaps(swapCount);
        setArray([...arr]);
        k++;
        await sleep(speed);
      }

      while (i < left.length) {
        arr[k] = left[i];
        i++;
        k++;
        setArray([...arr]);
        await sleep(speed);
      }

      while (j < right.length) {
        arr[k] = right[j];
        j++;
        k++;
        setArray([...arr]);
        await sleep(speed);
      }
    };

    const mergeSortHelper = async (start, end) => {
      if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        await merge(start, mid, end);
      }
    };

    await mergeSortHelper(0, arr.length - 1);
    setSortedIndices(arr.map((_, i) => i));
    setHighlightedIndices([]);
    setSorting(false);
  };

  const handleSort = () => {
    switch (activeAlgorithm) {
      case 'bubble':
        bubbleSort();
        break;
      case 'quick':
        quickSort();
        break;
      case 'merge':
        mergeSort();
        break;
      default:
        break;
    }
  };

  const getAlgorithmInfo = () => {
    const info = {
      bubble: {
        name: 'Bubble Sort',
        time: 'O(n²)',
        space: 'O(1)',
        description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.'
      },
      quick: {
        name: 'Quick Sort',
        time: 'O(n log n) average',
        space: 'O(log n)',
        description: 'Picks a pivot element and partitions the array around it, recursively sorting the sub-arrays.'
      },
      merge: {
        name: 'Merge Sort',
        time: 'O(n log n)',
        space: 'O(n)',
        description: 'Divides the array into halves, recursively sorts them, and then merges the sorted halves.'
      }
    };
    return info[activeAlgorithm];
  };

  return (
    <div className="algorithms-container">
      <header className="algorithms-header">
        <h1>🔧 Sorting Algorithms Visualizer</h1>
        <p>✨ Watch sorting algorithms in action with step-by-step animations ✨</p>
      </header>

      <div className="algorithms-content">
        {/* Algorithm Selection */}
        <div className="algorithm-selector">
          <h3>Choose Algorithm</h3>
          <div className="algorithm-buttons">
            <button
              className={activeAlgorithm === 'bubble' ? 'active' : ''}
              onClick={() => setActiveAlgorithm('bubble')}
              disabled={sorting}
            >
              Bubble Sort
            </button>
            <button
              className={activeAlgorithm === 'quick' ? 'active' : ''}
              onClick={() => setActiveAlgorithm('quick')}
              disabled={sorting}
            >
              Quick Sort
            </button>
            <button
              className={activeAlgorithm === 'merge' ? 'active' : ''}
              onClick={() => setActiveAlgorithm('merge')}
              disabled={sorting}
            >
              Merge Sort
            </button>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="algorithm-info">
          <h2>{getAlgorithmInfo().name}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Time Complexity:</span>
              <span className="value">{getAlgorithmInfo().time}</span>
            </div>
            <div className="info-item">
              <span className="label">Space Complexity:</span>
              <span className="value">{getAlgorithmInfo().space}</span>
            </div>
          </div>
          <p className="algorithm-description">{getAlgorithmInfo().description}</p>
        </div>

        {/* Visualization */}
        <div className="visualization-area">
          <div className="bars-container">
            {array.map((value, idx) => (
              <div
                key={idx}
                className={`bar ${highlightedIndices.includes(idx) ? 'comparing' : ''} ${
                  sortedIndices.includes(idx) ? 'sorted' : ''
                }`}
                style={{
                  height: `${value * 3}px`,
                  width: `${Math.max(100 / array.length - 2, 10)}px`
                }}
              >
                <span className="bar-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="statistics">
          <div className="stat-item">
            <span className="stat-label">Comparisons:</span>
            <span className="stat-value">{comparisons}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Swaps:</span>
            <span className="stat-value">{swaps}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Array Size:</span>
            <span className="stat-value">{array.length}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="controls-panel">
          <div className="control-group">
            <label>Speed: {speed}%</label>
            <input
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={sorting}
              className="speed-slider"
            />
          </div>
          <div className="control-group">
            <label>Array Size: {array.length}</label>
            <input
              type="range"
              min="10"
              max="50"
              value={array.length}
              onChange={(e) => generateArray(parseInt(e.target.value))}
              disabled={sorting}
              className="size-slider"
            />
          </div>
          <div className="action-buttons">
            <button 
              onClick={handleSort} 
              disabled={sorting}
              className="sort-btn"
            >
              {sorting ? 'Sorting...' : 'Start Sort'}
            </button>
            <button 
              onClick={() => generateArray(array.length)} 
              disabled={sorting}
              className="generate-btn"
            >
              Generate New Array
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;
