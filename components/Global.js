
global.allLoans = [0];

global.totalLoans = (allLoans) => {	
    for (let i = 0; i < allLoans.length - 1; i++) {
        totalLoans[i] === allLoans[i]+allLoans[i+1]
    }
}

global.halfPaid = (totalLoans) => {
    if (totalLoans[totalLoans.length - 1] === totalLoans[totalLoans] * 2 ) {
        return false;
    }
}