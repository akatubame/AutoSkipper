// ==UserScript==
// @name AutoSkipper
// @namespace 'Auto Login Creator'
// @include http://www.blogger.com/blogin.g?blogspotURL=*
// @include http://*.blogspot.jp/*
// @include http://www.bookoffonline.co.jp/old/*
// @include http://www.bookoffonline.co.jp/new/*
// @include https://www.google.com/url?sa=i&source=images*
// @grant none
// ==/UserScript==

// ---------------------------------------------------------------------------
// 設定項目
// ---------------------------------------------------------------------------
//   url：スキップ処理を行うURL
//   title：スキップ処理を行うHTMLタイトル(絞り込み。空白だと任意のタイトルで処理を行う)
//   xpath：クリックする対象のAタグ、INPUTタグをXPathで指定
// ---------------------------------------------------------------------------
var array = {
	blogger : {
		url : 'www.blogger.com',
		title : '',
		xpath : '//a[text()="理解し、継続を希望します"]'
	},
	blogger2 : {
		url : 'blogspot.jp',
		title : '',
		xpath : '//a[text()="理解し、継続を希望します"]'
	},
	bookoff : {
		url : 'www.bookoffonline.co.jp',
		title : 'まとめて購入',
		xpath : '//a[text()="はい"]'
	},
	googleimage : {
		url : 'www.google.com',
		title : '',
		xpath : '//a[1]'
	},
};

// -------------------------------------------------------
// メイン処理
// -------------------------------------------------------
(function () {
	//alert(document.URL);
	for (i in array) {
		if ( document.URL.indexOf( array[i]["url"] ) != -1 ) {
			if ( array[i]['title'] == '' || document.title.indexOf( array[i]['title'] ) > 0 ) {
				//alert(document.title);
				var e = XPathGetItem(array[i]['xpath']);
				//alert(e.innerHTML);
				if ( e.href && e.href.search("http") != -1 )
					location.href = e.href;
				else
					e.click();
				Break;
			}
		}
	}
})();

// -------------------------------------------------------
// 関数
// -------------------------------------------------------
// XPathで要素を取得
function XPath(xpath)  {
	var e = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return e;
}
// XPathで要素をアイテムのみ取得
function XPathGetItem(xpath)  {
	var e = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return e.snapshotItem(0);
}
// XPathで該当HTMLを書き換え
function setHTML(xpath, html)  {
	var e = XPath(xpath)
	// alert(e.snapshotItem(0).innerHTML); // デバッグ用
	if (!e.snapshotLength) {
		console.log('none');
	} else {
		console.log('replace: ' + xpath + ' <= ' + html);
		var item = e.snapshotItem(0);
		item.innerHTML = html;
	}
}
