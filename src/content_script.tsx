/*
  This file is used to do things with in the tab/page that you are after is has loaded.
  This means things like window linsteners and so on.
 */

/*
I want to be able to console log the typed input from an editable content field.

1. listen for on focus events
2. if focsed event is on an editable content field - console.log the field and I have captured!
3. listen to typing / input on the field - loog content on PAUSE ...
*/

const detectFocus: any = () => {
  console.log(`Focus has occured! Element in question is`, document.activeElement);
}

window.addEventListener('focus', detectFocus);

const isEditableElement = (activeElement: Element) => {

  if (!activeElement) {
    return false;
  }

  const tagName = activeElement.tagName.toUpperCase();
  const isContentEditable = activeElement.getAttribute('contenteditable');

  if (tagName === 'TEXTAREA' || tagName === 'INPUT' || isContentEditable) {
    return true;
  }
  return false;
}

// const listenActiveElement = (callback: any) => {
//   // Initial check
//   let lastActiveElement = document.activeElement;
//   // Check if element is textarea or input
//   if (isTextareaOrInput(lastActiveElement)) {
//     callback(lastActiveElement);
//   }

//   // Handle if focus changes
//   const detectFocus = () => {
//     if (lastActiveElement !== document.activeElement) {
//       lastActiveElement = document.activeElement;
//       if (isTextareaOrInput(lastActiveElement)) {
//         callback(lastActiveElement);
//       }
//     }
//   };

//   window.addEventListener("focus", detectFocus, true);
// };