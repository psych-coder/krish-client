import { convertToRaw } from "draft-js";

export default {
  getTitle(rawContent) {
    //console.log(convertToRaw(editorState.getCurrentContent()));
    const blocks = rawContent.blocks;
    const value = blocks.map(
      (block, index) => (!block.text.trim() && "\n") || block.text
    )[0];
    return value;
  },

  getShortDesc(rawContent) {
    const blocks = rawContent.blocks;
    const value = blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
    return value.substring(0, 100);
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
