import { convertToRaw } from "draft-js";

export default {
  getTitle(rawContent) {
    //console.log(convertToRaw(editorState.getCurrentContent()));
    const blocks = rawContent.blocks;
    const value = blocks.map(
      (block, index) => (!block.text.trim() && "\n") || block.text
    )[0];
    return value.substring(0, 100);;
  },

  getShortDesc(rawContent) {
    const blocks = rawContent.blocks;
    const value = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
    return value.substring(0, 200);
  },

  youtube_parser(rawContent){
    //console.log(t);

    const blocks = rawContent.blocks;
    const value = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");

    var matches = value.match(/\bhttps?:\/\/\S+/gi);
    var youtubeid = "";
   
    if (matches) {
        matches.forEach(function (entry) {
            console.log(entry);
            entry = entry.replaceAll("</p>", "");
            //console.log(entry);
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var m = entry.match(regExp);
            //console.log(m);
            if ((m && m[7].length == 11)) {
                //console.log(m[7])
                youtubeid = m[7];
            }
            //return 's';
        });
    }
    return youtubeid;
},

  getHashTags(inputText) {
    var regex = /(?:#)([a-zA-Z\d\_\-\u0B80-\u0BFF]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
      matches.push(match[1]);
    }

    //console.log(matches)
    return matches;
  },
};
