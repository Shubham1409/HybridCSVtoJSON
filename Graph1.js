var fs = require("fs");
var readline = require("readline");
var arr = [];
var lines;
var head1;
var head2;
var head3;
var rlemiiter = readline.createInterface({

  input : fs.createReadStream("FoodFacts.csv"),
  output : fs.createWriteStream("app.json")

});
var head = false;
rlemiiter.on("line", function(line){

if(!head)
{
  lines=line.split(",");

  for(i=0;i<lines.length;i++){

    if(lines[i]=="countries_en"){
      head1 = i;
    }
    if(lines[i]=="sugars_100g"){
      head2 = i;
    }
    if(lines[i]=="salt_100g"){
      head3 = i;
    }
  }
  head = true;
}
else{
  var data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  var cont = data[head1];
  if(check_cont_avail(cont))
  {
    set_data(cont,Number(data[head2]),Number(data[head3]));
  }
  else {
    create_data(cont,Number(data[head2]),Number(data[head3]));
  }
}
});
rlemiiter.on("close", function(close){
  array = ["Netherlands","Spain","Canada","United Kingdom","Australia","France","Germany","South Africa"];
  var arra=[];
  for(var i=0;i<arr.length;i++)
  {
    if(exist(array,arr[i]))
    {
      arra.push(arr[i]);
    }
  }
  console.log(JSON.stringify(arra));
  var jsonObj = JSON.stringify(arra);
  fs.appendFile('Graph1.json',jsonObj,function (err) {
    if(err) throw err;
    console.log("done");
  })
});
function exist(arra,item)
{
  for(var i=0;i<arra.length;i++)
  {
  if(item[lines[head1]]==arra[i]){
    return true;
  }
}
return false;
}
function check_cont_avail(item)
{
  if(arr.length==0)
  return false;
  //var key = Object.keys(arr[0]);
  for(var i=0;i<arr.length;i++)
  {
    if(item==arr[i][lines[head1]])
    {
      return true;
    }
  }
  return false;
}
function set_data(con,su,sa)
{
  //var keys = Object.keys(arr[0]);
  for(var i=0;i<arr.length;i++)
  {
    if(arr[i][lines[head1]]==con)
    {
      arr[i][lines[head2]] += su;
      arr[i][lines[head3]] += sa;
    }
  }
}
function create_data(con,su,sa)
{
  var obj = {};
  obj[lines[head1]]=con;
  obj[lines[head2]]=su;
  obj[lines[head3]]=sa;
  arr.push(obj);
}
