var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8888;
var jokes=[{setup:"外圆正割垂直线，积分开方斜角边。（猜一节日）",punchline:"中秋"},{setup:"离人千里得团聚（猜一字）",punchline:"秋"},{setup:"小时有牙，老来有牙，半老不少，反倒没牙。（猜一物）",punchline:"月亮"},{setup:"在中秋节， 吃月饼的习俗是在多少年前开始的？",punchline:"650年前"},{setup:"“中秋” 这个词最早记载在哪本书里？",punchline:"《周礼》"},{setup:"中秋节始于那个朝代？",punchline:"唐朝"},{setup:"中秋赏菊 （打一成语）",punchline:"花好月圆"},{setup:"中秋佳节结良缘 （打一城市名）",punchline:"重庆"},{setup:"明天日全食(打一字)",punchline:"月"},{setup:"为什么叫做“中秋节”",punchline:"因为在秋季的过了半才庆祝"},{setup:"古代的诗人喜欢在中秋节做什么？",punchline:"写关于月亮的诗"},{setup:"什么水果经常在中秋节吃？",punchline:"柚子"},{setup:"半月还比满月大（猜一字）",punchline:"胖"},{setup:"为什么月亮本来从地球看起来很小，但如果一走向地球就变大？",punchline:"因为它月来月大（月=越）"},{setup:"相依相伴对残月（猜一字）",punchline:"羽"}];

app.use(bodyParser.json());
app.listen(process.env.PORT || port, function(){
    console.log("Listening on " + port);
});

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/jokes', function(req, res) {

    var randomNumber = Math.floor(Math.random() * jokes.length);
    jokes[randomNumber].id = randomNumber;

    res.send(jokes[randomNumber]);
});

app.post('/upvote', function(req, res) {
   console.log("Someone tried to upvote something");
   console.log(req.body);
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

   jokes[jokeIndex].votes++;

    res.send(jokes[jokeIndex]);
});

app.post('/downvote', function(req, res) {
    console.log("Someone tried to downvote something.");
    console.log(req.body);
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes--;

    res.send(jokes[jokeIndex]);
});