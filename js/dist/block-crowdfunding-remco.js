"use strict";

/* globals pronamic_crowdfunding_compact */
var registerBlockType = wp.blocks.registerBlockType;

(function () {
  'use strict';
  /**
   * Register crowdfunding compact block type.
   *
   * @param string name     Block name.
   * @param object settings Block settings.
   *
   * @return WPBlock        Block if registered successfully, otherwise "undefined".
   */

  registerBlockType('pronamic-pay/crowdfunding-remco', {
    title: 'Remco',
    icon: 'marker',
    category: 'pronamic-pay',
    // Attributes.
    attributes: {
      collectedLabel: {
        type: 'string',
        "default": 'Collected'
      },
      collectedAmount: {
        type: 'string',
        "default": '0'
      },
      goalLabel: {
        type: 'string',
        "default": 'Goal'
      },
      goalAmount: {
        type: 'string',
        "default": '0'
      },
      numberLabel: {
        type: 'string',
        "default": 'Number'
      },
      numberValue: {
        type: 'string',
        "default": '0'
      }
    },
    // Edit.
    edit: function edit(_ref) {
      var attributes = _ref.attributes,
          setAttributes = _ref.setAttributes,
          className = _ref.className,
          clientId = _ref.clientId;
      return /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement(RichText, {
        tagName: "dt",
        className: "ppcf-dl-list__label",
        value: attributes.collectedLabel,
        onChange: function onChange(val) {
          setAttributes({
            collectedLabel: val
          });
        }
      }), /*#__PURE__*/React.createElement(RichText, {
        tagName: "dd",
        className: "ppcf-dl-list__label",
        value: attributes.collectedAmount,
        onChange: function onChange(val) {
          setAttributes({
            collectedAmount: val
          });
        }
      }), /*#__PURE__*/React.createElement(RichText, {
        tagName: "dt",
        className: "ppcf-dl-list__label",
        value: attributes.goalLabel,
        onChange: function onChange(val) {
          setAttributes({
            goalLabel: val
          });
        }
      }), /*#__PURE__*/React.createElement(RichText, {
        tagName: "dd",
        className: "ppcf-dl-list__label",
        value: attributes.goalAmount,
        onChange: function onChange(val) {
          setAttributes({
            goalAmount: val
          });
        }
      }), /*#__PURE__*/React.createElement(RichText, {
        tagName: "dt",
        className: "ppcf-dl-list__label",
        value: attributes.numberLabel,
        onChange: function onChange(val) {
          setAttributes({
            numberLabel: val
          });
        }
      }), /*#__PURE__*/React.createElement(RichText, {
        tagName: "dd",
        className: "ppcf-dl-list__label",
        value: attributes.numberValue,
        onChange: function onChange(val) {
          setAttributes({
            numberValue: val
          });
        }
      }));
    },
    // Save.
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        "class": "ppd-block__container__col"
      }, /*#__PURE__*/React.createElement("dl", {
        "class": "ppd-dl-list"
      }, /*#__PURE__*/React.createElement("dt", {
        "class": "ppd-dl-list__label"
      }, attributes.collectedLabel), /*#__PURE__*/React.createElement("dd", {
        "class": "ppd-dl-list__value"
      }, attributes.collectedAmount), /*#__PURE__*/React.createElement("dt", {
        "class": "ppd-dl-list__label"
      }, attributes.goalLabel), /*#__PURE__*/React.createElement("dd", {
        "class": "ppd-dl-list__value"
      }, attributes.goalAmount), /*#__PURE__*/React.createElement("dt", {
        "class": "ppd-dl-list__label"
      }, attributes.numberLabel), /*#__PURE__*/React.createElement("dd", {
        "class": "ppd-dl-list__value"
      }, attributes.numberValue))));
    }
  });
})();
//# sourceMappingURL=block-crowdfunding-remco.js.map