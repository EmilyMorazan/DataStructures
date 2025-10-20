// Local Storage utility for persisting data structures

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

// Serialize data structure instances for storage
export const serializeDataStructures = (dataStructures) => {
  return {
    array: dataStructures.array.items,
    stack: dataStructures.stack.items,
    queue: dataStructures.queue.items,
    linkedList: dataStructures.linkedList.toArray(),
    binaryTree: serializeBinaryTree(dataStructures.binaryTree.root)
  };
};

// Deserialize data from localStorage back into data structure instances
export const deserializeDataStructures = (data, classes) => {
  const { ArrayDS, Stack, Queue, LinkedList, BinaryTree } = classes;
  
  const array = new ArrayDS();
  array.items = data.array || [];
  
  const stack = new Stack();
  stack.items = data.stack || [];
  
  const queue = new Queue();
  queue.items = data.queue || [];
  
  const linkedList = new LinkedList();
  (data.linkedList || []).forEach(value => linkedList.add(value));
  
  const binaryTree = new BinaryTree();
  if (data.binaryTree) {
    binaryTree.root = deserializeBinaryTree(data.binaryTree);
  }
  
  return { array, stack, queue, linkedList, binaryTree };
};

// Helper to serialize binary tree
const serializeBinaryTree = (node) => {
  if (!node) return null;
  return {
    value: node.value,
    left: serializeBinaryTree(node.left),
    right: serializeBinaryTree(node.right)
  };
};

// Helper to deserialize binary tree
const deserializeBinaryTree = (data) => {
  if (!data) return null;
  return {
    value: data.value,
    left: deserializeBinaryTree(data.left),
    right: deserializeBinaryTree(data.right)
  };
};

// Save/load named sessions
export const saveSession = (sessionName, data) => {
  const sessions = loadSessions();
  sessions[sessionName] = {
    data,
    timestamp: new Date().toISOString()
  };
  saveToLocalStorage('ds_sessions', sessions);
};

export const loadSessions = () => {
  return loadFromLocalStorage('ds_sessions') || {};
};

export const deleteSession = (sessionName) => {
  const sessions = loadSessions();
  delete sessions[sessionName];
  saveToLocalStorage('ds_sessions', sessions);
};

export const getSessionNames = () => {
  const sessions = loadSessions();
  return Object.keys(sessions).map(name => ({
    name,
    timestamp: sessions[name].timestamp
  }));
};
