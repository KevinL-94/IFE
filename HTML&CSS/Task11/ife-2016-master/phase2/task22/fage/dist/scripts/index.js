'use strict';

//根

var _marked = [preOrder, midOrder, nextOrder].map(regeneratorRuntime.mark);

var tree = document.querySelector('.tree');

/**
 * 通过符合类名的直接子元素
 * @param className
 * @returns {*}
 */
HTMLElement.prototype.findChildByClassName = function (className) {
    var children = this.children;
    for (var i = 0, len = children.length; i < len; i++) {
        if (children[i].classList.contains(className)) {
            return children[i];
        }
    }
    return null;
};
/**
 * 获取左子树
 * @returns {*}
 */
HTMLElement.prototype.getLeftTree = function () {

    return this.findChildByClassName('left-tree');
};
/**
 * 获取右子树
 * @returns {*}
 */
HTMLElement.prototype.getRightTree = function () {

    return this.findChildByClassName('right-tree');
};

/**
 * 获取当前的节点
 * @returns {*}
 */
HTMLElement.prototype.getNode = function () {

    return this.findChildByClassName('node');
};

//先序遍历
function preOrder(tree) {
    var treeStack;
    return regeneratorRuntime.wrap(function preOrder$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    treeStack = [];

                case 1:
                    if (!(tree || treeStack)) {
                        _context.next = 17;
                        break;
                    }

                case 2:
                    if (!tree) {
                        _context.next = 9;
                        break;
                    }

                    treeStack.push(tree);
                    _context.next = 6;
                    return tree.getNode().classList.add('pre');

                case 6:

                    tree = tree.getLeftTree();

                    _context.next = 2;
                    break;

                case 9:

                    tree = treeStack.pop();

                    if (!tree) {
                        _context.next = 14;
                        break;
                    }

                    tree = tree.getRightTree();
                    _context.next = 15;
                    break;

                case 14:
                    return _context.abrupt('break', 17);

                case 15:
                    _context.next = 1;
                    break;

                case 17:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

function midOrder(tree) {
    var treeStack;
    return regeneratorRuntime.wrap(function midOrder$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    treeStack = [];

                case 1:
                    if (!(tree || treeStack)) {
                        _context2.next = 13;
                        break;
                    }

                    while (tree) {
                        treeStack.push(tree);

                        tree = tree.getLeftTree();
                    }

                    tree = treeStack.pop();

                    if (!tree) {
                        _context2.next = 10;
                        break;
                    }

                    _context2.next = 7;
                    return tree.getNode().classList.add('mid');

                case 7:
                    tree = tree.getRightTree();
                    _context2.next = 11;
                    break;

                case 10:
                    return _context2.abrupt('break', 13);

                case 11:
                    _context2.next = 1;
                    break;

                case 13:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}

function nextOrder(tree) {
    var treeStack, treeLeft, treeRight;
    return regeneratorRuntime.wrap(function nextOrder$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    treeStack = [];


                    tree.isVisited = true;

                    treeStack.push(tree);

                case 3:
                    if (!treeStack) {
                        _context3.next = 19;
                        break;
                    }

                    tree = treeStack[treeStack.length - 1];

                    if (tree) {
                        _context3.next = 7;
                        break;
                    }

                    return _context3.abrupt('break', 19);

                case 7:
                    treeLeft = tree.getLeftTree();
                    treeRight = tree.getRightTree();

                    if (!(!treeLeft && !treeRight || treeLeft && treeLeft.isVisited || treeRight && treeRight.isVisited)) {
                        _context3.next = 15;
                        break;
                    }

                    treeStack.pop();
                    _context3.next = 13;
                    return tree.getNode().classList.add('next');

                case 13:
                    _context3.next = 17;
                    break;

                case 15:
                    if (treeRight) {
                        treeRight.isVisited = true;
                        treeStack.push(treeRight);
                    }
                    if (treeLeft) {
                        treeLeft.isVisited = true;
                        treeStack.push(treeLeft);
                    }

                case 17:
                    _context3.next = 3;
                    break;

                case 19:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked[2], this);
}

document.querySelector('.btnBox').addEventListener('click', function (event) {
    var target = event.target,
        order;

    if (target.id === 'preOrder') {

        order = preOrder(tree);
    } else if (target.id === 'midOrder') {

        order = midOrder(tree);
    } else if (target.id === 'nextOrder') {

        order = nextOrder(tree);
    } else {
        return;
    }

    //每隔一段时间访问下一个节点
    var clearId = setInterval(function () {
        if (order.next().done) clearInterval(clearId);
    }, 500);
});
//# sourceMappingURL=index.js.map
