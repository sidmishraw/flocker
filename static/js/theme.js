var mini = 175;
var maxi = 400;



$("#split-bar").mousedown(function (e) {
    e.preventDefault();
    console.log("Mouse Down at split bar")
    $(document).mousemove(function (e) {
        e.preventDefault();
        var x = e.pageX - $('#sidebar').offset().left;
        console.log(" x > min"+(x>mini) +" \t x :"+x+" \t min :" +mini);
        console.log((x > min && x < max && (e.pageX < ($(window).width()))))
        if (x > mini && x < maxi && (e.pageX < ($(window).width()))) {
            console.log("Hellooooo")
            $('#sidebar').css("width", x);
            $('#main').css("margin-left", x);
        }
    })
});
$(document).mouseup(function (e) {
    $(document).unbind('mousemove');
});
$(document).ready(function () {
    document.getElementById("sidebar").style.height = screen.height+"px";
    console.log(document.getElementById("sidebar").style.height );
    document.getElementById("main").style.height = screen.height+"px";
    document.getElementById("split-bar").style.height = screen.height+"px";
})