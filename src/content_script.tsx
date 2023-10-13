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


class Main {

  private currentActiveElement: Element | null = null;
  private readonly waitTime = 1000; // Wait time in milliseconds
  private readonly typingTime = 500; // Wait time in milliseconds

  constructor() {}

  private debounce(func: (...args: any[]) => any, wait: number){
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  private isEditableElement(activeElement: Element | null): boolean {

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

  private detectFocus() {
    if (this.currentActiveElement !== document.activeElement) {
      this.currentActiveElement = document.activeElement;
      if (this.isEditableElement(this.currentActiveElement)) {
        this.trackTyping(this.currentActiveElement);
      }
    }
  }

  private getElementText(event: KeyboardEvent): string{

    const target = event.target as HTMLInputElement;

    let value = target.value;

    if(!value){
      value = target.innerText;
    }

    return value;
  }

  private trackTyping(element: Element| null): void {

    let timer: any | null; // Timer identifier
    let activeTypingTimer: any | null; // Timer identifier
    let lastInput = null;
    let isActivelyTyping = false
    let lastTimeTyped = new Date().getTime();

    if(element){
      element.addEventListener('keyup', (event) => {

        const text = this.getElementText(event as KeyboardEvent);
        if(timer) {
          // Clear timer
          clearTimeout(timer);
        }
        
        if(activeTypingTimer) {
          clearTimeout(activeTypingTimer);
        }

        activeTypingTimer = setTimeout(() => {
          if(isActivelyTyping){
            if(new Date().getTime() > lastTimeTyped + this.typingTime){
              isActivelyTyping = false;
            }
          }
        }, this.typingTime);

        timer = setTimeout(() => {
          if(!isActivelyTyping){
            console.log('Do something with the text now');
            console.log(text);
            
            chrome.storage.sync.set({'inputtext': text});
          }
        }, this.waitTime);
      });
      element.addEventListener('keydown', (event) => {
        isActivelyTyping = true;
        lastTimeTyped = new Date().getTime();
      });
    }

  }

  public listenForActiveElement() {
    this.currentActiveElement = document.activeElement;

    if (this.isEditableElement(this.currentActiveElement)) {
      this.trackTyping(this.currentActiveElement);
    }

    window.addEventListener('focus', this.detectFocus.bind(this), true);
  }

}

const program = new Main();
program.listenForActiveElement();


// const listenToTyping = (element: HTMLInputElement) => {
//   let timer: any | null; // Timer identifier
//   let activeTypingTimer: any | null; // Timer identifier
//   let lastInput = element.value
//   let activelyTyping = false
//   let lastTypeTime = new Date().getTime();

//   element.addEventListener("keydown", (e) => {
//     activelyTyping = true;
//     lastTypeTime = new Date().getTime();
//   })


//   // Listen for `keyup` event
//   element.addEventListener("keyup", (e) => {
//     const target = e.target as HTMLInputElement;

//     let text = target.value;

//     // If text is undefined, the element is a editable div
//     if(text === undefined) {
//       text = target.innerText;
//     }
    
//     if(timer) {
//       // Clear timer
//       clearTimeout(timer);
//     }
    
//     if(activeTypingTimer) {
//       clearTimeout(activeTypingTimer);
//     }
    
//     const activeTypingCheckTime = waitTime - 1000;

    
//     activeTypingTimer = setTimeout(() => {
//       if(activelyTyping) {
//         const now = new Date().getTime();

//         if(now > lastTypeTime + activeTypingCheckTime) {
//           activelyTyping = false;
//         }
//       }
//     }, activeTypingCheckTime)

//     // Wait for X ms and then process the request
//     timer = setTimeout(() => {
//       if(text !== lastInput) {
//         if(!activelyTyping) {
//           search(text);
//           lastInput = text;
//         }
//       }
//     }, waitTime);
//   });
// };

//track typing with bounce back