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
<title>gr-confirm-submit-dialog</title>

<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>

<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>
<script src="/components/wct-browser-legacy/browser.js"></script>
<script src="/node_modules/page/page.js"></script>

<test-fixture id="basic">
  <template>
    <gr-confirm-submit-dialog></gr-confirm-submit-dialog>
  </template>
</test-fixture>

<script type="module">
import '../../../test/common-test-setup.js';
import './gr-confirm-submit-dialog.js';
suite('gr-file-list-header tests', () => {
  let element;
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
    element = fixture('basic');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('display', () => {
    element.action = {label: 'my-label'};
    element.change = {
      subject: 'my-subject',
      revisions: {},
    };
    flushAsynchronousOperations();
    const header = element.shadowRoot
        .querySelector('.header');
    assert.equal(header.textContent.trim(), 'my-label');

    const message = element.shadowRoot
        .querySelector('.main p');
    assert.notEqual(message.textContent.length, 0);
    assert.notEqual(message.textContent.indexOf('my-subject'), -1);
  });

  test('_computeUnresolvedCommentsWarning', () => {
    const change = {unresolved_comment_count: 1};
    assert.equal(element._computeUnresolvedCommentsWarning(change),
        'Heads Up! 1 unresolved comment.');

    const change2 = {unresolved_comment_count: 2};
    assert.equal(element._computeUnresolvedCommentsWarning(change2),
        'Heads Up! 2 unresolved comments.');
  });

  test('_computeHasChangeEdit', () => {
    const change = {
      revisions: {
        d442ff05d6c4f2a3af0eeca1f67374b39f9dc3d8: {
          _number: 'edit',
        },
      },
      unresolved_comment_count: 0,
    };

    assert.equal(element._computeHasChangeEdit(change), true);

    const change2 = {
      revisions: {
        d442ff05d6c4f2a3af0eeca1f67374b39f9dc3d8: {
          _number: 2,
        },
      },
    };
    assert.equal(element._computeHasChangeEdit(change2), false);
  });
});
</script>