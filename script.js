d3.csv("./insta_data.csv").then(function (data) {

    /************ PAGE SET-UP ***************/
    var pieChart = d3.select("#item1");
    var appear = d3.select("#item2");
    var topic = d3.select("#item3");
    var dashboardContainer = d3.select(".dashboardContainer");
    var imgContainer = d3.select(".imgContainer")

    var width = document.getElementById("item3").clientWidth;
    var height = document.getElementById("item3").clientHeight;

    var svg = topic.append("svg");


    /********* LOAD IN SVG FILES OF CIRLCES ************/
    //Load in SVG from Illustrator 

    d3.xml("./background.svg").then(dta => {

        imgContainer.node().append(dta.documentElement);

        var cookingImg = d3.select("#cookingPics");
        var netflixImg = d3.select("#netflixPics");
        var filmImg = d3.select("#filmPics");
        var otherImg = d3.select("#other");

        function picOpacity() {
            cookingImg.attr("opacity", 0);
            netflixImg.attr("opacity", 0);
            filmImg.attr("opacity", 0);
            otherImg.attr("opacity", 0);
        }

        d3.xml("./circles.svg").then(data1 => {

            svg.node().append(data1.documentElement);

            // Identify filled in circles for each category 
            var filmFilled = d3.select("#filmCircs");
            var netflixFilled = d3.select("#netflixCircs");
            var cookingFilled = d3.select("#cookingCircs");

            //Set up function to reduce any color back to 0 opacity when
            // clicking on another button
            function reduceOpacity() {
                filmFilled.attr("opacity", 0);
                netflixFilled.attr("opacity", 0);
                cookingFilled.attr("opacity", 0);
            }

            // Have any colored circles be "hidden" on initial load
            reduceOpacity();


            /********* COUNT UP FUNCTION FOR NUMBER OF APPEARENCES ************/

            // Set up animation duration 
            const animationDuration = 1500;
            const frameDuration = 1000 / 60;
            const totalFrames = Math.round(animationDuration / frameDuration);

            const easeOutQuad = t => t * (2 - t);

            const animateCountUp = el => {
                let frame = 0;
                const countTo = parseInt(el.innerHTML, 10);
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = Math.round(countTo * progress);

                    // Continue updating number
                    if (parseInt(el.innerHTML, 10) !== currentCount) {
                        el.innerHTML = currentCount;
                    }
                    // until end is reach
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);
            };

            // Run the animation on all elements with a class of ‘countup’
            const runAnimations = () => {
                const countupEls = document.querySelectorAll('.countup');
                countupEls.forEach(animateCountUp);
            };

            // Load in PieChart
            d3.xml("./dounut.svg").then(data2 => {
                pieChart.node().append(data2.documentElement);

                var cooking = d3.select("#cookingChart");
                var netflix = d3.select("#netflixChart");
                var film = d3.select("#filmChart");

                function hidePaths() {
                    cooking.attr("opacity", 0);
                    netflix.attr("opacity", 0);
                    film.attr("opacity", 0);
                }

                hidePaths();

                /************ NETFLIX BUTTON ACTIONS *************/
                d3.select("#netflix").on("click", function () {

                    // remove previous text
                    var counts = document.querySelectorAll(".countup");
                    var times = document.querySelectorAll(".xText");

                    counts.forEach(num => {
                        num.remove();
                    });

                    times.forEach(i => {
                        i.remove();
                    });

                    // Add text to identify percentage of feed
                    pieChart.append("text")
                        .text(`${data[1].percent}% of Feed`)
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    // Add text to identify number of correlated topics
                    topic.append("text")
                        .text(`${data[1].topics}/105 Unique Topics`)
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText")

                    // Reduce opacity of nonselected images
                    // Transitin opacity of selected category images
                    picOpacity()
                    netflixImg.attr("opacity", 1);

                    // Reduce opacity of previous circles
                    // Transition opacity of category circles
                    reduceOpacity();
                    netflixFilled.transition()
                        .duration(1500)
                        .attr("opacity", 1);

                    // Reduce opacity of previous donut chart
                    // Transition opacity of current donut chart
                    hidePaths();
                    netflix.transition()
                        .duration(1500)
                        .attr("opacity", 1);

                    // Append countup 
                    var text = appear.append("text")
                        .html(`${data[1].presence}`)
                        .style("font-family", "Futura")
                        .style("font-size", "100px")
                        .style("color", "rgb(243, 70, 70)")
                        .attr("class", "countup")

                    appear.append("text")
                        .text("times")
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    // Change visibility of text 
                    appear.selectAll("p")
                        .style("visibility", "visible");

                    // Run the countup animation 
                    runAnimations()
                })

                /************ FILM BUTTON ACTIONS *************/
                d3.select("#film").on("click", function () {

                    var counts = document.querySelectorAll(".countup");
                    var times = document.querySelectorAll(".xText");

                    counts.forEach(num => {
                        num.remove();
                    });

                    times.forEach(i => {
                        i.remove();
                    });

                    pieChart.append("text")
                        .text(`${data[3].percent}% of Feed`)
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    topic.append("text")
                        .text(`${data[3].topics}/105 Unique Topics`)
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText")

                    picOpacity()
                    filmImg.attr("opacity", 1);

                    reduceOpacity();
                    filmFilled.transition()
                        .duration(1500)
                        .attr("opacity", 1);

                    hidePaths();
                    film.transition()
                        .duration(1500)
                        .attr("opacity", 1);

                    var text = appear.append("text")
                        .html(`${data[3].presence}`)
                        .style("font-family", "Futura")
                        .style("font-size", "100px")
                        .style("color", "rgb(57, 51, 128)")
                        .attr("class", "countup");

                    appear.append("text")
                        .text("times")
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    // Change visibility of text 
                    appear.selectAll("p")
                        .style("visibility", "visible");

                    runAnimations()
                })

                /************ COOKING BUTTON ACTIONS *************/
                d3.select("#cooking").on("click", function () {

                    var counts = document.querySelectorAll(".countup");
                    var times = document.querySelectorAll(".xText");

                    counts.forEach(num => {
                        num.remove();
                    });

                    times.forEach(i => {
                        i.remove();
                    });

                    pieChart.append("text")
                        .text(`${data[2].percent}% of Feed`)
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    topic.append("text")
                        .text(`${data[2].topics}/105 Unique Topics`)
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    picOpacity()
                    cookingImg.attr("opacity", 1);

                    reduceOpacity();
                    cookingFilled.transition()
                        .duration(1500)
                        .attr("opacity", 1);

                    hidePaths();
                    cooking.transition()
                        .duration(1500)
                        .attr("opacity", 1);

                    var text = appear.append("text")
                        .html(`${data[2].presence}`)
                        .style("font-family", "Futura")
                        .style("font-size", "100px")
                        .style("color", "rgb(232, 190, 72)")
                        .attr("class", "countup");

                    appear.append("text")
                        .text("times")
                        .style("font-family", "Futura")
                        .style("font-size", "20px")
                        .attr("class", "xText");

                    // Change visibility of text 
                    appear.selectAll("p")
                        .style("visibility", "visible");

                    runAnimations()
                })

            });
        });

    });
});