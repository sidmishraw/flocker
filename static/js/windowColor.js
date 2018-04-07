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
 * @description Slider behaviour for Canvas Color
 * @created Wed Mar 29 2018 15:28:07 GMT-0700 (PDT)
 */

$("document").ready(function() {
  let rgb_color_value = "";
  let r_color = 255;
  let g_color = 255;
  let b_color = 255;
  let property = "#main";

  /**
   * @GauravGupta
   * Start of Base functions to convert RGB value to Hex value
   */

  function setRGB_Value() {
    // rgb_color_value =  "#" + componentToHex(r_color) + componentToHex(g_color) + componentToHex(b_color);
    rgb_color_value = "rgb(" + r_color + " ," + g_color + " ," + b_color + ")";
    console.log("RGB Hex Value :" + rgb_color_value);
  }

  /**
   * @GauravGupta
   * End of Base functions to convert RGB value to Hex value
   */

  /**
   * @GauravGupta
   * RGG slider control implementation
   */

  function setRGB() {
    $(property).css("background-color", rgb_color_value);
  }

  initiateRGBProperty();

  function initiateRGBProperty() {
    let rgbValue = $(property).css("background-color");
    let rgb = rgbValue
      .replace(/^(rgb|rgba)\(/, "")
      .replace(/\)$/, "")
      .replace(/\s/g, "")
      .split(",");
    console.log(" Hex Value is :" + rgbValue + "Red Value " + rgb[0]);
    r_color = rgb[0];
    g_color = rgb[1];
    b_color = rgb[2];
    setRValue(r_color);
    setRValue_text(r_color);
    setGValue(g_color);
    setGValue_text(g_color);
    setBValue(b_color);
    setBValue_text(b_color);
  }

  function changeColor() {
    console.log("Setting RGB value as (" + r_color + " ," + g_color + " ," + b_color + " )");
    setRGB_Value();
    setRGB();
  }

  //handle Red color value css when change is made through slider
  function setRValue($val) {
    var x = ($val - $("#r").attr("min")) / ($("#r").attr("max") - $("#r").attr("min"));
    $("#r").css(
      "background-image",
      "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" +
        x +
        ", #ff9800), " +
        "color-stop(" +
        x +
        ", #C5C5C5)" +
        ")"
    );
    $("#r").val($val);
    r_color = $val;
    console.log("Value of Red Color is :" + $val);
    changeColor();
  }

  //set Red color value for text when any change in input based value
  function setRValue_text($val) {
    $("#r_text").val($val);
    r_color = $val;
    changeColor();
  }

  // handle the changes made to Red color value through slider
  $("#r").change(function() {
    $("#r_error").html("");
    setRValue($(this).val());
    console.log($(this).val());
    setRValue_text($(this).val());
  });

  //handle color changes for Red color made from mouse scroll
  $("#r_text").bind("mousewheel", function(event, delta) {
    var $val = parseFloat($(this).val());
    if (delta > 0) {
      if ($val < 255) {
        $val = $val + 1;
        setRValue($val);
      } else {
        $val = 255;
        setRValue($val);
      }
    } else {
      if ($val > 0) {
        $val = $val - 1;
        setRValue($val);
      } else {
        $val = 0;
        setRValue($val);
      }
    }
    $("#r_error").html("");
  });

  //handle the changes made through text box
  $("#r_text").keyup(function() {
    var $val = $(this).val();
    if ($.isNumeric($val)) {
      if ($val < 0 || $val > 255) {
        $("#r_error").html("<br/> Red color should be in the range of 0 to 255");
      } else {
        $("#r_error").html("");
        setRValue($val);
      }
    } else {
      $("#r_error").html("<br/> Red color value is restricted to numeric entry only");
    }
  });

  //handle Green color value css when change is made through slider
  function setGValue($val) {
    var x = ($val - $("#g").attr("min")) / ($("#g").attr("max") - $("#g").attr("min"));
    $("#g").css(
      "background-image",
      "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" +
        x +
        ", #ff9800), " +
        "color-stop(" +
        x +
        ", #C5C5C5)" +
        ")"
    );
    $("#g").val($val);
    g_color = $val;
    console.log("Value of Green Color is :" + $val);
    changeColor();
  }

  //set Green color value for text when any change in input based value
  function setGValue_text($val) {
    $("#g_text").val($val);
    g_color = $val;
    changeColor();
  }

  // handle the changes made to Green color value through slider
  $("#g").change(function() {
    $("#g_error").html("");
    setGValue($(this).val());
    console.log($(this).val());
    setGValue_text($(this).val());
  });

  //handle color changes for green color made from mouse scroll
  $("#g_text").bind("mousewheel", function(event, delta) {
    var $val = parseFloat($(this).val());
    if (delta > 0) {
      if ($val < 255) {
        $val = $val + 1;
        setGValue($val);
      } else {
        $val = 255;
        setGValue($val);
      }
    } else {
      if ($val > 0) {
        $val = $val - 1;
        setGValue($val);
      } else {
        $val = 0;
        setGValue($val);
      }
    }
    $("#g_error").html("");
  });

  //handle the changes made through text box
  $("#g_text").keyup(function() {
    var $val = $(this).val();
    if ($.isNumeric($val)) {
      if ($val < 0 || $val > 255) {
        $("#g_error").html("<br/> Green color should be in the range of 0 to 255");
      } else {
        $("#g_error").html("");
        setGValue($val);
      }
    } else {
      $("#g_error").html("<br/> Green color value is restricted to numeric entry only");
    }
  });

  //handle Blue color value css when change is made through slider
  function setBValue($val) {
    var x = ($val - $("#b").attr("min")) / ($("#b").attr("max") - $("#b").attr("min"));
    $("#b").css(
      "background-image",
      "-webkit-gradient(linear, left top, right top, " +
        "color-stop(" +
        x +
        ", #ff9800), " +
        "color-stop(" +
        x +
        ", #C5C5C5)" +
        ")"
    );
    $("#b").val($val);
    b_color = $val;
    console.log("Value of Blue Color is :" + $val);
    changeColor();
  }

  //set Blue color value for text when any change in input based value
  function setBValue_text($val) {
    $("#b_text").val($val);
    b_color = $val;
    changeColor();
  }

  // handle the changes made to Blue color value through slider
  $("#b").change(function() {
    $("#b_error").html("");
    setBValue($(this).val());
    console.log($(this).val());
    setBValue_text($(this).val());
  });

  //handle color changes for blue color made from mouse scroll
  $("#b_text").bind("mousewheel", function(event, delta) {
    var $val = parseFloat($(this).val());
    if (delta > 0) {
      if ($val < 255) {
        $val = $val + 1;
        setBValue($val);
      } else {
        $val = 255;
        setBValue($val);
      }
    } else {
      if ($val > 0) {
        $val = $val - 1;
        setBValue($val);
      } else {
        $val = 0;
        setBValue($val);
      }
    }
    $("#b_error").html("");
  });

  //handle the changes made through text box
  $("#b_text").keyup(function() {
    var $val = $(this).val();
    if ($.isNumeric($val)) {
      if ($val < 0 || $val > 255) {
        $("#b_error").html("<br/> Blue color should be in the range of 0 to 255");
      } else {
        $("#b_error").html("");
        setBValue($val);
      }
    } else {
      $("#b_error").html("<br/> Blue color value is restricted to numeric entry only");
    }
  });

  //handle clicking event to change property type
  $("#changeProperty").click(function() {
    if (property == "#main") {
      console.log("Current Set property is #main");
      property = "#sidebar";
      $("#changeProperty").html("Click to change color property of Canvas Area ");
      $("#rgb_desc").html("Change color scheme of Sidebar Area");
    } else {
      console.log("current Set Property is #sidebar");
      property = "#main";
      $("#changeProperty").html("Click to change color property of Sidebar Area ");
      $("#rgb_desc").html("Change color scheme of Canvas Area");
    }
    initiateRGBProperty();
  });
});
