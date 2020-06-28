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
import {AccessBehavior} from './gr-access-behavior.js';
suite('gr-access-behavior tests', () => {
  let element;

  suiteSetup(() => {
    // Define a Polymer element that uses this behavior.
    Polymer({
      is: 'test-element',
      behaviors: [AccessBehavior],
    });
  });

  setup(() => {
    element = fixture('basic');
  });

  test('toSortedArray', () => {
    const rules = {
      'global:Project-Owners': {
        action: 'ALLOW', force: false,
      },
      '4c97682e6ce6b7247f3381b6f1789356666de7f': {
        action: 'ALLOW', force: false,
      },
    };
    const expectedResult = [
      {id: '4c97682e6ce6b7247f3381b6f1789356666de7f', value: {
        action: 'ALLOW', force: false,
      }},
      {id: 'global:Project-Owners', value: {
        action: 'ALLOW', force: false,
      }},
    ];
    assert.deepEqual(element.toSortedArray(rules), expectedResult);
  });
});
</script>