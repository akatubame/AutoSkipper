// ==UserScript==
// @name AutoSkipper
// @namespace 'Akatubame - Auto Login Creator'
// @grant none
//
// ---------------------------------------------------------------------------
// 設定項目
// ---------------------------------------------------------------------------
//  ■スキップ処理を行うURLを登録
//    @include http://www.*.com/*
//   上記のようにワイルドカードで指定する。改行区切りで追加可能
// ---------------------------------------------------------------------------
// @include http://www.blogger.com/blogin.g?blogspotURL=*
// @include http://*.blogspot.jp/*
// @include http://www.bookoffonline.co.jp/old/*
// @include http://www.bookoffonline.co.jp/new/*
// @include https://www.google.com/url?sa=i&source=images*
// ==/UserScript==
// 
// ---------------------------------------------------------------------------
// 設定項目その２
// ---------------------------------------------------------------------------
//   url：スキップ処理を行うURLのドメイン (一部でも良い。必ず入力)
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
// 設定ここまで
// -------------------------------------------------------
//
// -------------------------------------------------------
// メイン処理
// -------------------------------------------------------
(function () {
	// alert(document.URL); // デバッグ用 (コメントアウトでアラート表示)
	for (i in site) {
		
		// URLのマッチ判定 (他サイトでの誤作動防止)
		// alert( site[i]["url"] ); // デバッグ用
		if ( document.URL.indexOf( site[i]["url"] ) == -1 )
			continue;
		
		// タイトルのマッチ判定 (指定有の場合のみ。サイト内の無関係なページでの誤作動防止)
		// alert( site[i]["title"] ); // デバッグ用
		if ( site[i]['title'] != '' )
			if ( document.title.indexOf( site[i]['title'] ) == -1 )
				continue;
		
		// --- スキップ処理ここから --- //
		var e = XPathGetItem( site[i]['xpath'] );
		// alert(e.innerHTML); // デバッグ用
		
		// 対象がURLを含むAタグならページ移動、それ以外ならクリック
		if ( e.href && e.href.indexOf("http://") != -1 )
			location.href = e.href;
		else
			e.click();
	}
})();
// -------------------------------------------------------
// 関数
// -------------------------------------------------------
// XPathで要素をアイテムのみ取得
function XPathGetItem(xpath)  {
	var e = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return e.snapshotItem(0);
}

