<!DOCTYPE html>
<!--
@license
Copyright (C) 2017 The Android Open Source Project

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->

<meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
<meta charset="utf-8">
<title>keyboard-shortcut-behavior</title>

<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>

<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>
<script src="/components/wct-browser-legacy/browser.js"></script>
<test-fixture id="basic">
  <template>
    <test-element></test-element>
  </template>
</test-fixture>

<script type="module">
import '../../test/common-test-setup.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {ListViewBehavior} from './gr-list-view-behavior.js';
suite('gr-list-view-behavior tests', () => {
  let element;
  // eslint-disable-next-line no-unused-vars
  let overlay;

  suiteSetup(() => {
    // Define a Polymer element that uses this behavior.
    Polymer({
      is: 'test-element',
      behaviors: [ListViewBehavior],
    });
  });

  setup(() => {
    element = fixture('basic');
  });

  test('computeLoadingClass', () => {
    assert.equal(element.computeLoadingClass(true), 'loading');
    assert.equal(element.computeLoadingClass(false), '');
  });

  test('computeShownItems', () => {
    const myArr = new Array(26);
    assert.equal(element.computeShownItems(myArr).length, 25);
  });

  test('getUrl', () => {
    assert.equal(element.getUrl('/path/to/something/', 'item'),
        '/path/to/something/item');
    assert.equal(element.getUrl('/path/to/something/', 'item%test'),
        '/path/to/something/item%2525test');
  });

  test('getFilterValue', () => {
    let params;
    assert.equal(element.getFilterValue(params), '');

    params = {filter: null};
    assert.equal(element.getFilterValue(params), '');

    params = {filter: 'test'};
    assert.equal(element.getFilterValue(params), 'test');
  });

  test('getOffsetValue', () => {
    let params;
    assert.equal(element.getOffsetValue(params), 0);

    params = {offset: null};
    assert.equal(element.getOffsetValue(params), 0);

    params = {offset: 1};
    assert.equal(element.getOffsetValue(params), 1);
  });
});
</script>