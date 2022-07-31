const spookyWords = require("spooky-words");
const d3 = require("d3");
const cloud = require("d3-cloud");
const words = [
  spookyWords.predicates,
  spookyWords.objects,
  spookyWords.teams,
  spookyWords.collections,
];

console.log(Math.floor(words.length * Math.random()));

const myCloud = document.getElementById("#cloud");

const layout = cloud()
  .size([800, 800])
  .words(
    words[Math.floor(words.length * Math.random())].map(function (d) {
      return { text: d, size: 10 + Math.random() * 90 };
    })
  )
  .padding(10)
  .rotate(function () {
    return ~~(Math.random() * 2) * 90;
  })
  .fontSize(function (d) {
    return d.size;
  })
  .on("end", draw);

layout.start();

function draw(words) {
  d3.select(myCloud)
    .append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr(
      "transform",
      "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
    )
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function (d) {
      return d.size + "px";
    })
    .style("font-family", "Impact")
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) {
      return d.text;
    });
}
