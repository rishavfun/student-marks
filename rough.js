let set = new Set()
set.add("Name")
set.add("Subject")
// console.log(set);
let arr = [ "Name","Subject"]
for(let val of arr){
    if(set.has(val)){
      console.log("rishav");
    }
}