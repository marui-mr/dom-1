// document.createElement('div')
const div1 = dom.create("<div>hi</div>");
const div2 = dom.create("<div>hello</div>");
console.log(div1);
console.log(div2);

dom.after(test, div1);
dom.before(test, div2);

const div3 = dom.create('<div id="parent"></div>');
dom.wrap(test, div3);

const nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(test, "title", "Hi, I am Frank");
const title = dom.attr(test, "title");
console.log(`title: ${title}`);

dom.text(test, "你好，这是新的内容");
console.log(dom.text(test));

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "red");
console.log(dom.class.has(test, "red"));

const fn = () => {
  console.log("点击了");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

const div = dom.find("#test2")[0];
console.log(dom.find(".red", div));

console.log(dom.parent(test));

console.log(dom.siblings(dom.find("#s2")[0]));

console.log(dom.next(dom.find("#s2")[0]));

console.log(dom.previous(dom.find("#s2")[0]));

const t = dom.find("#travel")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "red"));

const t2 = dom.find("#t2")[0];
console.log(dom.index(t2));
