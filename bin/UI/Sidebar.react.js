'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('React');
var Card = require('./Card.react');

var _require = require('../settings'),
    TRUCK_COST = _require.TRUCK_COST,
    MINER_COST = _require.MINER_COST,
    BASE_COST = _require.BASE_COST,
    AUTOMATION_COST = _require.AUTOMATION_COST;

var Sidebar = function (_React$Component) {
  _inherits(Sidebar, _React$Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    props.store.subscribe(function () {
      return _this.setState(_extends({}, _this.props.store.getState()));
    });
    _this.state = _extends({}, _this.props.store.getState());
    return _this;
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      var dispatch = this.props.store.dispatch;

      var cards = [];
      var factory = this.state.entities.filter(function (e) {
        return e.type == 'factory';
      })[0];
      cards.push(React.createElement(Card, {
        key: 'titleCard',
        title: 'Rokenbok Factory',
        content: ['Total Bok Collected: ' + factory.totalCollected, 'Current Bok: ' + factory.collected] }));

      cards.push(makeBuyCard('miner', MINER_COST, dispatch));
      cards.push(makeBuyCard('truck', TRUCK_COST, dispatch));
      cards.push(makeBuyCard('base', BASE_COST, dispatch));
      cards.push(makeBuyCard('automate trucks', AUTOMATION_COST, dispatch));
      return React.createElement(
        'div',
        { className: 'sidebar' },
        cards
      );
    }
  }]);

  return Sidebar;
}(React.Component);

var makeBuyCard = function makeBuyCard(entityType, entityCost, dispatch) {
  var content = ['Cost: ' + entityCost + ' bok'];
  if (entityType == 'miner') {
    content.push('Once you click "Buy", right click in the range of the factory or a base to place');
  }
  return React.createElement(Card, {
    key: "buy" + entityType + "Card",
    title: 'Buy ' + entityType,
    content: content,
    action: {
      name: 'Buy',
      func: function func() {
        console.log(entityType);
        dispatch({ type: 'BUY', entityType: entityType });
      }
    } });
};

module.exports = Sidebar;