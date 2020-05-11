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
      var value = attributes.value;
      var degrees = 0;
      var negativeClass = '';

      var onChangeValue = function onChangeValue(value) {
        setAttributes({
          value: value
        });
        degrees = value / 100 * 360;

        if (value > 100) {
          degrees = 360;
        }

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
      var style = {};
      var subClasses = '';

      if (isStyleDonut) {
        style = {
          transform: 'rotate( ' + degrees.toFixed(2) + 'deg )'
        };
        subClasses = 'ppcf-circle' + negativeClass;
      } else {
        var width = value > 100 ? 100 : value;
        style = {
          width: width + '%'
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
          style: style
        }),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__fill"
        }))) :
        /*#__PURE__*/
        React.createElement("div", {
          className: subClasses
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-progress__bar",
          style: style
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
      var className = attributes.className === undefined ? '' : attributes.className; // Classes.

      var classes = className;

      if (className.indexOf('is-style') < 0) {
        classes += 'is-style-donut';
      }

      var isStyleDonut = classes.indexOf('is-style-donut') > -1;
      var style = {};
      var subClasses = '';

      if (isStyleDonut) {
        var degrees = attributes.value / 100 * 360;

        if (degrees > 360) {
          degrees = 360;
        }

        style = {
          transform: 'rotate( ' + degrees.toFixed(2) + 'deg )'
        };
        subClasses = 'ppcf-circle';

        if (attributes.value > 50) {
          subClasses += ' ppcf-circle--50';
        }
      } else {
        var width = attributes.value > 100 ? 100 : attributes.value;
        style = {
          width: width + '%'
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
        }, attributes.value, "%"),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice"
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__bar",
          style: style
        }),
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-circle__slice__fill"
        }))) :
        /*#__PURE__*/
        React.createElement("div", {
          className: subClasses
        },
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppcf-progress__bar",
          style: style
        },
        /*#__PURE__*/
        React.createElement("span", {
          className: "ppcf-progress__bar__status"
        }, attributes.value, "%"))))
      );
    }
  });
})();
//# sourceMappingURL=block-crowdfunding-progress.js.map