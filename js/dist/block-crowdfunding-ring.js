"use strict";

/* globals pronamic_crowdfunding_ring */
var _wp = wp,
    data = _wp.data,
    ServerSideRenderer = _wp.ServerSideRenderer;
var _wp$blocks = wp.blocks,
    updateCategory = _wp$blocks.updateCategory,
    registerBlockType = _wp$blocks.registerBlockType;
var _wp$blockEditor = wp.blockEditor,
    Button = _wp$blockEditor.Button,
    ColorPalette = _wp$blockEditor.ColorPalette,
    HTML = _wp$blockEditor.HTML,
    InnerBlocks = _wp$blockEditor.InnerBlocks,
    InspectorControls = _wp$blockEditor.InspectorControls,
    Placeholder = _wp$blockEditor.Placeholder;
var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    PanelBody = _wp$components.PanelBody;
var _wp$components2 = wp.components,
    SVG = _wp$components2.SVG,
    G = _wp$components2.G,
    Path = _wp$components2.Path,
    Polygon = _wp$components2.Polygon,
    Rect = _wp$components2.Rect,
    Circle = _wp$components2.Circle;

(function () {
  'use strict';
  /**
   * Register crowdfunding ring block type.
   *
   * @param string name     Block name.
   * @param object settings Block settings.
   *
   * @return WPBlock        Block if registered successfully, otherwise "undefined".
   */

  registerBlockType('pronamic-pay/crowdfunding-ring', {
    title: pronamic_crowdfunding_ring.title,
    icon: 'marker',
    category: 'pronamic-pay',
    // Attributes.
    attributes: {
      target: {
        type: 'string',
        value: '0',
        default: '0'
      },
      raised: {
        type: 'string',
        default: '0'
      },
      contributions: {
        type: 'integer',
        default: 0
      },
      color: {
        type: 'string',
        default: '#f9461c'
      }
    },
    // Edit.
    edit: function edit(_ref) {
      var attributes = _ref.attributes,
          setAttributes = _ref.setAttributes,
          className = _ref.className,
          clientId = _ref.clientId;
      var target = attributes.target,
          raised = attributes.raised,
          contributions = attributes.contributions,
          color = attributes.color;

      var onChangeTarget = function onChangeTarget(updatedTarget) {
        updatedTarget = updatedTarget.replace(/,/g, '.');
        target = updatedTarget;
        setAttributes({
          target: updatedTarget
        });
      };

      var onChangeRaised = function onChangeRaised(updatedRaised) {
        updatedRaised = updatedRaised.replace(/,/g, '.');
        raised = updatedRaised;
        setAttributes({
          raised: updatedRaised
        });
      };

      var onChangeContributions = function onChangeContributions(updatedContributions) {
        updatedContributions = parseInt(updatedContributions);
        contributions = updatedContributions;
        setAttributes({
          contributions: updatedContributions
        });
      };

      var onChangeColor = function onChangeColor(color) {
        setAttributes({
          color: color
        });
      };

      var recursiveUpdateInnerBlocks = function recursiveUpdateInnerBlocks(blockType, parentBlock, attr) {
        if (!parentBlock.innerBlocks) {
          return;
        }

        parentBlock.innerBlocks.forEach(function (block) {
          if (blockType === block.name) {
            if (attr.hasOwnProperty('list')) {
              attr.list.map(function (item, index) {
                // Merge current block attribute with item updates.
                attr.list[index] = Object.assign(block.attributes.list[index], item);
              });
            }

            data.dispatch('core/block-editor').updateBlockAttributes(block.clientId, attr);
          }

          recursiveUpdateInnerBlocks(blockType, block, attr);
        });
      };

      var updateProgress = function updateProgress() {
        // Get inner blocks of this block.
        var block = data.select('core/block-editor').getBlocksByClientId(clientId)[0]; // Calculate progress.

        var target = parseFloat(attributes.target);
        var raised = parseFloat(attributes.raised);

        if (raised > target && 0 == target || 0 == target && 0 == raised) {
          target = 1;
        }

        var attr = {
          value: Math.floor(raised / target * 100)
        };
        recursiveUpdateInnerBlocks('pronamic-pay/progress', block, attr);
      };

      var updateDetails = function updateDetails() {
        // Get inner blocks of this block.
        var block = data.select('core/block-editor').getBlocksByClientId(clientId)[0]; // Attribute updates.

        var attr = {
          list: [{
            amount: parseFloat(raised)
          }, {
            amount: parseFloat(target)
          }, {
            value: parseInt(contributions)
          }]
        };
        recursiveUpdateInnerBlocks('pronamic-pay/crowdfunding-details', block, attr);
      };

      updateProgress();
      updateDetails(); // Inspector controls.

      var colors = [{
        name: 'orange',
        color: '#f9461c'
      }, {
        name: 'purple',
        color: '#6355ff'
      }, {
        name: 'green',
        color: '#2ce3be'
      }];
      var inspectorControls =
      /*#__PURE__*/
      React.createElement(InspectorControls, null,
      /*#__PURE__*/
      React.createElement(PanelBody, null,
      /*#__PURE__*/
      React.createElement(TextControl, {
        label: pronamic_crowdfunding_ring.label_target,
        value: target,
        onChange: onChangeTarget
      }),
      /*#__PURE__*/
      React.createElement(TextControl, {
        label: pronamic_crowdfunding_ring.label_raised,
        value: raised,
        onChange: onChangeRaised
      }),
      /*#__PURE__*/
      React.createElement(TextControl, {
        label: pronamic_crowdfunding_ring.label_contributions,
        value: contributions,
        onChange: onChangeContributions
      }),
      /*#__PURE__*/
      React.createElement(ColorPalette, {
        colors: colors,
        value: color,
        onChange: onChangeColor
      }))); // Inner blocks template.

      var TEMPLATE = [['core/columns', {}, [['core/column', {
        width: 30
      }, [['pronamic-pay/progress', {}]]], ['core/column', {
        width: 70
      }, [['pronamic-pay/crowdfunding-details', {}]]]]]];
      var classes = className + ' ppd-block';
      classes += ' ppd-block-circle';
      return (
        /*#__PURE__*/
        React.createElement("div", {
          className: classes
        }, inspectorControls,
        /*#__PURE__*/
        React.createElement(InnerBlocks, {
          template: TEMPLATE,
          renderAppender: false
        }))
      );
    },
    // Save.
    save: function save(_ref2) {
      var attributes = _ref2.attributes;
      return (
        /*#__PURE__*/
        React.createElement("div", {
          className: "ppd-block ppd-block-circle"
        },
        /*#__PURE__*/
        React.createElement(InnerBlocks.Content, null))
      );
    }
  });
  /**
   * Pronamic Pay block category icon.
   */

  updateCategory('pronamic-pay', {
    icon:
    /*#__PURE__*/
    React.createElement(SVG, {
      width: "24",
      height: "24",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg"
    },
    /*#__PURE__*/
    React.createElement(Path, {
      d: "M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512c-48.85 0-94.504-13.682-133.34-37.424L174.558 384h92.988c70.693 0 128-57.308 128-128 0-70.692-57.307-128-128-128h-46.682c-15.248 0-27.608 12.36-27.608 27.608 0 15.247 12.36 27.608 27.608 27.608h46.682c40.198 0 72.784 32.586 72.784 72.784 0 40.198-32.586 72.784-72.784 72.784H167.153c-12.869 0-23.681 8.805-26.741 20.72a28 28 0 00-.606 1.966l-30.622 114.273C43.161 419.443 0 342.762 0 256 0 114.615 114.615 0 256 0zm11.545 220.863h-65.757c-19.406 0-35.137 15.731-35.137 35.137s15.731 35.137 35.137 35.137h65.757c19.406 0 35.137-15.731 35.137-35.137s-15.731-35.137-35.137-35.137z",
      fill: "#A0A5AA"
    }))
  });
})();
//# sourceMappingURL=block-crowdfunding-ring.js.map