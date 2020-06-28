<!DOCTYPE html>
<!--
@license
Copyright (C) 2018 The Android Open Source Project

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
<title>gr-labeled-autocomplete</title>

<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>

<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>
<script src="/components/wct-browser-legacy/browser.js"></script>

<test-fixture id="basic">
  <template>
    <gr-labeled-autocomplete></gr-labeled-autocomplete>
  </template>
</test-fixture>

<script type="module">
import '../../../test/common-test-setup.js';
import './gr-labeled-autocomplete.js';
suite('gr-labeled-autocomplete tests', () => {
  let element;
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
    element = fixture('basic');
  });

  teardown(() => { sandbox.restore(); });

  test('tapping trigger focuses autocomplete', () => {
    const e = {stopPropagation: () => undefined};
    sandbox.stub(e, 'stopPropagation');
    sandbox.stub(element.$.autocomplete, 'focus');
    element._handleTriggerClick(e);
    assert.isTrue(e.stopPropagation.calledOnce);
    assert.isTrue(element.$.autocomplete.focus.calledOnce);
  });

  test('setText', () => {
    sandbox.stub(element.$.autocomplete, 'setText');
    element.setText('foo-bar');
    assert.isTrue(element.$.autocomplete.setText.calledWith('foo-bar'));
  });
});
</script>