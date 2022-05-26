const height = 300;
const width = 1000;

dateRange = [new Date(2015, 0).getTime(), new Date(2020, 0).getTime()];
xScale = d3.scaleTime().range([80, width - 20]).domain(dateRange);

const numberOfEvents = {
  title: 'Number of Events',
  min: 100,
  max: 200,
  step: 10,
  value: 150
};

const numberOfCategories = {
  title: 'Number of Categories',
  min: 1,
  max: 10,
  value: 4
};

const categories = () => {
  const categoriesList = new Array(numberOfCategories).fill(0).map((_, i) => i)
  console.log(categoriesList.length)

  // return checkbox({
  //   options: categoriesList.map(i => ({ label: `Category ${i} <div style="margin: 0 10px 0px 5px; display: inline-block; width: 10px; height: 10px; background-color: ${d3.schemeTableau10[i]}"></div>`, value: i })),
  //   value: categoriesList
  // })
};


xAxis = svg => svg.append('g')
  .attr('color', '#3a3a3a')
  .attr('transform', `translate(0,${height / 2})`)
  .call(d3.axisBottom(xScale).tickSize(30).tickSizeOuter(0))
  .call(el => el.select('.tick:last-of-type').remove())
  .call(el => el.selectAll('.tick line')
    .attr('transform', 'translate(0, -15)'))
  .call(el => el.selectAll('.tick text')
    .attr('text-anchor', 'start')
    .attr('transform', 'translate(3, -36)'))
  .call(el => el.selectAll('.tick')
    .insert('rect', 'text')
    .attr('fill', 'white')
    .attr('x', 1)
    .attr('height', 4)
    .attr('width', 26)
    .attr('transform', 'translate(0, -2)'));

labels = svg => svg.append('g')

  .attr('transform', `translate(20, ${height / 2})`)
  .call(el => el.append('text')
    .text('PRO')
    .attr('alignment-baseline', 'mathematical')
    .attr('transform', 'translate(0, -15)'))
  .call(el => el.append('text')
    .text('CON')
    .attr('alignment-baseline', 'mathematical')
    .attr('transform', 'translate(0, 15)'));


  const svg = d3.select('#container')
    .append("svg")
    .attr('width', width)
    .attr('height', height)
    .attr('font-family', 'sans-serif')
    .call(xAxis)
    .call(labels);


  function update(data) {
    svg.selectAll('.date-bin')
      // .data(data, d => { console.log(d[0], d[0]) })
      .data(data, d => d)
      .join('g')
      .attr('class', 'date-bin')
      .attr('transform', d => `translate(${xScale(new Date(d.InstallDate))}, ${height / 2})`)
      .selectAll('.date-bin-group')
      .data(d => d[1], d => d[0])
      .join('g')
      .attr('class', 'date-bin-group')
      .attr('transform', d => `translate(0, ${15 * (d[0] ? 1 : -1)})`)
      .selectAll('.event')
      .data(d => d[1], d => d.uid)
      .join(
        enter => enter.append('circle')
          .attr('fill', d => d3.schemeTableau10[d.category])
          .attr('r', 4)
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('class', 'event')
          .attr('transform', (d, i, nodes) => `${console.log(d.position)}translate(0, ${i * 10 * (d.position ? 1 : -1)})`)
          .call(el => el.attr('opacity', 0)
            .transition().duration(200)
            .attr('opacity', 1)),
        update => update
          .call(els => els.transition().duration(200)
            .attr('transform', (d, i, nodes) => `translate(0, ${i * 10 * (d.position ? 1 : -1)})`)),
        exit => exit.remove());
  }

update(jsondata)




// events = () => {
//   const events = new Array(numberOfEvents).fill(0);
//   events.forEach((event, i) => {
//     const randomTime = Math.random() * (dateRange[1] - dateRange[0]) + dateRange[0];
//     events[i] = {
//       uid: i,
//       position: Math.round(Math.random()) === 1,
//       category: Math.floor(Math.random() * numberOfCategories),
//       date: new Date(randomTime)
//     };
//   });

//   events.sort((a, b) => a.date.getTime() - b.date.getTime());
//   return events;
// }

// let ev = events()

let groupedEvents = d3.group(
  ev.filter(e => categories().includes(`${e.category}`)),
  d => new Date(d.date.getFullYear(), d.date.getMonth()).toDateString(),
  console.log(d => d.position),
  d => d.position)


