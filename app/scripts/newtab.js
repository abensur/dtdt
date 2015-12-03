'use strict';

import 'd3';
import md5 from 'js-md5';
import jdenticon from 'jdenticon';

const dataTauApi = "https://api.import.io/store/data/6fcc8375-977e-4ef9-9fbd-dd6e3700c279/_query?input/webpage/url=http%3A%2F%2Fwww.datatau.com%2Fnews&_user=d9ce3138-5d91-46ad-840e-09955e90eddc&_apikey=d9ce31385d9146ad840e09955e90eddc9bdb3a0952125fae948d17ef0a464a1172e24e9b23e714157a2dc1c014cfd6d8be5731e3a09d8d1ab81253b9710f24d0d77caaa81b14cac474f78cbaed7ea3f3";

d3.json(dataTauApi, (err, data) => {
  if (err) throw console.log(err);

  let entries = [];

  for (let i = 0; i < data.results.length; i++) {
    entries.push({
      user: {
        url: data.results[i]['by_link'], // "http://www.datatau.com/user?id=hemapani"
        name: data.results[i]['by_link/_text'] // "hemapani"
      },
      meta: {
        when: data.results[i]['subtexttd_value'], // "11 hours ago |"
        points: data.results[i]['subtexttext_value'], // "6 points"
        comments: data.results[i]['subtext_link/_text'] // "discuss" || "n comments"
      },
      entry: {
        title: data.results[i]['title_content'], // "The Unreasonable Effectiveness of Random Forests (medium.com)"
        url: data.results[i]['title_links'], // "https://medium.com/rants-on-machine-learning/the-unreasonable-effectiveness-of-random-forests-f33c3ce28883"
      }
    });
  }

  dataTau(entries);
});

function dataTau (data) {
  let cs = "datatau__";

  var each = d3.select('#wrapper').selectAll('div')
    .data(data).enter()
    .append('div').classed(cs + 'item', true);

  each.append('div').classed(cs + 'thumbnail', true)
    .append('a')
    .attr({
      href: d => d.entry.url,
      target: '_blank'
    })
    .html(function(d)  {
      return jdenticon.toSvg(md5(d.user.name), 200);
    });

  each.append('div').classed(cs + 'title', true)
    .append('a')
    .attr({
      href: d => d.entry.url,
      target: '_blank'
    })
    .append('h2')
    .text(d => d.entry.title);

  each.append('div').classed(cs + 'points-time', true)
    .html(d => {
      return [
        d.meta.points,
        'by',
        '<a href=' + d.user.url + '>' + d.user.name + '</a>',
        d.meta.when.slice(0, -2)
      ].join(' ');
    });

  each.append('div').classed(cs + 'comments', true)
    .html(d => d.meta.comments);
}
