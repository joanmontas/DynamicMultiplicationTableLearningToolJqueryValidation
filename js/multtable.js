/*
	Name: Joan Montas
	Email: Joan_Montas@student.uml.edu
	File: multable.js
	GUI Assignment: GUI, HW4 part 1:  Validation Plugin
	Date:06/23/2023
	Description: Create a dynamic multiplication table.
        Certain error handling was added using the
        jquery validation plugin
	Copyright (c) 2023 by Joan Montas. All rights reserved.
*/

/*
    @description    sets up the page automatically.
    *@param Name    None
    *@return        None
    *@throws        None
*/
$(document).ready(function() {
    // https://jqueryvalidation.org/files/demo/
    $("#theform").validate({
        // ???
        onfocusout: function(element) {
            $("#theform").valid();
        },
        onfocus: function(element) {
            $("#theform").valid();
        },
        onchange: function(element) {
            $("#theform").valid();
        },
        onclick: function(element) {
            $("#theform").valid();
        },
        onkeyup: function(element) {
            $("#theform").valid();
        },
        oninput: function(element) {
            $("#theform").valid();
        },
        rules: {
            // https://jqueryvalidation.org/max-method/
            numberone: {
                required: true,
                lesserorequalthan: "#numbertwo",
                max: 50,
                min: -50
            },
            numbertwo: {
                required: true,
                greaterorequalthan: "#numberone",
                max: 50,
                min: -50
            },
            numberthree: {
                required: true,
                lesserorequalthan: "#numberfour",
                max: 50,
                min: -50
            },
            numberfour: {
                required: true,
                greaterorequalthan: "#numberthree",
                max: 50,
                min: -50
            },
        },
        messages: {
            numberone: {
                required: "Please enter a number",
                lesserorequalthan: "Minimum value should be lesser than the Maximum, try a smaller value.",
                max: "value should not exceed 50, try a smaller value.",
                min: "value should not be less than -50, try a bigger value."
            },
            numbertwo: {
                required: "Please enter number",
                greaterorequalthan: "Maximum should be greater or equal than minimum",
                max: "value should not exceed 50, try a smaller value.",
                min: "value should not be less than -50, try a bigger value."
            },
            numberthree: {
                required: "Please enter a number",
                lesserorequalthan: "Minimum value should be lesser than the Maximum, try a smaller value.",
                max: "value should not exceed 50, try a smaller value.",
                min: "value should not be less than -50, try a bigger value."
            },
            numberfour: {
                required: "Please enter number",
                greaterorequalthan: "Maximum should be greater or equal than Minimum",
                max: "value should not exceed 50, try a smaller value.",
                min: "value should not be less than -50, try a bigger value."
            }
        },
        submitHandler: function(form, event) { 
            // https://stackoverflow.com/questions/10798717/preventing-a-form-from-submitting-in-jquery-validate-plugins-submithandler-func
            event.preventDefault();
            createtableNew("theform", "thetable");
         }
    });

    // function determines if a numbers of given element is greater than the other
    $.validator.addMethod("greaterorequalthan",
    function(value, element, param){
        // https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
        var $el = $(param);
        return parseInt(value, 10) >= parseInt($el.val(), 10);
    });

    // function determines if a numbers of given element is lesser than the other
    $.validator.addMethod("lesserorequalthan",
    function(value, element, param){
        // https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
        var $el = $(param);
        return parseInt(value, 10) <= parseInt($el.val(), 10);
    });
});

/*
    @description                                    *Function Given a form and table's id, the form's value is use to
    *@param Name    String String                   The ID of the form from where to gather argument
                                                    and the ID of the table should be given
    *@return        None                            As of now no output
    *@throws "INVALID INPUT" "RESOURCE INPUT"       "INVALID INPUT" is thrown when poorly formated input
                                                    is given. "RESOURCE INPUT" is thrown when the
                                                    computation exceeds 2 minutes.
*/
function createtableNew(theformarg, thetablearg) {
    /* the form to gather input */
    var $theforme = $("#" + theformarg);

    var $theformValues = $theforme.serializeArray();

    /* the tabke where to output */
    var $thetablee = $("#" + thetablearg);

    /* Clear the table */
    $thetablee.text("");

    var $num0 = parseInt($theformValues[0].value, 10);
    var $num1 = parseInt($theformValues[1].value, 10);
    var $num2 = parseInt($theformValues[2].value, 10);
    var $num3 = parseInt($theformValues[3].value, 10);

    /* The first data is empty */
    var $therow = $("<tr></tr>");
    var $thedata = $("<td></td>");
    $thedata.width(50);
    $therow.append($thedata);

    var $i = $num2;
    var $j = $num0;

    /* The first row */
    for (var $i = $num0; $i <= $num1; $i++) {
        $thedata = $("<td></td>");
        $thedata.text($i);
        $thedata.width(50);
        $therow.append($thedata);
    }
    $thetablee.append($therow);

    /* 
        dynamically create the multiplicatibe table
        Handles event where computation time exceeds2 minutes
    */
    var initialunixtime = Date.now();
    $i = $num2;
    $j = $num0;
    
    /* loops, creates the table one data at a time*/
    while ($i <= $num3) {
        $therow = $("<tr></tr>");
        $thedata = $("<td></td>");
        $thedata.width(50);
        $thedata.text($i);
        $therow.append($thedata);
        while($j <= $num1) {
            var $thedata = $("<td></td>");
            $thedata.text($i*$j);
            $thedata.width(50);
            $therow.append($thedata);
            $j++;
        };
        $j = $num0;
        $thetablee.append($therow);
        $i++;
        /* Stop if more than 2 minutes have pass */
        if (Date.now() - initialunixtime >= 120000) {
            $thetablee.text("");
            $therow = $("<tr></tr>");
            $thedata = $("<td></td>");
            $thedata.text("Resource ERROR: Computation time exceeded");
            $therow.append($thedata);
            $thetablee.append($therow);
            break;
        };
    }
};
