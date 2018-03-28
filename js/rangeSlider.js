/**
 *  BSD 3-Clause License
 *
 * Copyright (c) 2018, Gaurav Gupta
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of its
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * range Slider
 * @author Gaurav Gupta
 * @description Slider behaviour code
 * @created Wed Mar 22 2018 15:28:07 GMT-0700 (PDT)
 */


$(document).ready(function () {
    //Define Initial Values

    let $VELOCITY = 10;
    let $SEPARATION_WEIGHT = 3.0;
    let $ALIGNMENT_WEIGHT = 2.0;
    let $COHESION_WEIGHT = 2.0;
    let $DESIRED_COHESION = 50;
    let $DESIRED_SEPARATION = 50;
    let $DESIRED_ALIGNMENT = 50;
    let $ACCELERATION = 0.03;



    /**
     *
     * Set Velocity Properties for the flocker
     *
     */

    setVelocity($VELOCITY);
    setVelocity_text($VELOCITY);

    // Handling the velocity of the birds with the help of range input
    $('#velocity').change(function () {
        setVelocity($(this).val());
        console.log($(this).val());
        setVelocity_text($(this).val());
    });
    // function to set the maxVelocity of the flocker
    function setMAX_VELOCITY($val) {
        MAX_VELOCITY =$val;
    }

    // function will set the velocity slider css according to the change value
    function setVelocity($val) {
        var x = ($val - $("#velocity").attr('min')) / ($("#velocity").attr('max') - $("#velocity").attr('min'));
        $("#velocity").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#velocity").val($val)
        console.log("Value is in Slider:"+$val);
        setMAX_VELOCITY($val);
    }
    // function will set the velocity of the text box
    function setVelocity_text($val){
        $('#velocity_text').val($val);
        setMAX_VELOCITY($val);
    }

    //function will check the value as soon as it is entered in the
    $('#velocity_text').keyup(function(){
       var x = $(this).val();
       console.log(x +" -> "+ $.isNumeric(x));
       if($.isNumeric(x)){
           x = parseInt(x);
           if(x<0 || x>50){
               $("#velocity_error").html("<br/>Entered value should be in the range of 0 to 50");
           }else{
               setVelocity(x);
               $("#velocity_error").html("");
           }
       }else{
           $("#velocity_error").html("<br/>Entered value is not a number");
       }
    });


    /**
     *
     * Set the Acceleration Property
     */

    //set the default values for text and slider
    setAcceleration($ACCELERATION);
    setAcceleration_text($ACCELERATION);

    // set the value for the flocker object
    function setMAX_ACCELERATION($val) {
        console.log("Setting Max Acceleration Property to :" +$val);
        MAX_ACCELERATION = $val;
    }

    //handle acceleration css when change is made through slider
    function setAcceleration($val) {
        var x = ($val - $("#acc").attr('min')) / ($("#acc").attr('max') - $("#acc").attr('min'));
        $("#acc").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#acc").val($val);
        console.log("Acceleartion Value is :"+$val);
        setMAX_ACCELERATION($val);
    }

    //set acceleration text when any change in acceleration is made
    function setAcceleration_text($val) {
        $("#acc_text").val($val);
        setMAX_ACCELERATION($val);
    }

    // handle the changes maded through acceleration slider
    $("#acc").change(function () {
        setAcceleration($(this).val());
        console.log($(this).val());
        setAcceleration_text($(this).val());
    });

    //handle the changes made through text box
    $("#acc_text").keyup(function () {
       var $val = $(this).val();
       console.log("Value of acceleration is :"+$val);
       if($.isNumeric($val)){
           if($val< 0 || $val>1){
               $("#acc_error").html("<br/> Acceleration should be in the range of 0 to 1");
           }else{
               $("#acc_error").html("");
               setAcceleration($val);
           }
       }else{
           $("#acc_error").html("<br/> Acceleration is restricted to numeric entry only");
       }
    });


    /**
     * Set and Handle Separation Weight property
     */

    //set the default values for text and slider
    setSeparationWeight($SEPARATION_WEIGHT);
    setSeparationWeight_text($SEPARATION_WEIGHT);

    // set the SEPERATION WEIGHT property for the flocker object
    function setSEPARATION_WEIGHT($val) {
        SEPRATION_WEIGHT = $val;
    }

    //handle separation weight css when change is made through slider
    function setSeparationWeight($val) {
        var x = ($val - $("#sw").attr('min')) / ($("#sw").attr('max') - $("#sw").attr('min'));
        $("#sw").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#sw").val($val);
        console.log("Value of Separation Weight is :"+$val);
        setSEPARATION_WEIGHT($val);
    }

    //set separation weight text when any change in separation weight is made
    function setSeparationWeight_text($val) {
        $("#sw_text").val($val);
        setSEPARATION_WEIGHT($val);
    }

    // handle the changes maded through separation weight slider
    $("#sw").change(function () {
        setSeparationWeight($(this).val());
        console.log($(this).val());
        setSeparationWeight_text($(this).val());
    });

    //handle the changes made through text box
    $("#sw_text").keyup(function () {
        var $val = $(this).val();
        if($.isNumeric($val)){
            if($val< 0 || $val>5){
                $("#sw_error").html("<br/> Separation Weight should be in the range of 0 to 5");
            }else{
                $("#sw_error").html("");
                setSeparationWeight($val);
            }
        }else{
            $("#sw_error").html("<br/> Separation Weight is restricted to numeric entry only");
        }
    });



    /**
     * Set and Handle Alignment Weight property
     */

    //set the default values for text and slider
    setAlignmentWeight($ALIGNMENT_WEIGHT);
    setAlignmentWeight_text($ALIGNMENT_WEIGHT);

    // set the ALIGNMENT WEIGHT property for the flocker object
    function setALIGNMENT_WEIGHT($val) {
        ALIGNMENT_WEIGHT = $val;
    }

    //handle Alignment Weight css when change is made through slider
    function setAlignmentWeight($val) {
        var x = ($val - $("#aw").attr('min')) / ($("#aw").attr('max') - $("#aw").attr('min'));
        $("#aw").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#aw").val($val);
        console.log("Value Alignment Weight is :"+$val);
        setALIGNMENT_WEIGHT($val);
    }

    //set Alignment text when any change in Alignment Weight  is made
    function setAlignmentWeight_text($val) {
        $("#aw_text").val($val);
        setALIGNMENT_WEIGHT($val);
    }

    // handle the changes maded through Alignment Weight slider
    $("#aw").change(function () {
        setAlignmentWeight($(this).val());
        console.log($(this).val());
        setAlignmentWeight_text($(this).val());
    });

    //handle the changes made through text box
    $("#aw_text").keyup(function () {
        var $val = $(this).val();
        if($.isNumeric($val)){
            if($val< 0 || $val>5){
                $("#aw_error").html("<br/> Alignment Weight should be in the range of 0 to 5");
            }else{
                $("#aw_error").html("");
                setAlignmentWeight($val);
            }
        }else{
            $("#aw_error").html("<br/> Alignment Weight is restricted to numeric entry only");
        }
    });



    /**
     * Set and Handle Cohesion Weight property
     */

    //set the default values for text and slider
    setCohesionWeight($COHESION_WEIGHT);
    setCohesionWeight_text($COHESION_WEIGHT);

    // set the COHESION WEIGHT property for the flocker object
    function setCOHESION_WEIGHT($val) {
        COHESION_WEIGHT = $val;
    }

    //handle Cohesion Weight css when change is made through slider
    function setCohesionWeight($val) {
        var x = ($val - $("#cw").attr('min')) / ($("#cw").attr('max') - $("#cw").attr('min'));
        $("#cw").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#cw").val($val);
        console.log("Value of Cohesion Weight is :"+$val);
        setCOHESION_WEIGHT($val);
    }

    //set Cohesion text when any change in Cohesion Weight  is made though text box
    function setCohesionWeight_text($val) {
        $("#cw_text").val($val);
        setCOHESION_WEIGHT($val);
    }

    // handle the changes maded through Cohesion Weight slider
    $("#cw").change(function () {
        setCohesionWeight($(this).val());
        console.log("Value of Cohesion Weight is :"+$(this).val());
        setCohesionWeight_text($(this).val());
    });

    //handle the changes made through text box
    $("#cw_text").keyup(function () {
        var $val = $(this).val();
        if($.isNumeric($val)){
            if($val< 0 || $val>5){
                $("#cw_error").html("<br/> Cohesion Weight should be in the range of 0 to 5");
            }else{
                $("#cw_error").html("");
                setCohesionWeight($val);
            }
        }else{
            $("#cw_error").html("<br/> Cohesion Weight is restricted to numeric value only");
        }
    });


    /**
     *
     * Set and Handle Desired Separation property
     *
     */

    setDesiredSeparation($DESIRED_SEPARATION);
    setDesiredSeparation_text($DESIRED_SEPARATION);

    // function sets the Desired Separation property for the flocker object
    function setDESIRED_SEPARATION($val) {
        DESIRED_SEPARATION = $val;
    }

    // function is internally used to set the desired separation property with the help of slider
    function setDesiredSeparation($val){
        var x = ($val - $("#ds").attr('min')) / ($("#ds").attr('max') - $("#ds").attr('min'));
        $("#ds").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#ds").val($val);
        console.log("Value Desired Separation is :"+$val);
        setDESIRED_SEPARATION($val);
    }
    //function is internally used to set the desired separation property using the text box
    function setDesiredSeparation_text($val) {
        $("#ds_text").val($val);
        setDESIRED_SEPARATION($val);
    }

    //function is used to continuously monitor the slider for the Desired Separation
    $("#ds").change(function () {
       setDesiredSeparation($(this).val());
       setDesiredSeparation_text($(this).val());
    });

    //function is used to continously monitor the changes made through text box of Desired Separation
    $("#ds_text").keyup(function () {
       var $val = $(this).val();
       if($.isNumeric($val)){
           if($val<0 || $val > 300){
               $("#ds_error").html("<br/>Desired Separation value should be in range 0 to 300");
           }else{
               $("#ds_error").html("");
               setDesiredSeparation($val);
           }

       }else{
           $("#ds_error").html("<br/>Desired Sepration value should be a numeric value");
       }
    });


    /**
     *
     * Set and handle Desired Alignment property
     *
     */

    //set default values;
    setDesiredAlignment($DESIRED_ALIGNMENT);
    setDesiredAlignment_text($DESIRED_ALIGNMENT);

    //Set Desired Alignment property of flocker object
    function  setDESIRED_ALIGNMENT($val) {
        DESIRED_ALIGNMENT = $val;
    }

    //set the Desired Alignment value for Range input, it is an internal function
    function setDesiredAlignment($val) {
        var x = ($val - $("#da").attr('min')) / ($("#da").attr('max') - $("#da").attr('min'));
        $("#da").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#da").val($val);
        console.log("Value of Desired Alignment is :"+$val);
        setDESIRED_ALIGNMENT($val);
    }

    //sets the desired alignment value for text input box, this is an internal function
    function setDesiredAlignment_text($val) {
        $("#da_text").val($val);
        setDESIRED_ALIGNMENT($val);
    }

    //function is used to continously monitor the range slider and if any change is made, update the property desired alignment
    $("#da").change(function () {
       var $val = $(this).val();
       setDesiredAlignment($val);
       setDesiredAlignment_text($val);
    });

    //function is used to continously monitor the text inbox, if any change is made it is validated and updated on slider as well
    $("#da_text").keyup(function () {
       var $val = $(this).val();
       if($.isNumeric($val)){
           if($val<0 || $val>300){
               $("#da_error").html("<br/>Desired Alignment value should be in the range 0 to 300");
           }else{
               $("#da_error").html();
               setDesiredAlignment($val);
           }
       }else{
           $("#da_error").html("<br/>Desired Alignment value should be numeric");
       }
    });


    /**
     *
     * Set and handle Desired Cohesion property
     *
     */

    //set default values
    setDesiredCohesion($DESIRED_COHESION);
    setDesiredCohesion_text($DESIRED_COHESION);

    //Set Desired Cohesion property of Flocker Object
    function setDESIRED_COHESION($val) {
        DESIRED_COHESION = $val;
    }

    //Handles the desired cohesion range slider functionality, this is an internal function
    function setDesiredCohesion($val) {
        var x = ($val - $("#dc").attr('min')) / ($("#dc").attr('max') - $("#dc").attr('min'));
        $("#dc").css('background-image',
            '-webkit-gradient(linear, left top, right top, '
            + 'color-stop(' + x + ', #012304), '
            + 'color-stop(' + x + ', #C5C5C5)'
            + ')'
        );
        $("#dc").val($val);
        console.log("Value of Desired Cohesion is :"+$val);
        setDESIRED_COHESION($val);
    }

    //Handles the desired cohesion property for input box, this is an internal function
    function setDesiredCohesion_text($val) {
        $("#dc_text").val($val);
        setDESIRED_COHESION($val);
    }

    //Monitors and Handles the slider Desired Cohesion property for the Range Slider
    $("#dc").change(function () {
       var $val = $(this).val();
       setDesiredCohesion($val);
       setDesiredCohesion_text($val);
    });

    //Monitors and Handles the Desired Cohesion property for input box
    $("#dc_text").keyup(function () {
        var $val = $(this).val();
        if($.isNumeric($val)){
            if($val<0 || $val>300){
                $("#dc_error").html("<br/>Desired Cohesion value should be in the range 0 to 300")
            }else{
                $("#dc_error").html("");
                setDesiredCohesion($val);
            }
        }else{
            $("#dc_error").html("<br/>Desired Cohesion value should be numeric")
        }
    })

});
