const spookyWords = require("spooky-words");
const d3 = require("d3");
const cloud = require("d3-cloud");
const words = d3
  .shuffle([
    ...spookyWords.predicates,
    ...spookyWords.objects,
    ...spookyWords.teams,
    ...spookyWords.collections,
  ])
  .slice(0, 100);

console.log(Math.floor(words.length * Math.random()));

const myCloud = document.getElementById("#cloud");

var myColor = d3.scaleLinear().domain([10, 100]).range(["red", "orange"]);

const layout = cloud()
  .size([window.innerWidth, window.innerHeight - 200])
  .words(
    words.map(function (d) {
      return { text: d, size: 10 + Math.random() * 90 };
    })
  )
  .padding((d) => d.size * 0.09)
  .rotate(function () {
    return ~~(Math.random() * 2) * 90;
  })
  .fontSize((d) => d.size)
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
    .style("font-family", "Creepster")
    .attr("text-anchor", "middle")
    .attr("fill", (d) => myColor(d.size))
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) {
      return d.text;
    });
}
