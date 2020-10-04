function updateTable(tableName) {
  console.log('now updating ' + tableName);
}

const syncUsernames = async (tables) => {
  for(var i =0; i < tables.length; i++) {
    await updateTable(tables[i]);
  };

  return "all finished";
}

const tables = ['members', 'orders', 'buyers', 'jokers', 'clowns'];

syncUsernames(tables).then((result) => {
console.log(result);
}).catch((err) => {
console.log(err);
})


// //this is tutorial from David Connely the nerd
// //https://www.youtube.com/watch?v=2xP2bfvS5NU&list=PLlggIFojpXMMHOZsOTYiBrJJaYIfeLvLt&index=8&ab_channel=DavidConnelly
//
function getFirstName() {
  var firstName = 'John';
  return firstName;
}
//
function getLastName() {
  var lastName = 'Rambo';
  return lastName;
}
//
function getCity() {
  var myCity = 'London';

  if (myCity !== 'Glasgow') {
    throw new Error('the city must be Glasgow');
  }
  return myCity;
}


// //basic javascript function I
// const getMyInfo = () => {
//   const myName = 'David';
//   return myName;
// }
//  console.log(getMyInfo());
//
// //basic javascript function II
//  const getMyInfo2 = function() {
//    const myName = 'David';
//    return myName;
//  }
//   console.log(getMyInfo2());

  //basic javascript function with async
  const getMyInfo3 = async (targetURL) => {

    const myFirstName = await getFirstName();
    const myLastName = await getLastName();
    const myCity = await getCity();
    return (`Hello, ${myFirstName} ${myLastName} - you are from ${myCity}`);
  }

  getMyInfo3().then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  })


   // //old promise statement
   // const getMyInfo4 = () => {
   //   return new Promise ((resolve, reject) => {
   //     resolve('David');
   //   })
   // }
   // console.log(getMyInfo4());
