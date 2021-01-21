/* 
基礎プログラミング演習1 最終課題
「スーパーおみくじ Ver 1.0」
1871020 大岩潤矢

このjsファイルは、同ディレクトリ内index.htmlにて使われています。
動作確認はGoogle Chromeにて行いました。それ以外のブラウザでは表示が崩れる恐れがあります。
*/

/* クリック数カウント（0以外はomikuji()が発火しないようにする） */
var clickcount = 0;

/* 運のパラメータ及びポイントの配列を用意*/
var kindoflucky = ['成功運', '恋愛運', '金運', '学業運', 'ラッキー度'];
var luckypoint = [];

/* 運のポイントを計算*/
for (var i = 0; i < 5; i++) {
    var random = Math.floor(Math.random() * 101); // 0～100までの乱数を生成
    luckypoint.push(random); // 配列に加える
}

/* 総合点のポイント計算*/
var resultpoint = 0; // 総合点ポイントの変数を宣言し、初期値0を代入
for (var i = 0; i < 5; i++) {
    resultpoint = resultpoint + luckypoint[i]; // 配列の0～4番目の合計を求める
}
resultpoint = Math.round(resultpoint / 5); // 5で割って平均を求める

/* おみくじランク画像の用意及び判定 */
var img = new Image(); // Imageオブジェクトを生成
if (resultpoint <= 10) { // もし総合点が10以下だった場合、「凶」と判定する
    img.src = "img/0.png";
}
else if (resultpoint <= 30) { // もし総合点が11以上30以下だった場合、「末吉」と判定する
    img.src = "img/1.png";
}
else if (resultpoint <= 50) { // もし総合点が31以上50以下だった場合、「小吉」と判定する
    img.src = "img/2.png";
}
else if (resultpoint <= 70) { // もし総合点が51以上70以下だった場合、「吉」と判定する
    img.src = "img/3.png";
}
else if (resultpoint <= 100) { // もし総合点が71以上100以下だった場合、「大吉」と判定する
    img.src = "img/4.png";
}

/* おみくじ背景画像の用意 */
var frameimage = new Image(); // Imageオブジェクトを生成
frameimage.src = "img/frame.png"; // 画像ファイルを読み込み

/* ここよりボタンクリックで発火するomikuji関数 */
function omikuji() {
    /* 名前を取得し、変数yournameに代入 */
    var yourname = document.getElementById('name').value;

    /* 名前が入力されていなかったらアラートを出して終了 */
    if (!yourname) {
        alert("名前を入力してね！");
        return;
    }

    /* canvasの初期処理 */
    var can = document.getElementById('omikujicanvas');
    var ctx = can.getContext('2d');

    /* 背景画像の描画 */
    ctx.beginPath(); // 描画スペースを初期化
    frameimage.onload = ctx.drawImage(frameimage, 0, 0); // 背景画像frameimageを(0,0)の場所に描画

    /* テキストの描画 */
    ctx.font = 'bold 40px Noto Sans Japanese'; // フォントの設定（太字・40px・メイリオ）
    ctx.fillText(yourname + "さんの運勢をチェック！", 30, 80); // タイトル部分のテキストを(30,80)の場所に描画

    /* それぞれの運ポイントの描画 */
    var y = [150, 210, 270, 330, 390]; // y座標をそれぞれ配列に代入
    for (var i = 0; i < 5; i++) {
        ctx.fillText(kindoflucky[i] + "は" + luckypoint[i] + "です", 50, y[i]); // 配列0～4番をそれぞれ取り出し、y座標を変えて描画
    }

    /* おみくじランク及び総合運の描画 */
    img.onload = ctx.drawImage(img, 480, 100); // img画像を(480,100)の位置に描画
    ctx.fillText("総合運: " + resultpoint, 590, 450); // 総合運ポイントを(590,450)の位置に描画

    /* クリックカウント変数を1に変更 */
    clickcount = 1;
}
