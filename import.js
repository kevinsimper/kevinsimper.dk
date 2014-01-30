var fs = require('fs');
var parseString = require('xml2js').parseString;
var toMarkdown = require('to-markdown').toMarkdown;

var xmlimport = fs.readFileSync('wordpress.xml', {encoding: 'utf8'});

parseString(xmlimport, function(err, result){
  console.log(result.rss.channel[0].item.length);

  var posts = result.rss.channel[0].item;

  var dir = 'temp/';
  var drafts = '_drafts/';

  try {
  var temp = fs.mkdirSync(dir);
  fs.mkdirSync(dir + drafts);
  console.log(temp);
  }
  catch(e) {
    console.log('temp do exists');
  }

  var counter = 0;
  var data = [];
  for(var i = 0; i < posts.length; i++){
    var post = posts[i];
    var title = post.title[0];
    var content = post['content:encoded'][0];
    var slug = post['wp:post_name'][0];
    var status = post['wp:status'][0];
    var date = post.pubDate[0];

    console.log(dir + slug + '.md', status);
    if(slug == '' && content !== ''){
      slug = 'Untitled - ' + counter++;
    }
    var h1title = '<h1>' + title + '</h1>';
    if(content && status !== 'draft'){
      fs.writeFile(dir + slug + '.md', toMarkdown(h1title + content));
      data.push({slug: slug, title: title, date: date});
    }
    if(status === 'draft'){
      fs.writeFile(dir + drafts + slug + '.md', toMarkdown(h1title + content));
    }


  }

  fs.writeFile(dir + '_data.json', JSON.stringify(data.reverse(), null, '\t'));

});
