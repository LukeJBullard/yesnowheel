$(function(){
    //animate the turbine wheel
    var frames = ["|","\u2044","\u2013","\\"];
    var currentFrame = 0;

    setInterval(()=>{
        currentFrame++;
        if (currentFrame >= frames.length)
            currentFrame = 0;
        $("#yesnowheel").text(frames[currentFrame]);
    }, 400);


    //when the run button is clicked
    var running = false;
    $("#run").click(function(){
        if (running)
            return;

        running = true;
        $("#body").addClass("running");
        $("#output").text("Turbine...");

        turbineWaitForReady().then(() => {
            response = turbineQuery(0,1,5);
            response.then((responseValue) => {
                if (turbineQueryFailed(responseValue))
                {
                    //show error
                    $("#output").text("Failed");
                } else {
                    //show output
                    if (responseValue)
                    {
                        $("#output")
                            .text("Yes")
                            .removeClass("red green")
                            .addClass("green");
                    } else {
                        $("#output")
                            .text("No")
                            .removeClass("red green")
                            .addClass("red");
                    }
                }
                $("body").removeClass("running");
                running = false;
            });
        });
    });
});