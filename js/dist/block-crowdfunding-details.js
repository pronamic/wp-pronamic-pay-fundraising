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
            className: "ppd-dl-list"
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
            className: "ppd-dl-list__value"
          }, this.props.children)
        );
      }
    }]);

    return DescriptionDetails;
  }(Component);
  /**
   * Register details block type.
   *
   * @param string name     Block name.
   * @param object settings Block settings.
   *
   * @return WPBlock        Block if registered successfully, otherwise "undefined".
   */


  registerBlockType('pronamic-pay/crowdfunding-details', {
    title: 'Details',
    icon: 'info',
    category: 'pronamic-pay',
    parent: ['pronamic-pay/crowdfunding-ring', 'core/column'],
    // Attributes.
    attributes: {
      currencySymbol: {
        type: 'string',
        default: '€'
      },
      list: {
        type: 'array',
        default: [{
          term: 'Raised',
          amount: '0,00'
        }, {
          term: 'Target',
          amount: '0,00'
        }, {
          term: 'Number of contributions',
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
      var definitions = list.map(function (item, index) {
        var definition = item.amount ? currencySymbol + ' ' + item.amount : item.value;
        return (
          /*#__PURE__*/
          React.createElement(Fragment, {
            key: index
          },
          /*#__PURE__*/
          React.createElement(RichText, {
            tagName: "dt",
            className: "ppd-dl-list__label",
            value: item.term,
            onChange: function onChange(content) {
              return setAttributes({
                content: content
              });
            }
          }),
          /*#__PURE__*/
          React.createElement(DescriptionDetails, null, item.hasOwnProperty('amount') ?
          /*#__PURE__*/
          React.createElement(React.Fragment, null,
          /*#__PURE__*/
          React.createElement(RichText, {
            tagName: "span",
            value: currencySymbol,
            onChange: function onChange(content) {
              return setAttributes({
                content: content
              });
            }
          }), ' ' + item.amount) : item.value))
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
      // @todo How to save?!
      return (
        /*#__PURE__*/
        React.createElement("dl", {
          className: "ppd-dl-list"
        }, attributes.list.forEach(function (detail, index) {// ....
        }))
      );
    }
  });
})();
//# sourceMappingURL=block-crowdfunding-details.js.map