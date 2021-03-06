window.dom = {
  // 创建节点
  create(string) {
    const template = document.createElement("template");
    template.innerHTML = string.trim();
    return template.content.firstChild;
  },
  // 新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  // 新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  // 新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  // 新增爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  // 删除节点
  remove(node) {
    // node.remove(); 比较新，可能会不支持
    node.parentNode.removeChild(node);
    return node;
  },
  // 删除后代
  empty(node) {
    // node.innerHTML = '';
    const { childNodes } = node; // const childNodes = node.childNodes
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    return array;
  },
  // 读写属性
  attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  // 读写文本内容
  text(node, string) {
    if (arguments.length === 2) {
      // 适配
      if ("innerText" in node) {
        node.innerText = string; // IE
      } else {
        node.textContent = string; // Firefox Chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent; // Firefox Chrome
      }
    }
  },
  // 读写HTML
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  // 修改style
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div,{color:'red'})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  // 增加、删除class
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  // 添加点击事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  // 删除点击事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 获取标签或标签们
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  // 获取父元素
  parent(node) {
    return node.parentNode;
  },
  // 获取子元素
  children(node) {
    return node.children;
  },
  // 获取兄弟姐妹元素
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  // 获取弟弟
  next(node) {
    // return node.nextElementSibling;
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = node.nextSibling;
    }
    return x;
  },
  // 获取哥哥
  previous(node) {
    // return node.previousElementSibling;
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = node.previousSibling;
    }
    return x;
  },
  // 遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  // 获取排行老几
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
