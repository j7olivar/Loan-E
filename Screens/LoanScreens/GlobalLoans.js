
var allLoans = {

  totalLoan : 0,

  loan1  : 0, loan2 : 0, loan3  : 0, loan4  : 0, loan5 : 0,
  loan6  : 0, loan7  : 0, loan8 : 0, loan9  : 0, loan10  : 0,

  index : 0,
  counter : 0
};

function updateCounter(allLoans){
  if(allLoans.loan10 > 0){
    allLoans.counter = 10
  }
  else if(allLoans.loan9 > 0){
    allLoans.counter = 9
  }
  else if(allLoans.loan8 > 0){
    allLoans.counter = 8
  }
  else if(allLoans.loan7 > 0){
    allLoans.counter = 7
  }
  else if(allLoans.loan6 > 0){
    allLoans.counter = 6
  }
  else if(allLoans.loan5 > 0){
    allLoans.counter = 5
  }
  else if(allLoans.loan4 > 0){
    allLoans.counter = 4
  }
  else if(allLoans.loan3 > 0){
    allLoans.counter = 3
  }
  else if(allLoans.loan2 > 0){
    allLoans.counter = 2
  }
  else if(allLoans.loan1 > 0){
    allLoans.counter = 1
  }

}


export {allLoans, updateCounter}

/*let allLoans = [0]

function Push(value) {
    return allLoans.push(value)
  }

export {allLoans, Push}*/