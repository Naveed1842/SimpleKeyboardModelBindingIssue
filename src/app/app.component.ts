
import { AfterViewInit, Component, ViewEncapsulation,OnInit} from "@angular/core";
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css',
  "../../node_modules/simple-keyboard/build/css/index.css"
]
})
export class AppComponent {
  value = "";
  keyboard: Keyboard;
  selectedInputElem: any;
  InputValueOne:string="100";
  InputValueTwo:string="200";
  producedQuantity;
  rejectedQuantity;
  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      debug: false,
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      onInputChange:input=>this.onInputChange(input),
      preventMouseDownDefault:false,
      layout:{'default': [
        '1 2 3 4',
        '5 6 7 8',
        '9 0 {bksp}',
        '{enter}'
      ]}
    });
    
    this.selectedInputElem = document.querySelector(".input:first-child");
    //console.log("selecedInputElem",this.selectedInputElem);
    document.querySelectorAll(".input").forEach(input => 
      {
       //console.log("selecedInput",input); 
      input.addEventListener("focus", this.onInputFocus);
      input.addEventListener("input", this.onInputChange);
    });
  }
  onInputFocus = (event: any) => {
    console.log("onInputFocus",event);
    this.selectedInputElem = event.target;
    //console.log("Focused input", this.selectedInputElem);
    //console.log("event+++++",event.target.id);
    this.keyboard.setOptions({
      inputName: event.target.id
    });
  };

  setInputCaretPosition = (elem: any, pos: number) => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  };

  onInputChange = (event: any,i?) => {
    console.log("onInputChange",event);
    //console.log("event on input change",event);
    //console.log("event on input changelll",event.target.value,event.target.id);
    this.keyboard.setInput(event.target.value, event.target.id);
  };

  onChange = (input: string) => {
    this.selectedInputElem.value = input;
    //console.log("Input changed", input);
    /**
     * Synchronizing input caret position
     */
    let caretPosition = this.keyboard.caretPosition;
    if (caretPosition !== null)
      this.setInputCaretPosition(this.selectedInputElem, caretPosition);
    //console.log("caretPosition", caretPosition);
  };

  onKeyPress = (button: string) => {
    //console.log("Button pressed", button);
    /**
     * If you want to handle the shift and caps lock buttons
     */
    
     if (button === "{shift}" || button === "{lock}") this.handleShift();

  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  saveModel(){
    console.log("quantity",this.producedQuantity,this.rejectedQuantity);
  }
}
