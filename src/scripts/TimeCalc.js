const calcTime = (x) => {
    if (x != undefined) {
        var time = new Date();
        var receivedTime = new Date(x);
        var calculatedTime = Math.abs(time - receivedTime);
        var minutesLeft = (calculatedTime/1000/60) << 0;

        if (minutesLeft == 0) return "Nå";
        return minutesLeft + " min";
    } else {
        return "-";
    }
};

export default calcTime;