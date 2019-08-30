function japaneseFont(image, charSize, context) {
    let string;
    let letter;

    const printLetter = function(character) {
		switch(character) {
			case "あ": 
				return {x:0, y:0};
			case "い":
				return {x:charSize.width, y:0};
			case "う":
				return {x:2 * charSize.width, y:0};
			case "え":
				return {x:3 * charSize.width, y:0};
			case "お":
				return {x:4 * charSize.width, y:0};
			case "か":
				return {x:5 * charSize.width, y:0};
			case "き":
				return {x:6 * charSize.width, y:0};
			case "く":
				return {x:7 * charSize.width, y:0};
			case "け":
				return {x:8 * charSize.width, y:0};
			case "こ":
				return {x:9 * charSize.width, y:0};
			case "さ":
				return {x:10 * charSize.width, y:0};
			case "し":
				return {x:11 * charSize.width, y:0};
			case "す":
				return {x:12 * charSize.width, y:0};
			case "せ":
				return {x:13 * charSize.width, y:0};
			case "そ":
				return {x:14 * charSize.width, y:0};
			case "た":
				return {x:15 * charSize.width, y:0};
			case "ち":
				return {x:16 * charSize.width, y:0};
            case "つ":
				return {x:17 * charSize.width, y:0};
			case "て":
				return {x:18 * charSize.width, y:0};
			case "と":
				return {x:19 * charSize.width, y:0};
			case "な":
				return {x:20 * charSize.width, y:0};
			case "に":
				return {x:21 * charSize.width, y:0};
			case "ぬ":
				return {x:22 * charSize.width, y:0};
			case "ね":
				return {x:23 * charSize.width, y:0};
			case "の":
				return {x:24 * charSize.width, y:0};
			case "は":
				return {x:25 * charSize.width, y:0};
			case "ひ":
				return {x:0, y:charSize.height};
			case "ふ":
				return {x:charSize.width, y:charSize.height};
			case "へ":
				return {x:2 * charSize.width, y:charSize.height};
			case "ほ":
				return {x:3 * charSize.width, y:charSize.height};
			case "ま":
				return {x:4 * charSize.width, y:charSize.height};
			case "み":
				return {x:5 * charSize.width, y:charSize.height};
			case "む":
				return {x:6 * charSize.width, y:charSize.height};
			case "め":
				return {x:7 * charSize.width, y:charSize.height};
			case "も":
				return {x:8 * charSize.width, y:charSize.height};
			case "や":
				return {x:9 * charSize.width, y:charSize.height};
			case "ゆ":
				return {x:10 * charSize.width, y:charSize.height};
			case "よ":
				return {x:11 * charSize.width, y:charSize.height};
			case "ら":
				return {x:12 * charSize.width, y:charSize.height};
			case "り":
				return {x:13 * charSize.width, y:charSize.height};
			case "る":
				return {x:14 * charSize.width, y:charSize.height};
			case "れ":
				return {x:15 * charSize.width, y:charSize.height};
			case "ろ":
				return {x:16 * charSize.width, y:charSize.height};
			case "わ":
				return {x:17 * charSize.width, y:charSize.height};
			case "を":
				return {x:18 * charSize.width, y:charSize.height};
			case "ん":
				return {x:19 * charSize.width, y:charSize.height};
			case "が":
				return {x:20 * charSize.width, y:charSize.height};
			case "ぎ":
				return {x:21 * charSize.width, y:charSize.height};
			case "ぐ":
				return {x:22 * charSize.width, y:charSize.height};
			case 'げ':
				return {x:23 * charSize.width, y:charSize.height};
			case 'ご':
				return {x:24 * charSize.width, y:charSize.height};
			case "ざ":
				return {x:25 * charSize.width, y:charSize.height};
			case "じ":
				return {x:0, y: 2 * charSize.height};
			case "ず":
				return {x:charSize.width, y:2 * charSize.height};
			case "ぜ":
				return {x:2 * charSize.width, y:2 * charSize.height};
			case "ぞ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            /////
            case "だ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぢ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "づ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "で":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ど":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ば":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "び":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぶ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "べ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぼ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぱ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぴ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぷ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぺ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ぽ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ゃ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ゅ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ょ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "っ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            ////////////////////////////////////////////////////////
            case "ア": 
                return {x:0, y:0};
            case "イ":
                return {x:charSize.width, y:0};
            case "ウ":
                return {x:2 * charSize.width, y:0};
            case "エ":
                return {x:3 * charSize.width, y:0};
            case "オ":
                return {x:4 * charSize.width, y:0};
            case "カ":
                return {x:5 * charSize.width, y:0};
            case "キ":
                return {x:6 * charSize.width, y:0};
            case "ク":
                return {x:7 * charSize.width, y:0};
            case "ケ":
                return {x:8 * charSize.width, y:0};
            case "コ":
                return {x:9 * charSize.width, y:0};
            case "サ":
                return {x:10 * charSize.width, y:0};
            case "シ":
                return {x:11 * charSize.width, y:0};
            case "ス":
                return {x:12 * charSize.width, y:0};
            case "セ":
                return {x:13 * charSize.width, y:0};
            case "ソ":
                return {x:14 * charSize.width, y:0};
            case "タ":
                return {x:15 * charSize.width, y:0};
            case "チ":
                return {x:16 * charSize.width, y:0};
            case "ツ":
                return {x:17 * charSize.width, y:0};
            case "テ":
                return {x:18 * charSize.width, y:0};
            case "ト":
                return {x:19 * charSize.width, y:0};
            case "ナ":
                return {x:20 * charSize.width, y:0};
            case "ニ":
                return {x:21 * charSize.width, y:0};
            case "ヌ":
                return {x:22 * charSize.width, y:0};
            case "ネ":
                return {x:23 * charSize.width, y:0};
            case "ノ":
                return {x:24 * charSize.width, y:0};
            case "ハ":
                return {x:25 * charSize.width, y:0};
            case "ヒ":
                return {x:0, y:charSize.height};
            case "フ":
                return {x:charSize.width, y:charSize.height};
            case "ヘ":
                return {x:2 * charSize.width, y:charSize.height};
            case "ホ":
                return {x:3 * charSize.width, y:charSize.height};
            case "マ":
                return {x:4 * charSize.width, y:charSize.height};
            case "ミ":
                return {x:5 * charSize.width, y:charSize.height};
            case "ム":
                return {x:6 * charSize.width, y:charSize.height};
            case "メ":
                return {x:7 * charSize.width, y:charSize.height};
            case "モ":
                return {x:8 * charSize.width, y:charSize.height};
            case "ヤ":
                return {x:9 * charSize.width, y:charSize.height};
            case "ユ":
                return {x:10 * charSize.width, y:charSize.height};
            case "ヨ":
                return {x:11 * charSize.width, y:charSize.height};
            case "ラ":
                return {x:12 * charSize.width, y:charSize.height};
            case "リ":
                return {x:13 * charSize.width, y:charSize.height};
            case "ル":
                return {x:14 * charSize.width, y:charSize.height};
            case "レ":
                return {x:15 * charSize.width, y:charSize.height};
            case "ロ":
                return {x:16 * charSize.width, y:charSize.height};
            case "ワ":
                return {x:17 * charSize.width, y:charSize.height};
            case "ヲ":
                return {x:18 * charSize.width, y:charSize.height};
            case "ン":
                return {x:19 * charSize.width, y:charSize.height};
            case "ガ":
                return {x:20 * charSize.width, y:charSize.height};
            case "ギ":
                return {x:21 * charSize.width, y:charSize.height};
            case "グ":
                return {x:22 * charSize.width, y:charSize.height};
            case 'ゲ':
                return {x:23 * charSize.width, y:charSize.height};
            case 'ゴ':
                return {x:24 * charSize.width, y:charSize.height};
            case "ザ":
                return {x:25 * charSize.width, y:charSize.height};
            case "ジ":
                return {x:0, y: 2 * charSize.height};
            case "ズ":
                return {x:charSize.width, y:2 * charSize.height};
            case "ゼ":
                return {x:2 * charSize.width, y:2 * charSize.height};
            case "ゾ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            /****/
            case "ダ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ヂ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ヅ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "デ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ド":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "バ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ビ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ブ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ベ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ボ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "パ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ピ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "プ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ペ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ポ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ﾔ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ﾕ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ﾖ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ッ":
                return {x:3 * charSize.width, y:2 * charSize.height};
            case "ー":
                return {x:3 * charSize.width, y:2 * charSize.height};
            
        
			default:
				return {x:18.5 * charSize.width, y:charSize.height};//18.5 so it doesn't crash, but you can tell something's not right
		}
	};
}
