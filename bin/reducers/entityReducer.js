'use strict';

var _require = require('../selectors'),
    getSelectedEntities = _require.getSelectedEntities,
    getWorldCoord = _require.getWorldCoord;

var _require2 = require('../settings'),
    TRUCK_WIDTH = _require2.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require2.TRUCK_HEIGHT,
    TRUCK_TURN_SPEED = _require2.TRUCK_TURN_SPEED,
    TRUCK_SPEED = _require2.TRUCK_SPEED,
    TRUCK_ACCEL = _require2.TRUCK_ACCEL,
    MINER_RADIUS = _require2.MINER_RADIUS,
    MINER_TURN_SPEED = _require2.MINER_TURN_SPEED,
    MINER_SPEED = _require2.MINER_SPEED,
    MINER_ACCEL = _require2.MINER_ACCEL;

var entityReducer = function entityReducer(state, action) {
  switch (action.type) {
    case 'MAYBE_SELECT':
      deselectAll(state.entities);
      maybeSelect(state.entities, getWorldCoord(action.x, action.y));
      return state;
    case 'ACCELERATE':
      {
        var selEntities = getSelectedEntities(state);
        if (selEntities.length == 0) {
          return state;
        }
        var entity = selEntities[0];
        if (entity.type == 'truck') {
          entity.accel = entity.speed < TRUCK_SPEED ? TRUCK_ACCEL : 0;
        } else if (entity.type == 'miner') {
          entity.accel = entity.speed < MINER_SPEED ? MINER_ACCEL : 0;
        }
        return state;
      }
    case 'DEACCELERATE':
      {
        var _selEntities = getSelectedEntities(state);
        if (_selEntities.length == 0) {
          return state;
        }
        var _entity = _selEntities[0];
        if (_entity.type == 'truck') {
          _entity.accel = _entity.speed > 0 ? -1 * TRUCK_ACCEL : 0;
        } else if (_entity.type == 'miner') {
          _entity.accel = _entity.speed > 0 ? -1 * MINER_ACCEL : 0;
        }
        return state;
      }
    case 'TURN':
      {
        var _selEntities2 = getSelectedEntities(state);
        if (_selEntities2.length == 0) {
          return state;
        }
        var _entity2 = _selEntities2[0];
        if (_entity2.type == 'truck') {
          _entity2.thetaSpeed = action.dir * TRUCK_TURN_SPEED;
        } else if (_entity2.type == 'miner') {
          _entity2.thetaSpeed = action.dir * MINER_TURN_SPEED;
        }
        return state;
      }
  }
};

var deselectAll = function deselectAll(entities) {
  entities.forEach(function (entity) {
    return entity.selected = false;
  });
};

var maybeSelect = function maybeSelect(entities, worldCoord) {
  entities.forEach(function (entity) {
    // TODO
    if (entity.type == 'truck') {
      entity.selected = true;
    }
  });
};

module.exports = {
  entityReducer: entityReducer
};