// Big O Complexity data for data structure operations

export const complexityData = {
  array: {
    push: {
      time: 'O(1)',
      space: 'O(1)',
      description: 'Adding an element to the end of an array is constant time as it just appends to the existing structure.'
    },
    pop: {
      time: 'O(1)',
      space: 'O(1)',
      description: 'Removing the last element is constant time since no shifting of elements is required.'
    },
    insert: {
      time: 'O(n)',
      space: 'O(1)',
      description: 'Inserting at a specific position requires shifting all subsequent elements, making it linear time.'
    },
    search: {
      time: 'O(n)',
      space: 'O(1)',
      description: 'Linear search requires checking each element until the target is found or all elements are checked.'
    }
  },
  stack: {
    push: {
      time: 'O(1)',
      space: 'O(1)',
      description: 'Push operation adds element to the top of the stack in constant time.'
    },
    pop: {
      time: 'O(1)',
      space: 'O(1)',
      description: 'Pop operation removes the top element in constant time (LIFO principle).'
    }
  },
  queue: {
    enqueue: {
      time: 'O(1)',
      space: 'O(1)',
      description: 'Enqueue adds an element to the rear of the queue in constant time.'
    },
    dequeue: {
      time: 'O(n)',
      space: 'O(1)',
      description: 'Dequeue removes from front but shift() requires moving all elements, hence O(n). Using a proper queue with pointers would be O(1).'
    }
  },
  linkedList: {
    add: {
      time: 'O(n)',
      space: 'O(1)',
      description: 'Adding to the end requires traversing the entire list to find the last node, making it O(n). With a tail pointer, this would be O(1).'
    },
    remove: {
      time: 'O(n)',
      space: 'O(1)',
      description: 'Removing a specific value requires traversing the list to find it, which takes linear time.'
    },
    search: {
      time: 'O(n)',
      space: 'O(1)',
      description: 'Searching requires traversing from head to tail in the worst case, checking each node.'
    }
  },
  binaryTree: {
    insert: {
      time: 'O(log n) average, O(n) worst',
      space: 'O(log n)',
      description: 'In a balanced BST, insertion is O(log n). In worst case (skewed tree), it degrades to O(n). Space complexity accounts for recursion stack.'
    },
    search: {
      time: 'O(log n) average, O(n) worst',
      space: 'O(log n)',
      description: 'Balanced BST allows binary search with O(log n). Worst case (skewed tree) requires checking all nodes O(n).'
    }
  }
};

export const getComplexity = (dataStructure, operation) => {
  return complexityData[dataStructure]?.[operation] || null;
};
