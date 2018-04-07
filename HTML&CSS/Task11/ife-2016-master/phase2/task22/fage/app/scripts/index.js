'use strict';

//根
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
function* preOrder(tree) {

    var treeStack = [];

    while (tree || treeStack) {
        while (tree) {
            treeStack.push(tree);
            yield tree.getNode().classList.add('pre');

            tree = tree.getLeftTree();

        }

        tree = treeStack.pop();

        if (tree) {
            tree = tree.getRightTree();
        } else {
            break;
        }

    }
}

function* midOrder(tree) {

    var treeStack = [];

    while (tree || treeStack) {
        while (tree) {
            treeStack.push(tree);

            tree = tree.getLeftTree();

        }

        tree = treeStack.pop();

        if (tree) {

            yield tree.getNode().classList.add('mid');
            tree = tree.getRightTree();
        } else {
            break;
        }

    }
}


function* nextOrder(tree) {

    var treeStack = [],
        treeLeft,
        treeRight;

    tree.isVisited = true;

    treeStack.push(tree);

    while (treeStack) {

        tree = treeStack[treeStack.length - 1];
        if (!tree) {
            break;
        }
        treeLeft = tree.getLeftTree();
        treeRight = tree.getRightTree();
        if ((!treeLeft && !treeRight) || ((treeLeft && treeLeft.isVisited) || (treeRight && treeRight.isVisited))) {
            treeStack.pop();
            yield tree.getNode().classList.add('next');

        } else {
            if (treeRight) {
                treeRight.isVisited = true;
                treeStack.push(treeRight);
            }
            if (treeLeft) {
                treeLeft.isVisited = true;
                treeStack.push(treeLeft);
            }

        }

    }
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

    }
    else {
        return;
    }

    //每隔一段时间访问下一个节点
    var clearId = setInterval(function () {
        if (order.next().done) clearInterval(clearId);
    }, 500);
})


