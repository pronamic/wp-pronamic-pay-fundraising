"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* globals pronamic_crowdfunding_details */
var _wp = wp,
    data = _wp.data;
var registerBlockType = wp.blocks.registerBlockType;
var RichText = wp.blockEditor.RichText;
var _wp$element = wp.element,
    Component = _wp$element.Component,
    Fragment = _wp$element.Fragment,
    RawHTML = _wp$element.RawHTML;

(function () {
  'use strict';

  var DescriptionList =
  /*#__PURE__*/
  function (_Component) {
    _inherits(DescriptionList, _Component);

    function DescriptionList() {
      _classCallCheck(this, DescriptionList);

      return _possibleConstructorReturn(this, _getPrototypeOf(DescriptionList).apply(this, arguments));
    }

    _createClass(DescriptionList, [{
      key: "render",
      value: function render() {
        return (
          /*#__PURE__*/
          React.createElement("dl", {
            className: "ppcf-dl-list"
          }, this.props.children)
        );
      }
    }]);

    return DescriptionList;
  }(Component);

  var DescriptionDetails =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(DescriptionDetails, _Component2);

    function DescriptionDetails() {
      _classCallCheck(this, DescriptionDetails);

      return _possibleConstructorReturn(this, _getPrototypeOf(DescriptionDetails).apply(this, arguments));
    }

    _createClass(DescriptionDetails, [{
      key: "render",
      value: function render() {
        return (
          /*#__PURE__*/
          React.createElement("dd", {
            className: "ppcf-dl-list__value"
          }, this.props.children)
        );
      }
    }]);

    return DescriptionDetails;
  }(Component);

  var formatMoney = function formatMoney(value) {
    value = parseFloat(value); // Fraction digits.

    var fractionDigits = 2;

    if (0 === value * 100 % 100) {
      fractionDigits = 0;
    }

    return value.toFixed(fractionDigits).replace(/\./g, ',');
  };
  /**
   * Register details block type.
   *
   * @param string name     Block name.
   * @param object settings Block settings.
   *
   * @return WPBlock        Block if registered successfully, otherwise "undefined".
   */


  registerBlockType('pronamic-pay/crowdfunding-details', {
    title: pronamic_crowdfunding_details.title,
    icon: 'info',
    category: 'pronamic-pay',
    parent: ['pronamic-pay/crowdfunding-donut', 'pronamic-pay/crowdfunding-bar', 'pronamic-pay/crowdfunding-compact', 'core/column', 'core/group'],
    // Attributes.
    attributes: {
      currencySymbol: {
        type: 'string',
        default: '€'
      },
      list: {
        type: 'array',
        default: [{
          term: pronamic_crowdfunding_details.term_raised,
          amount: '0,00'
        }, {
          term: pronamic_crowdfunding_details.term_target,
          amount: '0,00'
        }, {
          term: pronamic_crowdfunding_details.term_contributions,
          value: '0'
        }]
      }
    },
    // Edit.
    edit: function edit(_ref) {
      var attributes = _ref.attributes,
          setAttributes = _ref.setAttributes,
          className = _ref.className;
      var list = attributes.list,
          currencySymbol = attributes.currencySymbol;

      var updateCurrencySymbol = function updateCurrencySymbol(currencySymbol) {
        setAttributes({
          currencySymbol: currencySymbol
        });
      };

      var updateDescriptionTerm = function updateDescriptionTerm(index, term) {
        console.log(index + ' - ' + term);
        list[index].term = term;
        console.log(list);
        setAttributes({
          list: list
        });
      };

      var updateDescriptionDetail = function updateDescriptionDetail(index, content) {
        item = list[index];

        if (item.hasOwnProperty('amount')) {
          item.amount = content;
        } else {
          item.value = content;
        }

        list[index] = item;
        setAttributes({
          list: list
        });
      };

      var definitions = list.map(function (item, index) {
        return (
          /*#__PURE__*/
          React.createElement(Fragment, {
            key: index
          },
          /*#__PURE__*/
          React.createElement(RichText, {
            tagName: "dt",
            className: "ppcf-dl-list__label",
            value: item.term,
            onChange: function onChange(content) {
              return updateDescriptionTerm(index, content);
            }
          }),
          /*#__PURE__*/
          React.createElement(DescriptionDetails, {
            onChange: function onChange(content) {
              return updateDescriptionDetail(index, content);
            }
          }, item.hasOwnProperty('amount') ?
          /*#__PURE__*/
          React.createElement(React.Fragment, null,
          /*#__PURE__*/
          React.createElement(RichText, {
            tagName: "span",
            value: currencySymbol,
            onChange: function onChange(content) {
              return setAttributes({
                currencySymbol: content
              });
            }
          }), ' ' + formatMoney(item.amount)) : item.value))
        );
      });
      return (
        /*#__PURE__*/
        React.createElement(DescriptionList, {
          className: className
        }, definitions)
      );
    },
    // Save.
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      var currencySymbol = attributes.currencySymbol,
          list = attributes.list;
      var definitions = list.map(function (item, index) {
        return (
          /*#__PURE__*/
          React.createElement(Fragment, {
            key: index
          },
          /*#__PURE__*/
          React.createElement("dt", {
            className: "ppcf-dl-list__label"
          },
          /*#__PURE__*/
          React.createElement(RawHTML, null, item.term)),
          /*#__PURE__*/
          React.createElement("dd", {
            className: "ppcf-dl-list__value"
          }, item.hasOwnProperty('amount') ?
          /*#__PURE__*/
          React.createElement(React.Fragment, null, currencySymbol + ' ' + formatMoney(item.amount)) : item.value))
        );
      });
      return (
        /*#__PURE__*/
        React.createElement("dl", {
          className: "ppcf-dl-list"
        }, definitions)
      );
    }
  });
})();
//# sourceMappingURL=block-crowdfunding-details.js.map