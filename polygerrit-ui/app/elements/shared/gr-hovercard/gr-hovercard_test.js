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
<title>gr-hovercard</title>

<script src="/node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>

<script src="/node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js"></script>
<script src="/components/wct-browser-legacy/browser.js"></script>
<!-- Can't use absolute path below for mock-interaction.js.
Web component tester(wct) has a built-in http server and it serves "/components" directory (which is
actually /node_modules directory). Also, wct patches some files to load modules from /components.
With the absolute path, browser tries to load dom-module from 2 different places (/component/... and
/node_modules/...) though this is actually the same file. This leads to a run-time error.
-->
<script src="../../../node_modules/iron-test-helpers/mock-interactions.js"></script>

<button id="foo">Hello</button>
<test-fixture id="basic">
  <template>
    <gr-hovercard for="foo" id="bar"></gr-hovercard>
  </template>
</test-fixture>

<script type="module">
import '../../../test/common-test-setup.js';
import './gr-hovercard.js';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';
suite('gr-hovercard tests', () => {
  let element;
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
    element = fixture('basic');
  });

  teardown(() => { sandbox.restore(); });

  test('updatePosition', () => {
    // Test that the correct style properties have at least been set.
    element.position = 'bottom';
    element.updatePosition();
    assert.typeOf(element.style.getPropertyValue('left'), 'string');
    assert.typeOf(element.style.getPropertyValue('top'), 'string');
    assert.typeOf(element.style.getPropertyValue('paddingTop'), 'string');
    assert.typeOf(element.style.getPropertyValue('marginTop'), 'string');

    const parentRect = document.documentElement.getBoundingClientRect();
    const targetRect = element._target.getBoundingClientRect();
    const thisRect = element.getBoundingClientRect();

    const targetLeft = targetRect.left - parentRect.left;
    const targetTop = targetRect.top - parentRect.top;

    const pixelCompare = pixel =>
      Math.round(parseInt(pixel.substring(0, pixel.length - 1)), 10);

    assert.equal(
        pixelCompare(element.style.left),
        pixelCompare(
            (targetLeft + (targetRect.width - thisRect.width) / 2) + 'px'));
    assert.equal(
        pixelCompare(element.style.top),
        pixelCompare(
            (targetTop + targetRect.height + element.offset) + 'px'));
  });

  test('hide', () => {
    element.hide({});
    const style = getComputedStyle(element);
    assert.isFalse(element._isShowing);
    assert.isFalse(element.classList.contains('hovered'));
    assert.equal(style.display, 'none');
    assert.notEqual(element.container, dom(element).parentNode);
  });

  test('show', () => {
    element.show({});
    const style = getComputedStyle(element);
    assert.isTrue(element._isShowing);
    assert.isTrue(element.classList.contains('hovered'));
    assert.equal(style.opacity, '1');
    assert.equal(style.visibility, 'visible');
  });

  test('showDelayed does not show immediately', done => {
    element.showDelayedBy(100);
    setTimeout(() => {
      assert.isFalse(element._isShowing);
      done();
    }, 0);
  });

  test('showDelayed shows after delay', done => {
    element.showDelayedBy(1);
    setTimeout(() => {
      assert.isTrue(element._isShowing);
      done();
    }, 10);
  });

  test('card is scheduled to show on enter and hides on leave', done => {
    const button = dom(document).querySelector('button');
    assert.isFalse(element._isShowing);
    const enterHandler = event => {
      assert.isTrue(element._isScheduledToShow);
      button.dispatchEvent(new CustomEvent('mouseleave'));
    };
    const leaveHandler = event => {
      assert.isFalse(element._isScheduledToShow);
      assert.isFalse(element._isShowing);
      button.removeEventListener('mouseenter', enterHandler);
      button.removeEventListener('mouseleave', leaveHandler);
      done();
    };
    button.addEventListener('mouseenter', enterHandler);
    button.addEventListener('mouseleave', leaveHandler);
    button.dispatchEvent(new CustomEvent('mouseenter'));
  });

  test('card should disappear on click', done => {
    const button = dom(document).querySelector('button');
    assert.isFalse(element._isShowing);
    const enterHandler = event => {
      assert.isTrue(element._isScheduledToShow);
      // click to hide
      MockInteractions.tap(button);
    };
    const leaveHandler = event => {
      assert.isFalse(element._isScheduledToShow);
      assert.isFalse(element._isShowing);
      button.removeEventListener('mouseenter', enterHandler);
      button.removeEventListener('click', leaveHandler);
      done();
    };
    button.addEventListener('mouseenter', enterHandler);
    button.addEventListener('click', leaveHandler);
    button.dispatchEvent(new CustomEvent('mouseenter'));
  });
});
</script>