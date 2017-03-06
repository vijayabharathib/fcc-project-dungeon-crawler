import test from 'tape';
import {
  createMap
} from '../../src/scripts/actions/mapActions';
import mapReducer from '../../src/scripts/reducers/mapReducers';

test("UT - mapReducer - createMap should return walls and space", (t)=>{
  t.plan(1);
  const state=mapReducer({},createMap());
  let actual=state.map.reduce((totalWall,row)=>{
    return totalWall+row.reduce((total,block)=>{
      return total+(block.type==='WALL' ? 1 : 0);
    },0);
  },0);
  let expected=76; //In a 20x20 map, 76 will be outer wall 20+20+18+18
  t.equals(actual,expected,"mapReducer should create 20x20 map on createMap");
});
