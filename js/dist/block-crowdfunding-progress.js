"use strict";

/* globals pronamic_crowdfunding_progress */
var registerBlockType = wp.blocks.registerBlockType;
var InspectorControls = wp.blockEditor.InspectorControls;
var _wp$components = wp.components,
    RangeControl = _wp$components.RangeControl,
    PanelBody = _wp$components.PanelBody;

(function () {
  'use strict';
  /**
   * Register progress block type.
   *
   * @param string name     Block name.
   * @param object settings Block settings.
   *
   * @return WPBlock        Block if registered successfully, otherwise "undefined".
   */

  registerBlockType('pronamic-pay/crowdfunding-progress', {
    title: pronamic_crowdfunding_progress.title,
    icon: 'marker',
    category: 'pronamic-pay',
    parent: ['pronamic-pay/crowdfunding-donut', 'pronamic-pay/crowdfunding-bar', 'pronamic-pay/crowdfunding-compact', 'core/column', 'core/group'],
    // Attributes.
    attributes: {
      color: {
        type: 'string',
        default: '#f9461c'
      },
      value: {
        type: 'integer',
        default: 0
      }
    },
    styles: [{
      name: 'donut',
      label: pronamic_crowdfunding_progress.label_donut,
      isDefault: true
    }, {
      name: 'bar',
      label: pronamic_crowdfunding_progress.label_bar
    }],
    // Edit.
    edit: function edit(_ref) {
      var attributes = _ref.attributes,
          setAttributes = _ref.setAttributes,
          className = _ref.className;
      var color = attributes.color,
          value = attributes.value;
      var degrees = 0;
      var negativeClass = '';

      var onChangeValue = function onChangeValue(value) {
        setAttributes({
          value: value
        });

        if (value > 50) {
          negativeClass = ' ppcf-circle--50';
        }
      };

      onChangeValue(value); // Classes.

      var classes = className;

      if (className.indexOf('is-style') < 0) {
        classes += ' is-style-donut';
      }

      var isStyleDonut = classes.indexOf('is-style-donut') > -1;
      var barStyle = {};
      var fillStyle = {};
      var subClasses = '';

      if (isStyleDonut) {
        var _degrees = value / 100 * 360;

        barStyle = {
          borderColor: color,
          transform: 'rotate( ' + Math.min(_degrees, 360).toFixed(2) + 'deg )'
        };

        if (value > 50) {
          fillStyle = {
            borderColor: color
          };
        }

        subClasses = 'ppcf-circle' + negativeClass;
      } else {
        barStyle = {
          background: color,
          width: Math.min(value, 100) + '%'
        };
        subClasses = 'ppcf-progress';
      }

      return (
        /*#__PURE__*/
        React.createElement("div", {
          className: classes
        }, isStyleDonut ?
        /*#__PURE__*/
        React.createElement("div", {
          className: subClasses
        },
        /*#__PURE__*/
        React.createElement("span", {
          className: "ppcf-circle__label"
        }, value, "%"),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice"
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__bar",
          style: barStyle
        }),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__fill",
          style: fillStyle
        }))) :
        /*#__PURE__*/
        React.createElement("div", {
          className: subClasses
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-progress__bar",
          style: barStyle
        },
        /*#__PURE__*/
        React.createElement("span", {
          className: "ppcf-progress__bar__status"
        }, value, "%"))))
      );
    },
    // Save.
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      var className = attributes.className === undefined ? '' : attributes.className;
      var color = attributes.color,
          value = attributes.value; // Classes.

      var classes = className;

      if (className.indexOf('is-style') < 0) {
        classes += 'is-style-donut';
      }

      var isStyleDonut = classes.indexOf('is-style-donut') > -1;
      var barStyle = {};
      var fillStyle = {};
      var subClasses = '';

      if (isStyleDonut) {
        var degrees = value / 100 * 360;
        barStyle = {
          borderColor: color,
          transform: 'rotate( ' + Math.min(degrees, 360).toFixed(2) + 'deg )'
        };
        subClasses = 'ppcf-circle';

        if (value > 50) {
          subClasses += ' ppcf-circle--50';
          fillStyle = {
            borderColor: color
          };
        }
      } else {
        barStyle = {
          background: color,
          width: Math.min(value, 100) + '%'
        };
        subClasses = 'ppcf-progress';
      }

      return (
        /*#__PURE__*/
        React.createElement("div", {
          className: classes
        }, isStyleDonut ?
        /*#__PURE__*/
        React.createElement("div", {
          className: subClasses
        },
        /*#__PURE__*/
        React.createElement("span", {
          className: "ppcf-circle__label"
        }, value, "%"),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice"
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__bar",
          style: barStyle
        }),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__fill",
          style: fillStyle
        }))) :
        /*#__PURE__*/
        React.createElement("div", {
          className: subClasses
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-progress__bar",
          style: barStyle
        },
        /*#__PURE__*/
        React.createElement("span", {
          className: "ppcf-progress__bar__status"
        }, value, "%"))))
      );
    }
  });
})();
//# sourceMappingURL=block-crowdfunding-progress.js.map