$(document).ready(function () {
    var australianAnimals = ["bandicoot", "crocodile", "dingo", "echidna",
        "frilled-dragon", "kangaroo", "koala", "ostrich", "platypus",
        "striped-possum", "tasmanian-devil", "wombat"];
    var chineseFood = ["bao", "chow-mein", "dumplings", "egg-rolls",
        "fortune-cookies", "fried-rice", "gyoza", "lo-mein", "mapo-tofu",
        "ramen", "shumai", "wonton-soup"];
    var dinosaurs = ["ankylosaurus", "brachiosaurus", "dilophosaurus",
        "pachycelphalosaurus", "pterodactyl", "stegosaurus",
        "styracosaurus", "triceratops", "tyrannosaurus-rex",
        "velociraptor"];
    var solarSystem = ["earth", "jupiter", "luna", "mars", "mercury",
        "neptune", "saturn", "sol", "uranus", "venus"];

    $("#imageSet").change(showAllImages);
    $("#huntButton").click(arrayHunt);

    showAllImages();

    function showAllImages() {
        // What image set was selected? This is the directory name
        var directoryName = $("#imageSet").val();
        // Based on the selection, use the correct array
        var arrayOfImagesNames = getSelectedArray();

        // Empty out any children from the div
        var imageDiv = $("#originalArray").empty();

        // Make two rows of images, half in each row
        var half = arrayOfImagesNames.length / 2;
        // How many images are in the current row?
        var count = 0;
        // The current <div class="row">
        var row;

        for (var fileName of arrayOfImagesNames) {
            // Time to make a new row?
            if (count === 0 || count >= half) {
                row = $("<div>").addClass("row");
                imageDiv.append(row);
                count = 0;
            }
            // append a <figure> with the image and its caption
            row.append(createImage(directoryName, fileName));
            count++;
        }

    }

    function createImage(directory, fileName) {
        // Create a div with a Bootstrap class
        var col = $("<div>").addClass("col");
        // Create a figure (can have a caption)
        var figure = $("<figure>").addClass("figure");
        col.append(figure);

        // Create the image itself
        var img = $("<img>");
        img.attr("src", `${directory}/${fileName}.png`);
        img.attr("alt", fileName);

        // Add the image to the figure
        figure.append(img);

        // Create a caption
        var caption = $(`<figcaption>${fileName}</figcaption>`)
            .addClass("figure-caption text-center");
        figure.append(caption);

        return col;
    }

    function getSelectedArray() {
        // Which image set was selected?
        var selection = $("#imageSet").val();

        // Return the array that corresponds to
        // the selected string
        if (selection === "chinese")
            return chineseFood;
        else if (selection === "solar")
            return solarSystem;
        else if (selection === "dinos")
            return dinosaurs;
        else if (selection === "aussie")
            return australianAnimals;
    }

    function arrayHunt() {
        var myArray = getSelectedArray();

        /*
        Find the first and last string in the array.
        Output them to td#firstLast
         */
        var first = myArray[0];
        var count = myArray.length;
        var last = myArray[count - 1];

        $("td#firstLast").text(first + " " + last);

        /*
        Find the first string that contains an 'n'.
        Output it to td#firstEnn
         */
        var str;
        for (var word of myArray) {
            if (word.includes("n")) {
                str = word;
                break;
            }
        }
        $("td#firstEnn").text(str);

        /*
        Find all of the strings with less than 6 characters.
        Output them to td#lessThanSix
         */

        var word = [];
        myArray.forEach(function(element, index) {
            if(element.length < 6) {
                word.push(element);
            }
        });
        var lessThanSix = word.join(" ");

        $("td#lessThanSix").text(lessThanSix);
        /*
        Find the longest string in the array.
        Output it to td#longName
         */
        var longest;
        var length = 0;
        myArray.forEach(function(element, index) {
            if(element.length > length) {
                longest = element;
                length = element.length;
            }
        }) ;

        $("td#longName").text(longest);
        /*
        Find all of the strings that do not contain the letter 's'.
        Output them to td#noEss
         */
        var noS = [];
        myArray.forEach(function (element, index){
            if(element.indexOf("s") === -1) {
                noS.push(element);
            }
        });

        $("td#noEss").text(noS.join(" "));
        /*
        Output all of the strings, but with all of their vowels
        in uppercase, to td#upperVowels
         */

        var vowels = [];
        myArray.forEach(function(element, index) {
            var replacement = element.replaceAll("a", "A");
            replacement = replacement.replaceAll("e", "E");
            replacement = replacement.replaceAll("i", "I");
            replacement = replacement.replaceAll("o", "O");
            replacement = replacement.replaceAll("u", "U");
            vowels.push(replacement);
        });

        $("td#upperVowels").text(vowels.join(" "));

        /*
        Output all of the strings in reverse order and separated by
        ' - ' to td#reverseDash
         */

        var reverse = myArray.reverse();

        $("td#reverseDash").text(reverse.join(" - "));

    }

});