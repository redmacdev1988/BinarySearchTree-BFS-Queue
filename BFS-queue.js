
function QueueNode(newData, newNext) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new Node Object');
         return new Node();
    }
    // assign properties to self
    this.data = newData;
    this.next = newNext;

    this.clean = function() {
      this.data = null;
      this.next = null;
    }

    this.display = function() {
        console.log(this.data);
    };
    // return this
}

function Queue() {

  if (new.target === undefined) {
       console.log('You didnt use new. Giving you a new Queue Object');
       return new Queue();
  }

  this.head = null;
  this.tail = null;

  this.isEmpty = function() {
      return (this.head == null && this.tail == null);
  }

  this.insert = function(newData) {
    if (this.head === null && this.tail === null) {
        this.head = this.tail = new QueueNode(newData, null);
    }  else {
      this.tail.next = new QueueNode(newData, null);
      this.tail = this.tail.next;
    }
  };

  this.array = function() {
      var flatArray = [];
      var iterator = this.head;
      while (iterator != null) {
          flatArray.push(iterator.data);
          iterator = iterator.next;
      }
      return flatArray;
  }


  this.remove = function() {
      var toRemove;
      if (this.isEmpty()) {
        console.log("Can't remove. Queue is already empty");
      } else if (this.head === this.tail) {
        toRemove = this.head;
        this.head = this.tail = null;
        return toRemove;
      } else if(this.head != null) {
        toRemove = this.head;
        this.head = this.head.next;
        return toRemove;
      }
  };

  // iterates through the queue and looks to see if data exists. returns if found.
  // returns null if not.
  this.get = function(key) {
      var iterator = this.head;
      while(iterator != null) {
          if (iterator.data.name === key) {
            return iterator.data;
          }
          iterator = iterator.next;
      }
      return null;
  }

  this.print = function() {
    console.log("--- Queue (print) ---");
    var iterator = this.head;
    while(iterator !== null) {
      iterator.display();
      iterator = iterator.next;
    }
    console.log("--------------");
  };

}



/***************************************
  NODE OBJECT WE USE TO CREATE OUR TREE
****************************************/

function treeNode(left, newData, right) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new treeNode');
         return new treeNode(null, data, null);
    }
    // assign properties to self
    this.left = left || null;
    this.data = newData;
    this.right = right || null;

    this.display = function() {
        console.log(": " +this.data);
    };

    this.delete = function() {
      this.left = null;
      this.right = null;
      this.data = null;
    }
    // return this
}


/***************************************
  UnBalancedBST

  - insert into tree
  - Breadth First Searching using a Queue
****************************************/

function BinaryTree() {

    /***************************************
                PROPERTIES
    ****************************************/
    var head = null;

     /***************************************
             INSERTING INTO THE TREE
     ****************************************/

    // PRIVATE
    function traverseInsertion(numberToInsert, node) {
        if (node == null) { return new treeNode(null, numberToInsert, null); }
        if (numberToInsert > node.data) {
            node.right = traverseInsertion(numberToInsert, node.right);
            return node;
        } else {
            node.left = traverseInsertion(numberToInsert, node.left);
            return node;
        }
    }

    // PUBLIC
    this.insert = function(number) {
        if (head == null) {
          head = new treeNode(null, number, null);
        } else {
            if (number > head.data) { head.right = traverseInsertion(number, head.right); }
            else { head.left = traverseInsertion(number, head.left); }
        }
    };


    //The height of a binary tree is the number of edges between the tree's root
    // and its furthest leaf node. This means that a tree containing a single node has a height of 0.

    // inner function, cannot access parent scope's this
    function getHeight(node) {
        if (node == null) return 0;
        if (node.left == null && node.right == null) { return 0; }
        var leftCount, rightCount = 0; // at every node, we begin with 0

        // if the left exist, we count the edge
        if (node.left) { leftCount = getHeight(node.left) + 1; }

        // right right exist, we count the edge
        if (node.right) { rightCount = getHeight(node.right) + 1; }

        return (leftCount > rightCount) ? leftCount : rightCount;
    }

    // GET HEIGHT OF Tree
    this.height = function() {
        if (head) {
          return getHeight(head);
        }
    }


    /***************************************
                  BREADTH FIRST SEARCH
    ****************************************/

    // We traverse through one entire level of children nodes first, before moving
    // on to traverse through the grandchildren nodes. And we traverse through an
    // entire level of grandchildren nodes before going on to traverse through
    // great-grandchildren nodes.

    // https://medium.com/basecs/breaking-down-breadth-first-search-cebe696709d9

    // inner function
    this.breadthFirstSearchPrint = function() {
      var displayResultsArr = [];
      var queue = new Queue();
      queue.insert(head);

      while (!queue.isEmpty()) {
          var treeNode = queue.head.data;
          displayResultsArr.push(treeNode.data);

          // enqueue node's children
          if (treeNode.left != null) { queue.insert(treeNode.left); }
          if (treeNode.right != null) { queue.insert(treeNode.right); }
          queue.remove();
      }
      console.log(displayResultsArr);
    }

}

BinaryTree.CreateObject = function() {
  return new BinaryTree();
}

var myBT = BinaryTree.CreateObject();
myBT.insert(50);
myBT.insert(40);
myBT.insert(80);

myBT.insert(20);
myBT.insert(45);
myBT.insert(60);
myBT.insert(90);

myBT.insert(10);
myBT.insert(8);
myBT.insert(6);
myBT.insert(2);

console.log("---- height of tree ----");
console.log(myBT.height());
console.log("------------------------");

myBT.breadthFirstSearchPrint();
