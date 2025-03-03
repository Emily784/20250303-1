let slider;
let button;
let dropdown;
let isShaking = false;
let iframe;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.size(450, 50);
  input.position(10, 10); // 把文字框放在座標(10,10)
  input.value('hi'); // 預設文字
  input.style('font-size', '18px'); // 設定文字大小

  let label = createDiv('文字大小'); // 創建文字標籤
  label.style('font-size', '18px'); // 設定文字標籤大小
  label.style('color', 'white'); // 設定文字標籤顏色
  label.position(input.x + input.width + 10, 10); // 把文字標籤放在文字框的右側

  slider = createSlider(30, 100, 50); // 創建滑桿，範圍從30到100，初始值為50
  slider.position(label.x, label.y + label.height + 10); // 把滑桿放在文字標籤的下面
  slider.style('width', '150px'); // 設定滑桿寬度
  slider.style('height', '20px'); // 設定滑桿高度
  slider.style('font-size', '18px'); // 設定滑桿文字大小
  slider.style('background-color', 'black'); // 設定滑桿背景顏色
  slider.style('color', 'white'); // 設定滑桿文字顏色
  slider.style('border', 'none'); // 設定滑桿邊框
  slider.style('border-radius', '10px'); // 設定滑桿邊框圓角
  slider.style('outline', 'none'); // 設定滑桿外框
  slider.style('cursor', 'pointer'); // 設定滑桿游標

  button = createButton('抖動文字'); // 創建按鈕
  button.position(slider.x + slider.width + 10, slider.y); // 把按鈕放在滑桿的右側
  button.mousePressed(toggleShake); // 設定按鈕按下時的動作

  dropdown = createSelect(); // 創建下拉式選單
  dropdown.position(button.x + button.width + 10, slider.y); // 把下拉式選單放在按鈕的右側
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('第一周');
  dropdown.option('第二周');
  dropdown.option('第三周'); // 新增第三周選項
  dropdown.style('font-size', '24px'); // 設定下拉式選單文字大小
  dropdown.changed(handleDropdownChange); // 設定選單變更時的動作

  iframe = createElement('iframe');
  iframe.position((windowWidth - (windowWidth - 100)) / 2, (windowHeight - (windowHeight - 250)) / 2); // 設定 iframe 的位置在視窗中間
  iframe.size(windowWidth - 100, windowHeight - 250); // 設定 iframe 的大小
  iframe.hide(); // 初始時隱藏 iframe
}

function toggleShake() {
  isShaking = !isShaking; // 切換抖動狀態
}

function handleDropdownChange() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
    iframe.show();
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
    iframe.show();
  } else if (selected === '第一周') {
    iframe.attribute('src', 'https://hackmd.io/@yayun/rJVwyGlqJx');
    iframe.show();
  } else if (selected === '第三周') {
    iframe.attribute('src', 'https://example.com/third-week'); // 替換為第三周的實際 URL
    iframe.show();
  } else {
    iframe.hide();
  }
}

function draw() {
  background(0); // 設置背景顏色為黑色
  let txt = input.value();
  let spacedTxt = txt.split('').join(' ');
  fill(255); // 設置文字顏色為白色
  textAlign(CENTER, CENTER);
  let textSizeValue = slider.value(); // 根據滑桿的值設置文字大小
  textSize(textSizeValue);
  let txtWidth = textWidth(spacedTxt);
  if (txtWidth === 0) {
    txtWidth = 1; // 設置一個合理的預設值
  }
  for (let y = 100; y < height; y += 40) { // 40 是每行之間的間隔，從 y 座標 100 開始
    for (let x = 0; x < width; x += txtWidth + 20) { // 20 是每句話之間的間隔
      for (let i = 0; i < spacedTxt.length; i++) {
        let char = spacedTxt.charAt(i);
        let yOffset = 0;
        if (isShaking) {
          yOffset = random(-5, 5); // 增加隨機抖動範圍
        }
        text(char, x + i * textWidth(char), y + yOffset);
      }
    }
  }
}
