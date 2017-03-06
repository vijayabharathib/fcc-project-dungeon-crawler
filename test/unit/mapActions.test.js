import test from 'tape';
import {
  createMap
} from '../../src/scripts/actions/mapActions';
test("UT - mapActions - createMap",(t)=>{
  t.plan(1);
  const actual=createMap();
  const expected={type: 'CREATE_MAP'};
  t.deepEqual(actual,expected,"createMap action should return type CREATE_MAP");
});
